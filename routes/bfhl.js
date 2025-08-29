const express = require('express');
const { bfhlHandler } = require('../controllers/bfhl');

const router = express.Router();

router.post('/bfhl', bfhlHandler);

module.exports = router;
