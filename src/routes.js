const express = require('express');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use('/', (req, res) => {
  res.json({
    message: 'helloworld',
  });
});

module.exports = router;
