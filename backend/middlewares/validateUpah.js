const validateUpah = (req, res, next) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        besaran_upah_minimum, 
        satuan, 
        tahun 
    } = req.body;

    if (!kode_provinsi || !nama_provinsi || !kode_kabupaten_kota || 
        !nama_kabupaten_kota || !besaran_upah_minimum || !satuan || !tahun) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Pastikan tahun adalah angka
    if (isNaN(tahun)) {
        return res.status(400).json({ message: 'Tahun harus berupa angka' });
    }

    // Pastikan besaran upah minimum valid (opsional)
    if (isNaN(parseFloat(besaran_upah_minimum.replace(',', '')))) {
        return res.status(400).json({ message: 'Besaran upah minimum tidak valid' });
    }

    next(); // Lanjut ke controller
};

module.exports = validateUpah;
