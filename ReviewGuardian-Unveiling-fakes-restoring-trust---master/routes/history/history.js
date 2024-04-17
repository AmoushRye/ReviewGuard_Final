const express = require('express');
const { createHistoryCtrl, fetchHistoryCtrl, deleteHistoryCtrl } = require('../../controllers/history/history');
const historyRoutes = express.Router();
const protected = require('../../middlewares/protected');

//POST/api/history
historyRoutes.post('/', protected, createHistoryCtrl);

//GET/api/history
historyRoutes.get('/',protected, fetchHistoryCtrl);

//DELETE/api/history/:id
historyRoutes.delete('/:id',protected, deleteHistoryCtrl);


module.exports = historyRoutes;