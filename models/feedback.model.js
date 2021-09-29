
const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    file: {type: String, default: ''},
    isResolved: { type: Boolean, default: false},
    reported_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

})

module.exports = mongoose.model('Feedback', feedbackSchema);
