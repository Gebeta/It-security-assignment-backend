
const mongoose = require('mongoose');


const RoleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],
    },
    {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});


module.exports = mongoose.model('Roles', RoleSchema);
