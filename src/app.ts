import * as express from 'express';
import {Application} from 'express';
const chalk = require('chalk');
import {Sequelize, Dialect} from 'sequelize';
import Router from './interfaces/router.interface'
import InitModels from './models/init.model'

export default class App {
    private app: Application;
    private readonly port: number;
    private readonly host :string;
    private readonly Env:string;
    constructor(private appConfig: { port:number; host:string;envType:string;},
                private _app:{middlewares: any[];router: Router[];thirdParty: any[]},
                private dbconfig: { database: string; username: string; password: string; host: string, driver: Dialect,options?:any },
                ) {
        this.port = appConfig.port
        this.host=appConfig.host
        this.Env=appConfig.envType
        this.app = express()
        this.mainMiddlewares(_app.middlewares)
        this.router(_app.router)
        this.thirdPartyMiddlewares(_app.thirdParty)
        this.configDB(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig.host, dbconfig.driver,dbconfig.options)
    }

    private mainMiddlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private thirdPartyMiddlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    public router(routes: Router[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router)
        })

    }


    private async configDB(dbname: string, userName: string, password: string, host: string, dialect: Dialect,options?:any) {
        const seq = new Sequelize(dbname, userName, password, {
            host,
            dialect,
            ...options.meta
        });
        seq.authenticate().then(() => {
            console.log(chalk.green('Database Connection has been established successfully.'));
            new InitModels(seq)
            if(this.Env==='development')
            seq.sync(options.sync).then(() => {
                console.log(chalk.green(`Models Are Synced ${options.sync.force ? 'By Force' : ''}`));
            })
        }).catch(e => {
            console.error(chalk.red('Unable to connect to the database:/n'), e);
        })
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log(chalk.blue(`Server runs in http://${this.host}:${this.port} MODE ${this.Env}`));
        })
    }

}

