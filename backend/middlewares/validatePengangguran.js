const validatePengangguran = (req, res, next) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        tingkat_pengangguran_terbuka, 
        satuan, 
        tahun 
    } = req.body;

    if (!kode_provinsi || !nama_provinsi || !kode_kabupaten_kota || 
        !nama_kabupaten_kota || !tingkat_pengangguran_terbuka || !satuan || !tahun) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Pastikan tahun adalah angka
    if (isNaN(tahun)) {
        return res.status(400).json({ message: 'Tahun harus berupa angka' });
    }

    // Pastikan tingkat pengangguran terbuka valid (opsional)
    if (isNaN(parseFloat(tingkat_pengangguran_terbuka.replace(',', '')))) {
        return res.status(400).json({ message: 'tingkat pengangguran terbuka tidak valid' });
    }

    next(); // Lanjut ke controller
};

module.exports = validatePengangguran;
