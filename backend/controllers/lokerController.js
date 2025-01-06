const LowonganKerja = require('../models/lokerModels');

// GET all data
const getAllLoker = async (req, res) => {
    try {
        const data = await LowonganKerja.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET data by ID
const getLokerById = async (req, res) => {
    try {
        const data = await LowonganKerja.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Data not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new data
const createLoker = async (req, res) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        jumlah_lowongan_kerja,  
        satuan, 
        tahun 
    } = req.body;

    const newData = new LowonganKerja({
        kode_provinsi,
        nama_provinsi,
        kode_kabupaten_kota,
        nama_kabupaten_kota,
        jumlah_lowongan_kerja, 
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
const updateLoker = async (req, res) => {
    try {
        const updatedData = await LowonganKerja.findByIdAndUpdate(
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
const deleteLoker = async (req, res) => {
    try {
        const deletedData = await LowonganKerja.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ message: 'Data not found' });
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllLoker,
    getLokerById,
    createLoker,
    updateLoker,
    deleteLoker,
};