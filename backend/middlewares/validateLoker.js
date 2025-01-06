const validateLoker = (req, res, next) => {
    const { 
        kode_provinsi, 
        nama_provinsi, 
        kode_kabupaten_kota, 
        nama_kabupaten_kota, 
        jumlah_lowongan_kerja, 
        satuan, 
        tahun 
    } = req.body;

    if (!kode_provinsi || !nama_provinsi || !kode_kabupaten_kota || 
        !nama_kabupaten_kota || !jumlah_lowongan_kerja || !satuan || !tahun) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Pastikan tahun adalah angka
    if (isNaN(tahun)) {
        return res.status(400).json({ message: 'Tahun harus berupa angka' });
    }

    // Pastikan jumlah lowongan kerja valid (opsional)
    if (isNaN(parseFloat(jumlah_lowongan_kerja.replace(',', '')))) {
        return res.status(400).json({ message: 'Jumlah lowongan kerja tidak valid' });
    }

    next(); // Lanjut ke controller
};

module.exports = validateLoker;
