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

// 1. Total Tingkat Pengangguran Terbuka per Tahun
const getTotalPengangguranTerbukaPerTahun = async (req, res) => {
    try {
      const result = await PengangguranTerbuka.aggregate([
        {
          $group: {
            _id: "$tahun",
            totalPengangguranTerbuka: { $sum: { $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } } }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching total tingkat pengangguran terbuka per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // 2. Rata-Rata Tingkat Pengangguran Terbuka per Kabupaten/Kota per Tahun
  const getRataRataPengangguranTerbukaPerTahun = async (req, res) => {
    try {
      const result = await PengangguranTerbuka.aggregate([
        {
          $group: {
            _id: { tahun: "$tahun", nama_kabupaten_kota: "$nama_kabupaten_kota" },
            rataRataPengangguran: { $avg: { $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } } }
          }
        },
        {
          $group: {
            _id: "$_id.tahun",
            rataRataTahun: { $avg: "$rataRataPengangguran" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching rata-rata tingkat pengangguran terbuka per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // 3. Kabupaten/Kota dengan Tingkat Pengangguran Terbuka Tertinggi dan Terendah per Tahun
  const getTertinggiTerendahPengangguranTerbukaPerTahun = async (req, res) => {
    try {
      const result = await PengangguranTerbuka.aggregate([
        {
          $group: {
            _id: "$tahun",
            tertinggi: { $max: { $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } } },
            terendah: { $min: { $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } } },
            tertinggiData: {
              $push: {
                $cond: [
                  { $eq: [{ $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } }, { $max: { $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } } }] },
                  { nama_kabupaten_kota: "$nama_kabupaten_kota", tingkat: "$tingkat_pengangguran_terbuka" },
                  null
                ]
              }
            },
            terendahData: {
              $push: {
                $cond: [
                  { $eq: [{ $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } }, { $min: { $toDouble: {
                $replaceAll: {
                    input: { $toString: "$tingkat_pengangguran_terbuka" }, // Mengubah angka menjadi string
                    find: ",",
                    replacement: "."
                }
            } } }] },
                  { nama_kabupaten_kota: "$nama_kabupaten_kota", tingkat: "$tingkat_pengangguran_terbuka" },
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
      console.error("Error fetching tertinggi dan terendah tingkat pengangguran terbuka per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    getAllPengangguran,
    getPengangguranById,
    createPengangguran,
    updatePengangguran,
    deletePengangguran,
    getTotalPengangguranTerbukaPerTahun,
    getRataRataPengangguranTerbukaPerTahun,
    getTertinggiTerendahPengangguranTerbukaPerTahun,
};
