const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const petsFile = path.join(__dirname, "pets.json");

// Загрузка питомцев
function loadPets() {
  if (!fs.existsSync(petsFile)) return [];
  const data = fs.readFileSync(petsFile, "utf-8");
  return data.trim() ? JSON.parse(data) : [];
}

// Сохранение питомцев
function savePets(pets) {
  fs.writeFileSync(petsFile, JSON.stringify(pets, null, 2), "utf-8");
}

// Выбор питомца
function askPetId(pets) {
  rl.question("Enter pet ID: ", (idInput) => {
    const id = Number(idInput);
    if (isNaN(id)) {
      console.log("❌ Invalid ID.");
      return askPetId(pets);
    }

    const pet = pets.find(p => p.id === id);
    if (!pet) {
      console.log("❌ Pet not found.");
      return askPetId(pets);
    }

    console.log(`\n👤 Selected pet: ${pet.name} (ID: ${pet.id})`);
    askToSetPlan(pets, pet);
  });
}

// Установка плана по калориям (если пользователь хочет)
function askToSetPlan(pets, pet) {
  if (pet.caloriePlan) {
    askFoodInfo(pets, pet);
    return;
  }

  rl.question("Do you want to set a calorie plan? (y/n): ", (answer) => {
    if (answer.toLowerCase() === "y") {
      rl.question("Enter calorie plan (kcal): ", (planInput) => {
        const plan = Number(planInput);
        if (isNaN(plan) || plan <= 0) {
          console.log("❌ Invalid plan value.");
          return askToSetPlan(pets, pet);
        }

        pet.caloriePlan = plan;
        savePets(pets);
        console.log(`✅ Calorie plan set to ${plan} kcal.`);
        askFoodInfo(pets, pet);
      });
    } else {
      askFoodInfo(pets, pet);
    }
  });
}

// Добавление приёмов пищи
function askFoodInfo(pets, pet) {
  rl.question("Enter calories: ", (calInput) => {
    const calories = Number(calInput);
    if (isNaN(calories) || calories <= 0) {
      console.log("❌ Invalid number.");
      return askFoodInfo(pets, pet);
    }

    if (!pet.meals) pet.meals = [];

    pet.meals.push({
      calories,
      timestamp: new Date().toISOString()
    });

    savePets(pets);

    rl.question("Add another meal? (y/n): ", (answer) => {
      if (answer.toLowerCase() === "y") {
        askFoodInfo(pets, pet);
      } else {
        const totalCalories = pet.meals.reduce((sum, m) => sum + m.calories, 0);
        console.log(`\n✅ Meals added for ${pet.name}`);
        console.log(`🍽 Total meals: ${pet.meals.length}`);
        console.log(`🔥 Total calories: ${totalCalories}`);

        if (pet.caloriePlan) {
            console.log(`🎯 Calorie plan: ${pet.caloriePlan} kcal`);
          
            const progress = (totalCalories / pet.caloriePlan) * 100;
            const rounded = progress.toFixed(1);
          
            console.log(`📊 Progress: ${rounded}% of the plan completed.`);
          
            if (progress >= 100) {
              console.log("💪 Plan reached or exceeded!");
            } else {
              const remaining = pet.caloriePlan - totalCalories;
              console.log(`⚠️ ${remaining} kcal remaining to reach the goal.`);
            }
          }

        rl.close();
      }
    });
  });
}

// 🚀 Запуск
const pets = loadPets();
if (pets.length === 0) {
  console.log("⚠️ No pets found in pets.json.");
  rl.close();
} else {
  askPetId(pets);
}
