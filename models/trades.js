// Uncomment the code below to use Sequelize ORM
// const {Sequelize} = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
const mongoose = require('mongoose');


// Insert your model definition below
const tradeSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['buy', 'sell']

    },
    user_id: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    shares: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});


module.exports = Trade = mongoose.model('Trade', tradeSchema)