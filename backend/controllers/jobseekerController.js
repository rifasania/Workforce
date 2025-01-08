const jobseeker = require('../models/jobseekerModels');

// GET all data
const getAllJobSeeker = async (req, res) => {
    try {
        const data = await jobseeker.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET data by ID
const getJobSeekerById = async (req, res) => {
    try {
        const data = await jobseeker.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Data not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new data
const createJobSeeker = async (req, res) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        jumlah_pencari_kerja, 
        satuan, 
        tahun 
    } = req.body;

    const newData = new jobseeker({
        kode_provinsi,
        nama_provinsi,
        kode_kabupaten_kota,
        nama_kabupaten_kota,
        jumlah_pencari_kerja,
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
const updateJobSeeker = async (req, res) => {
    try {
        const updatedData = await jobseeker.findByIdAndUpdate(
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
const deleteJobSeeker = async (req, res) => {
    try {
        const deletedData = await jobseeker.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ message: 'Data not found' });
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 1. Total Pencari Kerja per Tahun
const getTotalPencariKerjaPerTahun = async (req, res) => {
    try {
      const result = await jobseeker.aggregate([
        {
          $group: {
            _id: "$tahun",
            totalPencariKerja: { $sum: "$jumlah_pencari_kerja" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching total pencari kerja per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // 2. Rata-Rata Pencari Kerja per Kabupaten/Kota per Tahun
  const getRataRataPencariKerjaPerTahun = async (req, res) => {
    try {
      const result = await jobseeker.aggregate([
        {
          $group: {
            _id: { tahun: "$tahun", nama_kabupaten_kota: "$nama_kabupaten_kota" },
            rataRataPencariKerja: { $avg: "$jumlah_pencari_kerja" }
          }
        },
        {
          $group: {
            _id: "$_id.tahun",
            rataRataTahun: { $avg: "$rataRataPencariKerja" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching rata-rata pencari kerja per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // 3. Kabupaten/Kota dengan Jumlah Pencari Kerja Terbanyak dan Terkecil per Tahun
  const getTertinggiTerendahPencariKerjaPerTahun = async (req, res) => {
    try {
      const result = await jobseeker.aggregate([
        {
          $group: {
            _id: "$tahun",
            tertinggi: { $max: "$jumlah_pencari_kerja" },
            terendah: { $min: "$jumlah_pencari_kerja" },
            tertinggiData: {
              $push: {
                $cond: [
                  { $eq: ["$jumlah_pencari_kerja", { $max: "$jumlah_pencari_kerja" }] },
                  { nama_kabupaten_kota: "$nama_kabupaten_kota", jumlah: "$jumlah_pencari_kerja" },
                  null
                ]
              }
            },
            terendahData: {
              $push: {
                $cond: [
                  { $eq: ["$jumlah_pencari_kerja", { $min: "$jumlah_pencari_kerja" }] },
                  { nama_kabupaten_kota: "$nama_kabupaten_kota", jumlah: "$jumlah_pencari_kerja" },
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
      console.error("Error fetching tertinggi dan terendah pencari kerja per tahun:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    getAllJobSeeker,
    getJobSeekerById,
    createJobSeeker,
    updateJobSeeker,
    deleteJobSeeker,
    getTotalPencariKerjaPerTahun,
    getRataRataPencariKerjaPerTahun,
    getTertinggiTerendahPencariKerjaPerTahun,
};
