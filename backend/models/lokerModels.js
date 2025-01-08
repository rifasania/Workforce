const mongoose = require('mongoose');

const lokerSchema = new mongoose.Schema({
    kode_provinsi: { type: Number, required: true },
    nama_provinsi: { type: String, required: true },
    kode_kabupaten_kota: { type: Number, required: true },
    nama_kabupaten_kota: { type: String, required: true },
    jumlah_lowongan_kerja: { type: Number, required: true },
    satuan: { type: String, required: true },
    tahun: { type: Number, required: true },
}, {    
    collection: 'jum_loker'
});

module.exports = mongoose.model('jumLoker', lokerSchema);