const express = require('express');
const {
    getAllLoker,
    getLokerById,
    createLoker,
    updateLoker,
    deleteLoker,
} = require('../controllers/LokerController');
const validateLoker = require('../middlewares/validateLoker');
const router = express.Router();

router.get('/', getAllLoker);
router.get('/:id', getLokerById);
router.post('/', validateLoker, createLoker);
router.put('/:id', validateLoker, updateLoker);
router.delete('/:id', deleteLoker);

module.exports = router;
