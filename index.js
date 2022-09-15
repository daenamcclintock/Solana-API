const express = require('express')
const solanaWeb3 = require('@solana/web3.js');
const {Keypair} = require("@solana/web3.js");
const { Connection, programs } = require('@metaplex/js');
const axios = require('axios');
require('dotenv').config()

const searchAddress = process.env.SEARCH_ADDRESS
const endpoint = process.env.ENDPOINT
const solanaConnection = new solanaWeb3.Connection(endpoint)

const PORT = 8000
const app = express()
const data = []
let keypair = Keypair.generate();

// console.log(solanaWeb3);

if (!process.env.SEARCH_ADDRESS || !process.env.ENDPOINT) {
    console.log("Please add your search address and endpoint");
    return;
}

// const getTransactions = async(address, numTx) => {
//     const publicKey = new solanaWeb3.PublicKey(address)
//     let transactionList = await solanaConnection.getSignaturesForAddress(publicKey, {limit: numTx})
//     let signatureList = transactionList.map((tx) => {
//         return (tx.signature)
//     })
//     let transactionDetails = await solanaConnection.getParsedTransactions(signatureList)
//     transactionList.forEach((transaction, i) => {
//         const date = new Date(transaction.blockTime * 1000)
//         const transactionInstructions = transactionDetails[i].transaction.message.instructions
//         console.log(`Transaction No: ${i + 1}`)
//         console.log(`Signature: ${transaction.signature}`)
//         console.log(`Time: ${date}`)
//         console.log(`Status: ${transaction.confirmationStatus}`)

//         transactionInstructions.forEach((instruction, n) => {
//             console.log(`---Program Instructions ${n + 1}: ${instruction.program ? instruction.program + ":" : ""} ${instruction.programId.toString()}`)
//         })
//         console.log("-".repeat(20))
//     })
// }

// getTransactions(searchAddress, 3)


app.get('/', (req, res) => {
    res.json(solanaWeb3)
})

app.get('/solana', (req, res) => {
    res.json(solanaWeb3.PUBLIC_KEY_LENGTH)
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
    const publicKey = new solanaWeb3.PublicKey(solanaAddress)
    let transactionList = await solanaConnection.getSignaturesForAddress(publicKey, {limit: 3})
    let signatureList = transactionList.map((tx) => {
        return (tx.signature)
    })
    let transactionDetails = await solanaConnection.getParsedTransactions(signatureList)
    transactionList.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime * 1000)
        const transactionInstructions = transactionDetails[i].transaction.message.instructions
        res.json(
            {
                TransactionNum: i + 1,
                Signature: transaction.signature,
                Time: date,
                Status: transaction.confirmationStatus
            })

        transactionInstructions.forEach((instruction, n) => {
            console.log(`---Program Instructions ${n + 1}: ${instruction.program ? instruction.program + ":" : ""} ${instruction.programId.toString()}`)
        })
        console.log("-".repeat(20))
    })

})

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`))