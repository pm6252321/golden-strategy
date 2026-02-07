const express = require('express');
const ccxt = require('ccxt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware to connect to exchanges
app.use(async (req, res, next) => {
    try {
        const exchangeName = req.body.exchange; // expected exchange name in request body
        if (!exchangeName) return res.status(400).send('Exchange name is required');

        const exchange = new ccxt[exchangeName]();
        await exchange.loadMarkets();
        res.locals.exchange = exchange;
        next();
    } catch (error) {
        res.status(500).send('Error connecting to exchange: ' + error.message);
    }
});

app.get('/api/exchange/:symbol', (req, res) => {
    const exchange = res.locals.exchange;
    const symbol = req.params.symbol;
    // Use the exchange to fetch data
    exchange.fetchTicker(symbol).then(ticker => {
        res.json(ticker);
    }).catch(error => {
        res.status(500).send('Error fetching ticker: ' + error.message);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});