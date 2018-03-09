const express = require('express');

router = express.Router();
const getBPIs = require('../models/bitcoins.js');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

router.get('/compare', (req, res) => {
    getBPIs()
    .then(change => {
        res.status(STATUS_SUCCESS);
        res.send(change);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send( {err: err} );
    });
});

module.exports = router;