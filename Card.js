const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "pets.json");

// Функция сохранения питомца
function savePet(pet) {
    let pets = [];
  
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
  
      try {
        pets = data.trim() ? JSON.parse(data) : [];
      } catch (err) {
        console.error("Ошибка чтения файла:", err.message);
        pets = [];
      }
    }
  
    // получаем следующий ID на основе текущих данных
    const nextId = getNextId(pets);
    pet.id = nextId;
    pets.push(pet);
  
    try {
      fs.writeFileSync(filePath, JSON.stringify(pets, null, 2), "utf-8");
      console.log(`✅ Pet "${pet.name}" saved with ID ${pet.id}.`);
    } catch (err) {
      console.error("Ошибка записи файла:", err.message);
    }
  }
  

  function askPetInfo() {
    rl.question("Enter pet name: ", (name) => {
      rl.question("Enter pet breed: ", (breed) => {
        rl.question("Enter pet gender: ", (gender) => {
          rl.question("Enter pet age: ", (age) => {
  
            // Сохраняем питомца сразу
            savePet({ name, breed, gender, age });
  
            rl.question("\nAdd another pet? (y/n): ", (answer) => {
              if (answer.toLowerCase() === "y") {
                askPetInfo(); // ввод следующего
              } else {
                rl.close(); // завершаем
              }
            });
  
          });
        });
      });
    });
  }
  
  function getNextId(pets) {
    if (pets.length === 0) return 1;
    return Math.max(...pets.map(p => p.id)) + 1;
  }

  askPetInfo();