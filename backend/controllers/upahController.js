const UpahMinimum = require('../models/UpahMinimum');

// GET all data
const getAllUpah = async (req, res) => {
    try {
        const data = await UpahMinimum.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET data by ID
const getUpahById = async (req, res) => {
    try {
        const data = await UpahMinimum.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Data not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new data
const createUpah = async (req, res) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        besaran_upah_minimum, 
        satuan, 
        tahun 
    } = req.body;

    const newData = new UpahMinimum({
        kode_provinsi,
        nama_provinsi,
        kode_kabupaten_kota,
        nama_kabupaten_kota,
        besaran_upah_minimum,
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
const updateUpah = async (req, res) => {
    try {
        const updatedData = await UpahMinimum.findByIdAndUpdate(
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
const deleteUpah = async (req, res) => {
    try {
        const deletedData = await UpahMinimum.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ message: 'Data not found' });
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllUpah,
    getUpahById,
    createUpah,
    updateUpah,
    deleteUpah,
};
