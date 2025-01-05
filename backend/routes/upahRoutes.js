const express = require('express');
const {
    getAllUpah,
    getUpahById,
    createUpah,
    updateUpah,
    deleteUpah,
} = require('../controllers/upahController');
const validateUpah = require('../middlewares/validateUpah');
const router = express.Router();

router.get('/', getAllUpah);
router.get('/:id', getUpahById);
router.post('/', validateUpah, createUpah);
router.put('/:id', validateUpah, updateUpah);
router.delete('/:id', deleteUpah);

module.exports = router;
