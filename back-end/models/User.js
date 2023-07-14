const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt =  require('bcryptjs');

const userSchema = new schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type: String,
            required: true,
        },
        No_Ahass:{
            type: String,
            required: true,
        },
        nama_depan:{
            type: String,
            required: true,
        },
        nama_belakang:{
            type: String,
            required: true,
        },
    },
        {
            timestamps: true,
            versionKey: false,
        }
    );

    userSchema.pre('save', async function(next){
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch(error){
            next(error);
        }
    });

module.exports = mongoose.model("user", userSchema);