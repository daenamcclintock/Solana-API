const PORT = 8000
const express = require('express')
const axios = require('axios')
const solanaWeb3 = require('@solana/web3.js');

const app = express()
const data = []

// console.log(solanaWeb3);

app.get('/', (req, res) => {
    res.json(solanaWeb3)
})

app.get('/solana', (req, res) => {
    res.json(solanaWeb3)
        .then((res ) => {
            const html = res.data
            data.push({
                TransactionStatus,
                BLOCKHASH_CACHE_TIMEOUT_MS
            })
        })
        res.json(data)
})

app.get('/solana/:addressId', async (req, res) => {
    const solanaAddress = req.params.addressId
})

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))