const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
    kode_provinsi: { type: Number, required: true },
    nama_provinsi: { type: String, required: true },
    kode_kabupaten_kota: { type: Number, required: true },
    nama_kabupaten_kota: { type: String, required: true },
    jumlah_pencari_kerja: { type: Number, required: true },
    satuan: { type: String, required: true },
    tahun: { type: Number, required: true },
}, {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
    collection: 'job_seeker'
});

module.exports = mongoose.model('jobSeeker', jobSeekerSchema);
