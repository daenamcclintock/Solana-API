const PORT = 3000
const express = require('express')
const axios = require('axios')

const app = express()

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))