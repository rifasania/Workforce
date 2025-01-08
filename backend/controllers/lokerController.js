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

// 1. Total Lowongan Kerja per Tahun
const getTotalLowonganPerTahun = async (req, res) => {
    try {
      const result = await LowonganKerja.aggregate([
        {
          $group: {
            _id: "$tahun",
            totalLowongan: { $sum: "$jumlah_lowongan_kerja" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching total lowongan per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // 2. Rata-Rata Lowongan Kerja per Kabupaten/Kota per Tahun
  const getRataRataLowonganPerTahun = async (req, res) => {
    try {
      const result = await LowonganKerja.aggregate([
        {
          $group: {
            _id: { tahun: "$tahun", nama_kabupaten_kota: "$nama_kabupaten_kota" },
            rataRataLowongan: { $avg: "$jumlah_lowongan_kerja" }
          }
        },
        {
          $group: {
            _id: "$_id.tahun",
            rataRataTahun: { $avg: "$rataRataLowongan" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching rata-rata lowongan per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // 3. Kabupaten/Kota dengan Lowongan Terbanyak dan Terkecil per Tahun
  const getTertinggiTerendahLowonganPerTahun = async (req, res) => {
    try {
      const result = await LowonganKerja.aggregate([
        {
          $group: {
            _id: "$tahun",
            tertinggi: { $max: "$jumlah_lowongan_kerja" },
            terendah: { $min: "$jumlah_lowongan_kerja" },
            tertinggiData: {
              $push: {
                $cond: [
                  { $eq: ["$jumlah_lowongan_kerja", { $max: "$jumlah_lowongan_kerja" }] },
                  { nama_kabupaten_kota: "$nama_kabupaten_kota", jumlah: "$jumlah_lowongan_kerja" },
                  null
                ]
              }
            },
            terendahData: {
              $push: {
                $cond: [
                  { $eq: ["$jumlah_lowongan_kerja", { $min: "$jumlah_lowongan_kerja" }] },
                  { nama_kabupaten_kota: "$nama_kabupaten_kota", jumlah: "$jumlah_lowongan_kerja" },
                  null
                ]
              }
            }
          }
        },
        {
          $project: {
            tertinggi: 1,
            terendah: 1,
            tertinggiData: { $arrayElemAt: ["$tertinggiData", 0] },
            terendahData: { $arrayElemAt: ["$terendahData", 0] }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching tertinggi dan terendah lowongan per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }; 
  

module.exports = {
    getAllLoker,
    getLokerById,
    createLoker,
    updateLoker,
    deleteLoker,
    getTotalLowonganPerTahun,
    getRataRataLowonganPerTahun,
    getTertinggiTerendahLowonganPerTahun,
};