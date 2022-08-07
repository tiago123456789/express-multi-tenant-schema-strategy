require("dotenv").config()
const { knex } = require("./../config/database")
const knexFile = require("./../knexfile")

const commandAllowed = {
    up: true, down: true
};

const actionToExecute = process.argv[2]

if (!commandAllowed[actionToExecute]) {
    throw new Error("Actions allowd up or down")
}

async function execute() {
    let schemas = await knex.raw('SELECT schema_name FROM information_schema.schemata');
    schemas = schemas.rows;
    const schemasToIgnore = {
        'pg_toast': 1, 'pg_temp_1': 1,
        'pg_toast_temp_1': 1, 'pg_catalog': 1,
        'information_schema': 1
    }

    schemas = schemas
        .filter(item => !schemasToIgnore[item.schema_name])
        .map(item => item.schema_name)

    for (let index = 0; index < schemas.length; index++) {
        console.log(`RUNNING MIGRATIONS ON SCHEMA ${schemas[index]}`)
        await knex.migrate[actionToExecute]({
            directory: knexFile.development.migrations.directory,
            schemaName: schemas[index]
        })

    }
    process.exit(0)
}

execute()