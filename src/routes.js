const express = require('express');
const { proxyToDomain } = require('./middleware');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use('/api', proxyToDomain('https://jsonplaceholder.typicode.com'));

module.exports = router;
