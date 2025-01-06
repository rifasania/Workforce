const express = require('express');
const {
    getAllPengangguran,
    getPengangguranById,
    createPengangguran,
    updatePengangguran,
    deletePengangguran,
} = require('../controllers/pengangguranController');
const validatePengangguran = require('../middlewares/validatePengangguran');
const router = express.Router();

router.get('/', getAllPengangguran);
router.get('/:id', getPengangguranById);
router.post('/', validatePengangguran, createPengangguran);
router.put('/:id', validatePengangguran, updatePengangguran);
router.delete('/:id', deletePengangguran);

module.exports = router;
