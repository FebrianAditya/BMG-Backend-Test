const express = require("express")
const app = express()
const PORT = 3000
const routes = require("./routes")
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
    console.log(`I LOVE YOU ${PORT}`);
})