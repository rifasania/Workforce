const PengangguranTerbuka = require('../models/pengangguranTerbuka');

// GET all data
const getAllPengangguran = async (req, res) => {
    try {
        const data = await PengangguranTerbuka.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET data by ID
const getPengangguranById = async (req, res) => {
    try {
        const data = await PengangguranTerbuka.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Data not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new data
const createPengangguran = async (req, res) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        tingkat_pengangguran_terbuka, 
        satuan, 
        tahun 
    } = req.body;

    const newData = new PengangguranTerbuka({
        kode_provinsi,
        nama_provinsi,
        kode_kabupaten_kota,
        nama_kabupaten_kota,
        tingkat_pengangguran_terbuka,
        satuan,
        tahun,
    });

    try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT (update) data by ID
const updatePengangguran = async (req, res) => {
    try {
        const updatedData = await PengangguranTerbuka.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Mengembalikan data setelah di-update
        );
        if (!updatedData) return res.status(404).json({ message: 'Data not found' });
        res.json(updatedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE data by ID
const deletePengangguran = async (req, res) => {
    try {
        const deletedData = await PengangguranTerbuka.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ message: 'Data not found' });
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllPengangguran,
    getPengangguranById,
    createPengangguran,
    updatePengangguran,
    deletePengangguran,
};
