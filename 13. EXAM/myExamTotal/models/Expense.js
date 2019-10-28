const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    merchant: {
        type: Schema.Types.String,
        required: [true, 'Merchant is required']
    },
    description: {
        type: Schema.Types.String,
        required: [true, 'Description is required']
    },
    total: {
        type: Schema.Types.Number,
        required: [true, 'Total is required']
    },
    category: {
        type: Schema.Types.String,
        required: [true, 'Category is required']
    },
    isReport: { type: Schema.Types.Boolean, default: false, required: [true, 'Report is required'] },
    date: {
        type: Schema.Types.Date,
        required: [true, 'Date is required'],
        default: Date.now
    },
    creatorId: { type: Schema.Types.ObjectId, required: true }
});

expenseSchema.path('description').validate(function (v) {
    return v.length >= 10 && v.length <= 50;
}, "Description must be between 20 and 50 characters long!");

const Expense = model('Expense', expenseSchema);
module.exports = Expense;