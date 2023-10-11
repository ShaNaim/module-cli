import inquirer from "inquirer";

async function askName() {
  const answers = await inquirer.prompt({
    name: "module_name",
    type: "input",
    message: "What is your module's name?",
  });

  moduleName = answers.module_name;
  console.log(moduleName);
}
