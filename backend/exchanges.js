// exchanges.js

const ccxt = require('ccxt');

class ExchangeHandler {
    constructor(exchangeName) {
        this.exchange = this.initializeExchange(exchangeName);
    }

    initializeExchange(exchangeName) {
        switch (exchangeName) {
            case 'MEXC':
                return new ccxt.mexc();
            case 'Bybit':
                return new ccxt.bybit();
            case 'KuCoin':
                return new ccxt.kucoin();
            case 'Binance':
                return new ccxt.binance();
            default:
                throw new Error(`Exchange ${exchangeName} not supported`);
        }
    }

    async fetchTicker(symbol) {
        return await this.exchange.fetchTicker(symbol);
    }

    async fetchBalance() {
        return await this.exchange.fetchBalance();
    }

    // Add more methods as needed for trading or fetching market data.
}

module.exports = ExchangeHandler;