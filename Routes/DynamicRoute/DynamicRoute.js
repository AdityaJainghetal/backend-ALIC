const express = require('express');
const router = express.Router();
const dynamicController = require('../../Controller/RoutedynamicController'); // Adjust the path as needed

// CRUD routes
router.post('/', dynamicController.createDynamic);
router.get('/', dynamicController.getAllDynamics);
router.get('/:id', dynamicController.getDynamicById);
router.put('/:id', dynamicController.updateDynamic);
router.delete('/:id', dynamicController.deleteDynamic);

module.exports = router;