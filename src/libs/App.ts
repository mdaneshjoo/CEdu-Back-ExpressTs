let app

export class ExportApp {
    constructor(App) {
        app = App
    }
}

export class ImportApp {
    static getApp(){
        return app
    }
}
