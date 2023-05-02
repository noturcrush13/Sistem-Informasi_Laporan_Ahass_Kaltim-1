const dotenv = require("dotenv");
dotenv.config();

const Laporan = require("../models/Laporan");

class LaporanController {
    static async createLaporan(req, res){
        const {id_dealer, id_laporan_bulanan, tanggal, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, pendapatan_jasa, penjualan_part, penjualan_oli} = req.body;
        const newLaporan = new Laporan({id_dealer, id_laporan_bulanan, tanggal, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, pendapatan_jasa, penjualan_part, penjualan_oli});
        try {
            await newLaporan.save();
            res.status(200).json({
                message:"berhasil membuat laporan",
                data: newLaporan,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getLaporan(req, res){
        try{
            const laporan = await Laporan.find();
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporan,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getLaporanById(req, res){
        try{
            const laporan = await Laporan.findById(req.params.id);
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporan,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async deleteLaporan(req, res){
        try{
            const laporan = await Laporan.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "berhasil menghapus laporan",
                data: laporan,
            });
        } catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    
}

module.exports = LaporanController;