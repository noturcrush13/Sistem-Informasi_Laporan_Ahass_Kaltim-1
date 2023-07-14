const dotenv = require("dotenv");
dotenv.config();

const key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

class UserController {
    static async loginUser(req, res){
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username: username});
            if(!user)
                return res.status(403).json({
                    error: {
                        message: "username atau password salah",
                    },
                });
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid)
                return res.status(403).json({
                    error: {
                        message: "username atau password salah",
                    },
                });
            const token = getSignedToken(user);
            res.status(200).json({
                message: "login berhasil",
                token: token,
                username: user.username,
                No_Ahass: user.No_Ahass,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async registerUser(req, res){
        try {
            const {username, password, No_Ahass, nama_depan, nama_belakang} = req.body;
            const user = await User.findOne({username: username});
            if(user)
                return res.status(403).json({
                    error: {
                        message: "username sudah terdaftar",
                    },
                });
            const newUser = new User({username: username, password: password, No_Ahass: No_Ahass, nama_depan: nama_depan, nama_belakang: nama_belakang});
            await newUser.save();
            res.status(201).json({
                message: "register berhasil",
                data: newUser,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getUser(req, res){
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getUserById(req, res){
        try {
            const user = await User.findById(req.params.id);
            //decrypted password
            res.status(200).json(
                user
            );
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async editUserById(req, res){
        try {
            const {id} = req.params;
            const {username, password, nama_depan, nama_belakang} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findOneAndUpdate(
                {_id: id},
                {username: username, password: hashedPassword , nama_depan: nama_depan, nama_belakang: nama_belakang},
                {new: true}
            );
            res.status(200).json({
                message: "berhasil mengubah data user",
                data: user,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async deleteUserById(req, res){
        try {
            const {id} = req.params;
            const user = await User.findByIdAndDelete(id);
            res.status(200).json({
                message: "berhasil menghapus data user",
                data: user,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }


}

getSignedToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
        },
        key,
        {expiresIn: "12h"}
    );
}

module.exports = UserController;
