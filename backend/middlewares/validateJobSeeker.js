const validateJobSeeker = (req, res, next) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        jumlah_pencari_kerja, 
        satuan, 
        tahun 
    } = req.body;

    if (!kode_provinsi || !nama_provinsi || !kode_kabupaten_kota || 
        !nama_kabupaten_kota || !jumlah_pencari_kerja || !satuan || !tahun) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Pastikan tahun adalah angka
    if (isNaN(tahun)) {
        return res.status(400).json({ message: 'Tahun harus berupa angka' });
    }

    // Pastikan besaran upah minimum valid (opsional)
    // if (isNaN(parseFloat(jumlah_pencari_kerja.replace(',', '')))) {
    //     return res.status(400).json({ message: 'Besaran upah minimum tidak valid' });
    // }

    next(); // Lanjut ke controller
};

module.exports = validateJobSeeker;
