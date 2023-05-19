const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt =  require('bcryptjs');

const laporanSchema = new schema (
    {
        id_dealer : {
            type: String,
            required: true,
        },
        id_laporan_bulanan : {
            type: String,
            required: true,
        },
        tanggal : {
            type: String,
            required: true,
        },
        total_mekanik : {
            type: String,
            required: true,
        },
        unit_entry : {
            type: String,
            required: true,
        },
        KPB_1 : {
            type : String,
            required : true,
        },
        KPB_2 : {
            type : String,
            required : true,
        },
        KPB_3 : {
            type : String,
            required : true,
        },
        KPB_4 : {
            type : String,
            required : true,
        },
        claim : {
            type : String,
            required : true,
        },
        service_lengkap : {
            type : String,
            required : true,
        },
        service_ringan : {
            type : String,
            required : true,
        },
        ganti_oli : {
            type : String,
            required : true,
        },
        light_repair : {
            type : String,
            required : true,
        },
        heavy_repair : {
            type : String,
            required : true,
        },
        job_return : {
            type : String,
            required : true,
        },
        other_job : {
            type : String,
            required : true,
        },
        jumlah_ue_by_service_visit : {
            type : String,
            required : true,
        },
        jumlah_ue_by_pit_express : {
            type : String,
            required : true,
        },
        ue_by_reminder : {
            type : String,
            required : true,
        },
        ue_by_ahass_event : {
            type : String,
            required : true,
        },
        ue_by_engine_flush :{
            type : String,
            required : true,
        },
        ue_by_injector_cleaner : {
            type : String,
            required : true,
        },
        pendapatan_jasa : {
            type : String,
            required : true,
        },
        penjualan_part : {
            type : String,
            required : true,
        },
        penjualan_oli : {
            type : String,
            required : true,
        }
    }
);

module.exports = mongoose.model("Laporan", laporanSchema);