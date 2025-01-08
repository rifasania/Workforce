const express = require('express');
const {
    getAllJobSeeker,
    getJobSeekerById,
    createJobSeeker,
    updateJobSeeker,
    deleteJobSeeker,
    getTotalPencariKerjaPerTahun,
    getRataRataPencariKerjaPerTahun,
    getTertinggiTerendahPencariKerjaPerTahun,
} = require('../controllers/jobseekerController');

const validateJobSeeker = require('../middlewares/validateJobSeeker')
const router = express.Router();

router.get('/', getAllJobSeeker);
router.get('/total', getTotalPencariKerjaPerTahun);
router.get('/rata-rata', getRataRataPencariKerjaPerTahun);
router.get('/tertinggi-terendah', getTertinggiTerendahPencariKerjaPerTahun);
router.get('/:id', getJobSeekerById);
router.post('/', validateJobSeeker, createJobSeeker);
router.put('/:id', validateJobSeeker, updateJobSeeker);
router.delete('/:id', deleteJobSeeker);

module.exports = router;
