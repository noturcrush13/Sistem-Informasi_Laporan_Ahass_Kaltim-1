const dotenv = require("dotenv");
dotenv.config();

const Laporan = require("../models/Laporan");

class LaporanController {
    static async createLaporan(req, res){
        const {id_dealer, id_laporan_bulanan, tanggal, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event,ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_part, penjualan_oli} = req.body;
        const newLaporan = new Laporan({id_dealer, id_laporan_bulanan, tanggal, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_part, penjualan_oli});
        const cek_dealer = await Laporan.findOne({id_dealer: id_dealer});
        const cek_tanggal = await Laporan.findOne({tanggal: tanggal});
        try {
            if (cek_tanggal && cek_dealer) {
                res.status(409).json({
                    message: "Laporan dengan tanggal tersebut sudah ada",
                });
            } else {
                await newLaporan.save();
                res.status(200).json({
                    message: "Berhasil membuat laporan",
                    data: newLaporan,
                });
            }
        }
        catch (error){
            res.status(500).json({
                error: {
                  message: 'Terjadi kesalahan saat membuat laporan',
                  details: error.message,
                },
              });
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

    static async getLaporanByFirstandLastDate(req, res) {
        try {
          const id_dealer = req.params.id_dealer;
          const first_date = new Date(req.params.first_date);
          const last_date = new Date(req.params.last_date);
      
          // Ambil data laporan berdasarkan id_dealer
          const laporan = await Laporan.find({ id_dealer: id_dealer });
      
          // Filter data laporan berdasarkan tanggal
          const laporanFiltered = laporan.filter((item) => {
            const tanggal = new Date(item.tanggal);
            return tanggal.getTime() >= first_date.getTime() && tanggal.getTime() <= last_date.getTime();
          });
      
          res.status(200).json({
            message: "Berhasil mendapatkan laporan",
            data: laporanFiltered,
          });
        } catch (error) {
          res.status(500).json({ error: { message: error.message } });
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

    static async getLaporanbyIdLaporanBulanan(req, res){
        try{
            const laporan = await Laporan.find({id_laporan_bulanan: req.params.id_laporan_bulanan});
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporan,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getLaporanTahunan(req, res){
        try{
            const laporan = await Laporan.find({id_dealer: req.params.id_dealer});
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporan,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getTotalPendapatanJasa(req, res){
        try{
            const laporan = await Laporan.find({id_dealer: req.params.id_dealer});
            var total = 0;
            for (var i = 0; i < laporan.length; i++){
                total += parseInt(laporan[i].pendapatan_jasa);
            }
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: total,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getTotalPenjualanPart(req, res){
        try{
            const laporan = await Laporan.find({id_dealer: req.params.id_dealer});
            var total = 0;
            for (var i = 0; i < laporan.length; i++){
                total += parseInt(laporan[i].penjualan_part);
            }
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: total,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getLaporanBulanan(req, res){
        try{
            const id_dealer = req.params.id_dealer;
            const bulan = req.params.bulan;
            const tahun = req.params.tahun;
            const laporan = await Laporan.find({id_dealer: id_dealer});

            const laporanBulanan = laporan.filter((item) => {
                const tanggal = new Date(item.tanggal);
                const bulanLaporan = tanggal.getMonth() + 1;
                const formatBulan = bulanLaporan.toString().padStart(2, "0");
                const tahunLaporan = tanggal.getFullYear();
                console.log("bulan", formatBulan);
                console.log("tahun", tahunLaporan);
                return bulanLaporan == bulan && tahunLaporan == tahun;
            });
            
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanBulanan,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getAllLaporanBulananbyBulan(req, res){
        try{
            const bulan = req.params.bulan;
            const tahun = req.params.tahun;
            const laporan = await Laporan.find();

            const laporanBulanan = laporan.filter((item) => {
                const tanggal = new Date(item.tanggal);
                const bulanLaporan = tanggal.getMonth() + 1;
                const formatBulan = bulanLaporan.toString().padStart(2, "0");
                const tahunLaporan = tanggal.getFullYear();
                return bulanLaporan == bulan && tahunLaporan == tahun;
            });
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanBulanan,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }
    
}

module.exports = LaporanController;