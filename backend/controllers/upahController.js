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

// AGGREGATE
const getAggregatedData = async (req, res) => {
    try {
        const result = await UpahMinimum.aggregate([
            {
                $addFields: {
                    besaran_upah_minimum: {
                        $toDouble: {
                            $replaceAll: {
                                input: { $toString: "$besaran_upah_minimum" }, // Mengubah angka menjadi string
                                find: ",",
                                replacement: "."
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$tahun",
                    totalUpahMinimum: { $sum: "$besaran_upah_minimum" },
                    rataRataUpahMinimum: { $avg: "$besaran_upah_minimum" },
                    tertinggi: { $max: "$besaran_upah_minimum" },
                    terendah: { $min: "$besaran_upah_minimum" },
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json(result);
    } catch (err) {
        console.error("Error in getAggregatedData:", err.message); // Log error
        res.status(500).json({ message: `Error fetching data: ${err.message}` }); // Kirim error detail ke client
    }
};

// JOIN
const getDataGabungan = async (req, res) => {
  try {
    const data = await UpahMinimum.aggregate([
      {
        $lookup: {
          from: "jum_loker",
          let: { kode: "$kode_kabupaten_kota", tahun: "$tahun" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$kode_kabupaten_kota", "$$kode"] },
                    { $eq: ["$tahun", "$$tahun"] },
                  ],
                },
              },
            },
          ],
          as: "lowonganKerjaData",
        },
      },
      {
        $lookup: {
          from: "job_seeker",
          let: { kode: "$kode_kabupaten_kota", tahun: "$tahun" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$kode_kabupaten_kota", "$$kode"] },
                    { $eq: ["$tahun", "$$tahun"] },
                  ],
                },
              },
            },
          ],
          as: "jobSeekerData",
        },
      },      
      {
        $project: {
          _id: 0, // Tidak perlu ID MongoDB
          nama_kabupaten_kota: 1,
          tahun: 1,
          upahMinimum: { $toString: "$besaran_upah_minimum" }, // Konversi upah minimum ke string
          lowonganKerja: { $arrayElemAt: ["$lowonganKerjaData.jumlah_lowongan_kerja", 0] },
          jobSeeker: { $arrayElemAt: ["$jobSeekerData.jumlah_pencari_kerja", 0] },          
        },
      },      
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getAllUpah,
    getUpahById,
    createUpah,
    updateUpah,
    deleteUpah,
    getAggregatedData,
    getDataGabungan,
};
