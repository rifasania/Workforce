const express = require('express');
const {
    getAllLoker,
    getLokerById,
    createLoker,
    updateLoker,
    deleteLoker,
    getTotalLowonganPerTahun,
    getRataRataLowonganPerTahun,
    getTertinggiTerendahLowonganPerTahun,
} = require('../controllers/LokerController');
const validateLoker = require('../middlewares/validateLoker');
const router = express.Router();

router.get('/', getAllLoker);
router.get('/total', getTotalLowonganPerTahun);
router.get('/rata-rata', getRataRataLowonganPerTahun);
router.get('/tertinggi-terendah', getTertinggiTerendahLowonganPerTahun);
router.get('/:id', getLokerById);
router.post('/', validateLoker, createLoker);
router.put('/:id', validateLoker, updateLoker);
router.delete('/:id', deleteLoker);

module.exports = router;
