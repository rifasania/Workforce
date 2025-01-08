const mongoose = require('mongoose');

const pengangguranTerbukaSchema = new mongoose.Schema({
    kode_provinsi: { type: Number, required: true },
    nama_provinsi: { type: String, required: true },
    kode_kabupaten_kota: { type: Number, required: true },
    nama_kabupaten_kota: { type: String, required: true },
    tingkat_pengangguran_terbuka: { type: String, required: true },
    satuan: { type: String, required: true },
    tahun: { type: Number, required: true },
}, {    
    collection: 'pengangguran_terbuka'
});

module.exports = mongoose.model('pengangguranTerbuka', pengangguranTerbukaSchema);
