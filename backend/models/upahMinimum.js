const mongoose = require('mongoose');

const upahMinimumSchema = new mongoose.Schema({
    kode_provinsi: { type: Number, required: true },
    nama_provinsi: { type: String, required: true },
    kode_kabupaten_kota: { type: Number, required: true },
    nama_kabupaten_kota: { type: String, required: true },
    besaran_upah_minimum: { type: String, required: true },
    satuan: { type: String, required: true },
    tahun: { type: Number, required: true },
}, {    
    collection: 'upah_minimum'
});

module.exports = mongoose.model('UpahMinimum', upahMinimumSchema);
