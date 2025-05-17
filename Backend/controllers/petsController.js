let pets = [];
let petId = 1;

exports.getAllPets = (req, res) => {
  res.json(pets);
};

exports.createPet = (req, res) => {
    const { name, gender, breed, age, planCalories } = req.body;

  
    const onlyLetters = /^[a-zA-Zа-яА-ЯёЁ]+$/;
  
    if (!onlyLetters.test(name) || !onlyLetters.test(gender) || !onlyLetters.test(breed)) {
      return res.status(400).json({ error: 'Имя, пол и порода должны содержать только буквы' });
    }
  
    const newPet = {
        id: petId++,
        name,
        gender,
        breed,
        age,
        planCalories: Number(planCalories) || 0,
        feedings: []
      };
      
  
    pets.push(newPet);
    res.status(201).json(newPet);
  };
  

exports.updatePet = (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) return res.status(404).json({ error: 'Питомец не найден' });

  const { name, gender, breed, age, planCalories } = req.body;

  if (planCalories !== undefined) pet.planCalories = Number(planCalories);

  if (name) pet.name = name;
  if (gender) pet.gender = gender;
  if (breed) pet.breed = breed;
  if (age) pet.age = age;

  res.json(pet);
};

exports.addFeeding = (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) return res.status(404).json({ error: 'Питомец не найден' });

  const { time, calories } = req.body;
  const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeFormat.test(time)) {
        return res.status(400).json({ error: 'Неверный формат времени. Используйте HH:MM' });
    }

    if (typeof calories !== 'number' || calories < 0) {
        return res.status(400).json({ error: 'Калории должны быть числом больше или равным 0' });
      }
      
  const feeding = {
    id: Date.now(), // простая генерация ID
    time,
    calories
  };
  pet.feedings.push(feeding);
  res.status(201).json(feeding);
};

exports.updateFeeding = (req, res) => {
    const pet = pets.find(p => p.id === parseInt(req.params.id));
    if (!pet) return res.status(404).json({ error: 'Питомец не найден' });
  
    const feeding = pet.feedings.find(f => f.id === parseInt(req.params.feedingId));
    if (!feeding) return res.status(404).json({ error: 'Прием пищи не найден' });
  
    const { time, calories } = req.body;
  
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (time && !timeFormat.test(time)) {
      return res.status(400).json({ error: 'Неверный формат времени. Используйте HH:MM' });
    }
  
    if (calories !== undefined && (typeof calories !== 'number' || calories < 0)) {
      return res.status(400).json({ error: 'Калории должны быть числом больше или равным 0' });
    }
  
    if (time) feeding.time = time;
    if (calories !== undefined) feeding.calories = calories;
  
    res.json(feeding);
  };
  

exports.deletePet = (req, res) => {
    const id = parseInt(req.params.id);
    const index = pets.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Питомец не найден' });
  
    pets.splice(index, 1);
    res.json({ message: 'Питомец удалён' });
  };
  
  exports.deleteFeeding = (req, res) => {
    const pet = pets.find(p => p.id === parseInt(req.params.id));
    if (!pet) return res.status(404).json({ error: 'Питомец не найден' });
  
    const index = pet.feedings.findIndex(f => f.id === parseInt(req.params.feedingId));
    if (index === -1) return res.status(404).json({ error: 'Приём пищи не найден' });
  
    pet.feedings.splice(index, 1);
    res.json({ message: 'Приём пищи удалён' });
  };
  