const dotenv = require("dotenv");
dotenv.config();

const Laporan = require("../models/Laporan");

const DealerController = require("./DealerController");

const Dealer = require("../models/Dealer");

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
        const { id } = req.params;
        try {
            const laporan = await Laporan.findById(id);
            res.status(200).json({
                message: "Berhasil mendapatkan laporan",
                data: laporan,
            });
        }
        catch (error){
            res.status(500).json({error: {message: error.message}});
        }
    }

    static async getLaporanbyDate (req, res){
        try {
            const id_dealer = req.params.id_dealer;
            const tanggal_input = new Date(req.params.tanggal);

            const laporan = await Laporan.find({id_dealer: id_dealer});
            const laporanFiltered = laporan.filter((item) => {
                const tanggal = new Date(item.tanggal);
                return tanggal.getTime() === tanggal_input.getTime();
            });

            res.status(200).json({
                message: "Berhasil mendapatkan laporan",
                data: laporanFiltered,
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

    static async updateLaporan(req, res){
        try {
            const id_laporan = req.params.id;

            const {total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event,ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_part, penjualan_oli } = req.body;

            await Laporan.findByIdAndUpdate({_id: id_laporan}, 
                {
                    total_mekanik : total_mekanik,
                    unit_entry : unit_entry,
                    KPB_1 : KPB_1,
                    KPB_2 : KPB_2,
                    KPB_3 : KPB_3,
                    KPB_4 : KPB_4,
                    claim : claim,
                    service_lengkap : service_lengkap,
                    service_ringan : service_ringan,
                    ganti_oli : ganti_oli,
                    light_repair : light_repair,
                    heavy_repair : heavy_repair,
                    job_return : job_return,
                    other_job : other_job,
                    jumlah_ue_by_service_visit : jumlah_ue_by_service_visit,
                    jumlah_ue_by_pit_express : jumlah_ue_by_pit_express,
                    ue_by_reminder : ue_by_reminder,
                    ue_by_ahass_event : ue_by_ahass_event,
                    ue_by_engine_flush : ue_by_engine_flush,
                    ue_by_injector_cleaner : ue_by_injector_cleaner,
                    pendapatan_jasa : pendapatan_jasa,
                    penjualan_part : penjualan_part,
                    penjualan_oli : penjualan_oli,
                });
            res.status(200).json({
                message: "Berhasil mengubah laporan"
            });
        }
        catch (error) {
            res.status(500).json({
                error: {
                    message: "Terjadi kesalahan saat mengubah laporan",
                    details: error.message,
                },
            });
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

    static async getAllLaporanBulananByidDealer(req, res){
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
                return bulanLaporan == bulan && tahunLaporan == tahun;
            });
            
            const laporanBulananPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
                return Object.values(rekap);
            };
            const laporanBulananPerDealerResult = laporanBulananPerDealer(laporanBulanan);
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanBulananPerDealerResult,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllLaporanBulananPerDealer(req, res) {
        try {
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
    
            const laporanBulananPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
                return Object.values(rekap);
            };
    
            const laporanPerDealer = laporanBulananPerDealer(laporanBulanan);
    
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });
        } catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async getAllLaporanBulananPerDealerbyKabupaten(req, res) {
        try {
            const bulan = req.params.bulan;
            const tahun = req.params.tahun;
            const kabupaten = req.params.kabupaten;
        
            const laporan = await Laporan.find();
        
            const getDealer = await Dealer.find({ Kabupaten: kabupaten });
        
            const getDealerKabupaten = getDealer.map((item) => {
                return item.No_Ahass;
            });

            const laporanBulanan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const bulanLaporan = tanggal.getMonth() + 1;
                const formatBulan = bulanLaporan.toString().padStart(2, "0");
                const tahunLaporan = tanggal.getFullYear();
                return (
                    bulanLaporan == bulan &&
                    tahunLaporan == tahun &&
                    getDealerKabupaten.includes(curr.id_dealer)
                );
            });
    
          // Proses selanjutnya dengan laporanBulanan
          const laporanBulananPerDealer = (laporan) => {
            let rekap = {};
            laporan.forEach((curr) => {
                const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
            });
            return Object.values(rekap);
        };

        const laporanPerDealer = laporanBulananPerDealer(laporanBulanan);

        res.status(200).json({
            message: "berhasil mendapatkan laporan",
            data: laporanPerDealer,
        });
    
        } catch (error) {
          res.status(500).json({ error: { message: error.message } });
        }
    }

    static async getAllLaporanBulananPerDealerbyKecamatan(req, res) {
        try {
            const bulan = req.params.bulan;
            const tahun = req.params.tahun;
            const kecamatan = req.params.kecamatan;
        
            const laporan = await Laporan.find();
        
            const getDealer = await Dealer.find({ Kecamatan: kecamatan });
        
            const getDealerKecamatan = getDealer.map((item) => {
                return item.No_Ahass;
            });

            const laporanBulanan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const bulanLaporan = tanggal.getMonth() + 1;
                const formatBulan = bulanLaporan.toString().padStart(2, "0");
                const tahunLaporan = tanggal.getFullYear();
                return (
                    bulanLaporan == bulan &&
                    tahunLaporan == tahun &&
                    getDealerKecamatan.includes(curr.id_dealer)
                );
            });
    
          // Proses selanjutnya dengan laporanBulanan
            const laporanBulananPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
                return Object.values(rekap);
            };

            const laporanPerDealer = laporanBulananPerDealer(laporanBulanan);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });

        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async getAllLaporanTahunan(req, res) {
        try {
            const id_dealer = req.params.id_dealer;
            const tahun = req.params.tahun;
    
            const laporan = await Laporan.find({ id_dealer: id_dealer });
    
            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return tahunLaporan == tahun;
            });

            // console.log(laporanTahunan);

            const bulan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    
            const laporanBulananPerDealer = (laporan) => {
                const rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    const tanggal = new Date(curr.tanggal);
                    const bulanLaporan = tanggal.getMonth() + 1;
                
                    if (!rekap[bulanLaporan]) {
                        rekap[bulanLaporan] = {};
                    }
                    
                    if (!rekap[bulanLaporan][id_dealer]) {
                        rekap[bulanLaporan][id_dealer] = {
                            id_dealer: id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[bulanLaporan][id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[bulanLaporan][id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[bulanLaporan][id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[bulanLaporan][id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[bulanLaporan][id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[bulanLaporan][id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[bulanLaporan][id_dealer].claim += parseInt(claim);
                        rekap[bulanLaporan][id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[bulanLaporan][id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[bulanLaporan][id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[bulanLaporan][id_dealer].light_repair += parseInt(light_repair);
                        rekap[bulanLaporan][id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[bulanLaporan][id_dealer].job_return += parseInt(job_return);
                        rekap[bulanLaporan][id_dealer].other_job += parseInt(other_job);
                        rekap[bulanLaporan][id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[bulanLaporan][id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[bulanLaporan][id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[bulanLaporan][id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[bulanLaporan][id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[bulanLaporan][id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[bulanLaporan][id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[bulanLaporan][id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[bulanLaporan][id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
              
                const hasilRekap = bulan.map((bulanLaporan) => rekap[bulanLaporan] || []);
                return hasilRekap;
            };
              
            const rekapLaporanTahunanPerBulan = laporanBulananPerDealer(laporanTahunan);
            // console.log(rekapLaporanTahunanPerBulan);
    
            res.status(200).json({
                message: "Berhasil mendapatkan laporan tahunan",
                data: rekapLaporanTahunanPerBulan,
            });
        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async getAllLaporanTahunanByIdDealer (req, res) {
        try {
            const id_dealer = req.params.id_dealer;
            const tahun = req.params.tahun;
            const laporan = await Laporan.find({id_dealer: id_dealer});

            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return tahunLaporan == tahun;
            });

            const laporanTahunanPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
                return Object.values(rekap);
            };

            const laporanTahunanPerDealerbyTahun = laporanTahunanPerDealer(laporanTahunan);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanTahunanPerDealerbyTahun,
            });
        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }
    

    static async getAllLaporanTahunanbyTahun (req, res) {
        try {
            const tahun = req.params.tahun;
            const laporan = await Laporan.find();

            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return tahunLaporan == tahun;
            });

            const laporanTahunanPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
                return Object.values(rekap);
            };

            const laporanTahunanPerDealerbyTahun = laporanTahunanPerDealer(laporanTahunan);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanTahunanPerDealerbyTahun,
            });
        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async getAllLaporanTahunanbyKabupaten (req, res) {
        try {
            const tahun = req.params.tahun;
            const kabupaten = req.params.kabupaten;

            const laporan = await Laporan.find();

            const getDealer = await Dealer.find({ kabupaten: kabupaten });

            const getDealerKabupaten = getDealer.map((curr) => {
                return curr.No_Ahass;
            });

            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return (
                    tahunLaporan == tahun &&
                    getDealerKabupaten.includes(curr.id_dealer)
                );
            });
            const laporanTahunanPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
                return Object.values(rekap);
            };
    
            const laporanPerDealer = laporanTahunanPerDealer(laporanTahunan);
    
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });
        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async getAllLaporanTahunanPerDealerbyKecamatan(req, res) {
        try {
            const tahun = req.params.tahun;
            const kecamatan = req.params.kecamatan;
        
            const laporan = await Laporan.find();
        
            const getDealer = await Dealer.find({ Kecamatan: kecamatan });
        
            const getDealerKecamatan = getDealer.map((item) => {
                return item.No_Ahass;
            });

            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return (
                    tahunLaporan == tahun &&
                    getDealerKecamatan.includes(curr.id_dealer)
                );
            });
    
          // Proses selanjutnya dengan laporanBulanan
            const laporanTahunanPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner, pendapatan_jasa, penjualan_oli, penjualan_part } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            total_mekanik: parseInt(total_mekanik),
                            unit_entry: parseInt(unit_entry),
                            KPB_1: parseInt(KPB_1),
                            KPB_2: parseInt(KPB_2),
                            KPB_3: parseInt(KPB_3),
                            KPB_4: parseInt(KPB_4),
                            claim: parseInt(claim),
                            service_lengkap: parseInt(service_lengkap),
                            service_ringan: parseInt(service_ringan),
                            ganti_oli: parseInt(ganti_oli),
                            light_repair: parseInt(light_repair),
                            heavy_repair: parseInt(heavy_repair),
                            job_return: parseInt(job_return),
                            other_job: parseInt(other_job),
                            jumlah_ue_by_service_visit: parseInt(jumlah_ue_by_service_visit),
                            jumlah_ue_by_pit_express: parseInt(jumlah_ue_by_pit_express),
                            ue_by_reminder: parseInt(ue_by_reminder),
                            ue_by_ahass_event: parseInt(ue_by_ahass_event),
                            ue_by_engine_flush: parseInt(ue_by_engine_flush),
                            ue_by_injector_cleaner: parseInt(ue_by_injector_cleaner),
                            pendapatan_jasa: parseInt(pendapatan_jasa),
                            penjualan_oli: parseInt(penjualan_oli),
                            penjualan_part: parseInt(penjualan_part),
                        };
                    } else {
                        rekap[id_dealer].total_mekanik += parseInt(total_mekanik);
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                        rekap[id_dealer].KPB_1 += parseInt(KPB_1);
                        rekap[id_dealer].KPB_2 += parseInt(KPB_2);
                        rekap[id_dealer].KPB_3 += parseInt(KPB_3);
                        rekap[id_dealer].KPB_4 += parseInt(KPB_4);
                        rekap[id_dealer].claim += parseInt(claim);
                        rekap[id_dealer].service_lengkap += parseInt(service_lengkap);
                        rekap[id_dealer].service_ringan += parseInt(service_ringan);
                        rekap[id_dealer].ganti_oli += parseInt(ganti_oli);
                        rekap[id_dealer].light_repair += parseInt(light_repair);
                        rekap[id_dealer].heavy_repair += parseInt(heavy_repair);
                        rekap[id_dealer].job_return += parseInt(job_return);
                        rekap[id_dealer].other_job += parseInt(other_job);
                        rekap[id_dealer].jumlah_ue_by_service_visit += parseInt(jumlah_ue_by_service_visit);
                        rekap[id_dealer].jumlah_ue_by_pit_express += parseInt(jumlah_ue_by_pit_express);
                        rekap[id_dealer].ue_by_reminder += parseInt(ue_by_reminder);
                        rekap[id_dealer].ue_by_ahass_event += parseInt(ue_by_ahass_event);
                        rekap[id_dealer].ue_by_engine_flush += parseInt(ue_by_engine_flush);
                        rekap[id_dealer].ue_by_injector_cleaner += parseInt(ue_by_injector_cleaner);
                        rekap[id_dealer].pendapatan_jasa += parseInt(pendapatan_jasa);
                        rekap[id_dealer].penjualan_oli += parseInt(penjualan_oli);
                        rekap[id_dealer].penjualan_part += parseInt(penjualan_part);
                    }
                });
                return Object.values(rekap);
            };

            const laporanPerDealer = laporanTahunanPerDealer(laporanTahunan);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });

        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async RankingBulanananbyBulan (req, res) {
        try {
            const bulan = req.params.bulan;
            const tahun = req.params.tahun;
        
            const laporan = await Laporan.find();
        
            const laporanBulanan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const bulanLaporan = tanggal.getMonth() + 1;
                const tahunLaporan = tanggal.getFullYear();
                return bulanLaporan == bulan && tahunLaporan == tahun;
            });
        
            const laporanBulananPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            unit_entry: parseInt(unit_entry),
                        };
                    } else {
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                    }
                });
                return Object.values(rekap);
            };

            const laporanPerDealer = laporanBulananPerDealer(laporanBulanan);

            laporanPerDealer.sort((a, b) => b.unit_entry - a.unit_entry);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });
        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async RankingBulananByKabupaten (req, res) {
        try {
            const bulan = req.params.bulan;
            const tahun = req.params.tahun;
            const kabupaten = req.params.kabupaten;
        
            const laporan = await Laporan.find();
        
            const getDealer = await Dealer.find({ Kabupaten: kabupaten });
        
            const getDealerKabupaten = getDealer.map((item) => {
                return item.No_Ahass;
            });

            const laporanBulanan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const bulanLaporan = tanggal.getMonth() + 1;
                const formatBulan = bulanLaporan.toString().padStart(2, "0");
                const tahunLaporan = tanggal.getFullYear();
                return (
                    bulanLaporan == bulan &&
                    tahunLaporan == tahun &&
                    getDealerKabupaten.includes(curr.id_dealer)
                );
            });
    
          // Proses selanjutnya dengan laporanBulanan
          const laporanBulananPerDealer = (laporan) => {
            let rekap = {};
            laporan.forEach((curr) => {
                const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner } = curr;
                if (!rekap[id_dealer]) {
                    rekap[id_dealer] = {
                        id_dealer,
                        unit_entry: parseInt(unit_entry),
                    };
                } else {
                    rekap[id_dealer].unit_entry += parseInt(unit_entry);
                }
            });
            return Object.values(rekap);
        };

        const laporanPerDealer = laporanBulananPerDealer(laporanBulanan);

        laporanPerDealer.sort((a, b) => b.unit_entry - a.unit_entry);

        res.status(200).json({
            message: "berhasil mendapatkan laporan",
            data: laporanPerDealer,
        });
    
        } catch (error) {
          res.status(500).json({ error: { message: error.message } });
        }
    }

    static async RankingBulananByKecamatan(req, res) {
        try {
            const bulan = req.params.bulan;
            const tahun = req.params.tahun;
            const kecamatan = req.params.kecamatan;
        
            const laporan = await Laporan.find();
        
            const getDealer = await Dealer.find({ Kecamatan: kecamatan });
        
            const getDealerKecamatan = getDealer.map((item) => {
                return item.No_Ahass;
            });

            const laporanBulanan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const bulanLaporan = tanggal.getMonth() + 1;
                const formatBulan = bulanLaporan.toString().padStart(2, "0");
                const tahunLaporan = tanggal.getFullYear();
                return (
                    bulanLaporan == bulan &&
                    tahunLaporan == tahun &&
                    getDealerKecamatan.includes(curr.id_dealer)
                );
            });
    
          // Proses selanjutnya dengan laporanBulanan
            const laporanBulananPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            unit_entry: parseInt(unit_entry),
                        };
                    } else {
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                    }
                });
                return Object.values(rekap);
            };

            const laporanPerDealer = laporanBulananPerDealer(laporanBulanan);

            laporanPerDealer.sort((a, b) => b.unit_entry - a.unit_entry);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });

        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async RankingTahunanByTahun(req, res) {
        try {
            const tahun = req.params.tahun;
            const laporan = await Laporan.find();

            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return tahunLaporan == tahun;
            });

            const laporanTahunanPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            unit_entry: parseInt(unit_entry),
                        };
                    } else {
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                    }
                });
                return Object.values(rekap);
            };

            const laporanTahunanPerDealerbyTahun = laporanTahunanPerDealer(laporanTahunan);

            laporanTahunanPerDealerbyTahun.sort((a, b) => b.unit_entry - a.unit_entry);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanTahunanPerDealerbyTahun,
            });
        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async RankingTahunanByKabupaten (req, res) {
        try {
            const tahun = req.params.tahun;
            const kabupaten = req.params.kabupaten;

            const laporan = await Laporan.find();

            const getDealer = await Dealer.find({ kabupaten: kabupaten });

            const getDealerKabupaten = getDealer.map((curr) => {
                return curr.No_Ahass;
            });

            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return (
                    tahunLaporan == tahun &&
                    getDealerKabupaten.includes(curr.id_dealer)
                );
            });
            const laporanTahunanPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            unit_entry: parseInt(unit_entry),
                        };
                    } else {
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                    }
                });
                return Object.values(rekap);
            };
    
            const laporanPerDealer = laporanTahunanPerDealer(laporanTahunan);

            laporanPerDealer.sort((a, b) => b.unit_entry - a.unit_entry);
    
            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });
        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }

    static async RankingTahunanByKecamatan (req, res) {
        try {
            const tahun = req.params.tahun;
            const kecamatan = req.params.kecamatan;
        
            const laporan = await Laporan.find();
        
            const getDealer = await Dealer.find({ Kecamatan: kecamatan });
        
            const getDealerKecamatan = getDealer.map((item) => {
                return item.No_Ahass;
            });

            const laporanTahunan = laporan.filter((curr) => {
                const tanggal = new Date(curr.tanggal);
                const tahunLaporan = tanggal.getFullYear();
                return (
                    tahunLaporan == tahun &&
                    getDealerKecamatan.includes(curr.id_dealer)
                );
            });
    
          // Proses selanjutnya dengan laporanBulanan
            const laporanTahunanPerDealer = (laporan) => {
                let rekap = {};
                laporan.forEach((curr) => {
                    const { id_dealer, total_mekanik, unit_entry, KPB_1, KPB_2, KPB_3, KPB_4, claim, service_lengkap, service_ringan, ganti_oli, light_repair, heavy_repair, job_return, other_job, jumlah_ue_by_service_visit, jumlah_ue_by_pit_express, ue_by_reminder, ue_by_ahass_event, ue_by_engine_flush, ue_by_injector_cleaner } = curr;
                    if (!rekap[id_dealer]) {
                        rekap[id_dealer] = {
                            id_dealer,
                            unit_entry: parseInt(unit_entry),
                        };
                    } else {
                        rekap[id_dealer].unit_entry += parseInt(unit_entry);
                    }
                });
                return Object.values(rekap);
            };

            const laporanPerDealer = laporanTahunanPerDealer(laporanTahunan);

            laporanPerDealer.sort((a, b) => b.unit_entry - a.unit_entry);

            res.status(200).json({
                message: "berhasil mendapatkan laporan",
                data: laporanPerDealer,
            });

        }
        catch (error) {
            res.status(500).json({ error: { message: error.message } });
        }
    }
}

module.exports = LaporanController;