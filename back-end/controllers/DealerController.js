const dotenv = require("dotenv");
dotenv.config();

const Dealer = require("../models/Dealer");

class DealerController {
    static async createDealer(req, res){
        const {No_Ahass, Nama_Ahass, Alamat, Telepon, Kabupaten, Kecamatan} = req.body;
        const newDealer = new Dealer({No_Ahass, Nama_Ahass, Alamat, Telepon, Kabupaten, Kecamatan});
        const cek_dealer = await Dealer.findOne({No_Ahass: No_Ahass});
        try {
            if (cek_dealer) {
                res.status(409).json({
                    message: "Dealer dengan No_Ahass tersebut sudah ada",
                });
            }
            else {
                await newDealer.save();
                res.status(200).json({
                    message: "berhasil menambahkan dealer baru",
                    data: newDealer,
                });
            }
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

    static async getDealerById(req, res){
        try{
            const dealer = await Dealer.findById(req.params.id);
            res.status(200).json({
                message: "berhasil mendapatkan dealer",
                data: dealer,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async editDealerById(req, res){
        try {
            const {id} = req.params;
            const {Nama_Ahass, Alamat, Telepon, Kabupaten, Kecamatan} = req.body;
            const dealer = await Dealer.findOneAndUpdate(
                {_id: id},
                {Nama_Ahass, Alamat, Telepon, Kabupaten, Kecamatan},
            );
            res.status(200).json({
                message: "berhasil mengubah data dealer",
                data: dealer,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async deleteDealerById(req, res){
        try {
            const {id} = req.params;
            const dealer = await Dealer.findOneAndDelete({_id: id});
            res.status(200).json({
                message: "berhasil menghapus data dealer",
                data: dealer,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getDealerNoAHASS(req, res){
        try {
            const {No_Ahass} = req.params;
            const dealer = await Dealer.find({No_Ahass: No_Ahass});
            res.status(200).json({
                message: "berhasil mendapatkan data dealer",
                data: dealer,
            });
        } catch (error){
            console.log('error:', error);
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getDealerKabupaten(req, res){
        try {
            const {Kabupaten} = req.params;
            const dealer = await Dealer.find({Kabupaten: Kabupaten});
            res.status(200).json({
                message: "berhasil mendapatkan data dealer",
                data: dealer,
            });
        } catch (error){
            console.log('error:', error);
            res.status(500).json({error: {message: error.message}});
        }
    }
}

module.exports = DealerController;