
const mongoose = require('mongoose');


const permissionSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    created_at: { type: Date }
})


module.exports = mongoose.model('Permissions', permissionSchema);
