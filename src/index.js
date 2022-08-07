require("dotenv").config()
const express = require("express")
const app = express()
const { knex } = require("./config/database")
const extractTenant = require("./middleware/extractTenant")

app.use(express.json())

app.get("/movies", extractTenant, async (req, res) => {
    const registers = await knex(`${req.tenant}.movies`).returning("*")
    return res.json(registers)
})

app.post("/movies", extractTenant, async (req, res) => {
    const data = req.body;
    await knex(`${req.tenant}.movies`).insert({
        name: data.name
    })
    return res.sendStatus(201)
})

app.listen(3000, () => {
    console.log("Server is running")
})