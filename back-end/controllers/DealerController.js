const dotenv = require("dotenv");
dotenv.config();

const Dealer = require("../models/Dealer");

class DealerController {
    static async createDealer(req, res){
        const {No_Ahass, Nama_Ahass, Alamat, Telepon, Kabupaten, Kecamatan} = req.body;
        const newDealer = new Dealer({No_Ahass, Nama_Ahass, Alamat, Telepon, Kabupaten, Kecamatan});
        try {
            await newDealer.save();
            res.status(200).json({
                message: "berhasil menambahkan dealer baru",
                data: newDealer,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getDealer(req, res){
        try{
            const dealer = await Dealer.find();
            res.status(200).json({
                message: "berhasil mendapatkan dealer",
                data: dealer,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }
}

module.exports = DealerController;