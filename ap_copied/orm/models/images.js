
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let images = new Schema ({
    userId:     { type: mongoose.Types.ObjectId, required: true },
    title:      { type: String, required: true, trim: true },
    imageUrl:   { type: String, required: true, trim: true },
    tags:       { type: String, trim: true }
}, {
    timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
});

module.exports = mongoose.model('images', images);