import * as express from 'express';
import { Application } from 'express';
const chalk = require('chalk');
import { Sequelize, Dialect } from 'sequelize';
import Router from './interfaces/router.interface'
import InitModels from './models/init.model'
import config from './config'
export default class App {
    private app: Application;
    private port: number;
    constructor(private appConfig: { port; middlewares: any; router: Router[] },
        private dbconfig: { database: string; username: string; password: string; host: string, driver: Dialect }) {
        this.port = appConfig.port
        this.app = express()
        this.router(appConfig.router)
        this.middlewares(appConfig.middlewares)
        this.configDB(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig.host, dbconfig.driver)
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private router(routes: Router[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router)
        })

    }


    private async configDB(dbname: string, userName: string, password: string, host: string, dialect: Dialect) {
        const seq = new Sequelize(dbname, userName, password, {
            host,
            dialect,
            ...config.dbconfig.meta
        });
        seq.authenticate().then(() => {
            console.log(chalk.green('Connection has been established successfully.'));
            new InitModels(seq)
            seq.sync(config.dbconfig.sync).then(()=>{
                console.log(chalk.green(`Models Are Synced ${config.dbconfig.sync?'By Force':''}`));
            })
        }).catch(e => {
            console.error(chalk.red('Unable to connect to the database:/n'), e);
        })
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(chalk.bgGreen(`Server runs in http://${process.env.HOST}:${this.port} MODE ${process.env.ENV}`));
        })
    }

}

