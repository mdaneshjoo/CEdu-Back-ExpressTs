import * as _cypher from 'cypher-query-builder'
import {Connection} from 'cypher-query-builder'
import {Exporter} from "../utils/helpers/Piper";

let cypher: Connection

export class Neo4jInitial {
    constructor(
        private connectionConfig: { url: string; userName: string; password: string }
    ) {
        this.init(connectionConfig.url, connectionConfig.userName, connectionConfig.password)
    }

    private init(url, userName, password) {
        cypher = new _cypher.Connection(url, {
            username: userName,
            password: password,
        });

    }
}

export {cypher}

export class Neo4j {

    updateVar(name: string, label: string, where: {}, setVar: {}) {
        return cypher
            .matchNode(name, label)
            .where({[name]: {...where}})
            .setVariables({[name]: {...setVar}})
            .run()
    }

    updateValue(name: string, label: string, where: {}, setValue: {}) {
        return cypher
            .matchNode(name, label)
            .where({[name]: {...where}})
            .setValues({[name]: {...setValue}})
            .run()
    }

    findAllNode(name: string, label: string, where: {}, attribute: any) {
        return cypher
            .matchNode(name, label)
            .where({[name]: {...where}})
            .return(attribute ? attribute : name)
            .run()
    }


}

