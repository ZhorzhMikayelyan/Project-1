const readline = require("readline");
const { spawn } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log(`
🐾 Welcome to Pet Tracker!
1. Create a new pet
2. Add meals to existing pet
3. Exit
  `);

  rl.question("Select an option (1-3): ", (answer) => {
    switch (answer) {
      case "1":
        launchScript("Card.js");
        break;
      case "2":
        launchScript("Food.js");
        break;
      case "3":
        console.log("👋 Goodbye!");
        rl.close();
        break;
      default:
        console.log("❌ Invalid input. Please choose 1, 2, or 3.");
        showMenu();
    }
  });
}

function launchScript(scriptName) {
  const child = spawn("node", [scriptName], { stdio: "inherit" });
  child.on("exit", () => {
    // После завершения дочернего скрипта возвращаемся в меню
    showMenu();
  });
}

showMenu();
