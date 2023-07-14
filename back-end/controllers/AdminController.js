const dotenv = require("dotenv");
dotenv.config();

const key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const bcrypt = require('bcryptjs');

class AdminController {
    static async loginAdmin(req, res){
        try {
            const {username, password} = req.body;
            const admin = await Admin.findOne({username: username});
            if(!admin)
                return res.status(403).json({
                    error: {
                        message: "username atau password salah",
                    },
                });
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if(!isPasswordValid)
                return res.status(403).json({
                    error: {
                        message: "username atau password salah",
                    },
                });
            const token = getSignedToken(admin);
            res.status(200).json({
                message: "login berhasil",
                token: token,
                username: admin.username,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async registerAdmin(req, res){
        try {
            const {username, password, nama_depan, nama_belakang} = req.body;
            const admin = await Admin.findOne({username: username});
            if(admin)
                return res.status(403).json({
                    error: {
                        message: "username sudah terdaftar",
                    },
                });
            const newAdmin = new Admin({username: username, password: password, nama_depan: nama_depan, nama_belakang: nama_belakang});
            await newAdmin.save();
            res.status(201).json({
                message: "register berhasil",
                data: newAdmin,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getAdmin(req, res){
        try{
            const admin = await Admin.find();
            res.status(200).json(admin);
        }
        catch(error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getAdminbyID(req, res){
        try{
            const admin = await Admin.findById(req.params.id);
            res.status(200).json(admin);
        }
        catch(error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async editAdminbyID(req, res){
        try{
            const {id} = req.params;
            const {username, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = await Admin.findOneAndUpdate(
                {_id: id},
                {username: username, password: hashedPassword},
                {new: true}
            );
            res.status(200).json({
                message: "berhasil mengubah data admin",
                data: admin,
            });
        }
        catch(error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async deleteAdminbyID(req, res){
        try{
            const {id} = req.params;
            const admin = await Admin.findOneAndDelete({_id: id});
            res.status(200).json({
                message: "berhasil menghapus data admin",
                data: admin,
            });
        }
        catch(error){
            res.status(500).json({error: {message: error.message}});
        }
    }
}

getSignedToken = (admin) => {
    return jwt.sign(
        {
            username: admin.username,
        },
        key,
        {
            expiresIn: "12h",
        }
    );
};

module.exports = AdminController;