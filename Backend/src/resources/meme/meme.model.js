const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
        caption: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: { createdAt: "date", updatedAt: false } }
);

memeSchema.index({ name: 1, url: 1, caption: 1 }, { unique: true });


memeSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.date;
    },
});

module.exports = mongoose.model("meme", memeSchema);
