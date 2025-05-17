const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

// Получить всех питомцев
router.get('/', petsController.getAllPets);

// Создать питомца
router.post('/', petsController.createPet);

// Обновить питомца
router.put('/:id', petsController.updatePet);

// Добавить прием пищи
router.post('/:id/feeding', petsController.addFeeding);

// Обновить прием пищи
router.put('/:id/feeding/:feedingId', petsController.updateFeeding);

router.delete('/:id', petsController.deletePet);

router.delete('/:id/feeding/:feedingId', petsController.deleteFeeding);


module.exports = router;
