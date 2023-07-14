const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt =  require('bcryptjs');

const dealerSchema = new schema(
    {
        No_Ahass: {
            type: String,
            required: true,
        },
        Nama_Ahass: {
            type: String,
            required: true,
        },
        Alamat: {
            type: String,
            required: true,
        },
        Telepon: {
            type: String,
            required: true,
        },
        Kabupaten: {
            type: String,
            required: true,
        },
        Kecamatan: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Dealer", dealerSchema);