let pipe

function Exporter(module: {}) {
    pipe += Object.assign({}, module)
    console.log(pipe)
}

function Importer(property: string[]) {
    return property.map(prop => pipe[prop])
}


export {
    Exporter,
    Importer
}
