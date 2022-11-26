const Trade = require('../models/trades');

let idCounter = 1; 

const addTrade = async (req, res, next) => {
    try{
        const { type, user_id, symbol, shares, price, timestamp } = req.body;
        const newTrade = new Trade({ _id: idCounter++, type, user_id, symbol, shares, price, timestamp})
        await newTrade.save();
        console.log(newTrade)
        res.status(201).send({
            // id: newTrade._id,
            type: newTrade.type,
            user_id: newTrade.user_id,
            symbol: newTrade.symbol,
            shares: newTrade.shares,
            price: newTrade.price,
            timestamp: newTrade.timestamp
        })
    } catch(err) {
        if(err.message.toString().match(/validation failed/g)) {
            err.status = 400
        }
        next(err)
    }
    
}

const getTradeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const trade = await Trade.findOne({_id : id}).select('-_id -__v');
        if (trade) {
            res.status(200).send(trade)
        } else {
            res.status(404).send('ID not found')
        } 
    } catch (error) {
        next(error)
    } 
}

const getTrades = async (req, res, next) => {
    try {
        const { user_id, type } = req.query;
        let query = {}
        if (user_id) {
            query['user_id'] = user_id
        }
        if (type) {
            query['type'] = type
        }

        const trades = await Trade.find(query).sort({_id: 1}).select('-_id -__v');
        res.status(200).send(trades);
    } catch (error) {
        next(error)
    } 
}

module.exports = { addTrade, getTradeById, getTrades }