import inquirer from "inquirer";
import fs from "fs";
import { createSpinner } from "nanospinner";
import path from "path";
// import { fileCreateTester } from "../utils";
let moduleName = "Vader";
const files = [
  { fileName: "routes.js", content: "console.log();" },
  { fileName: "controller.js", content: "console.log();" },
  { fileName: "service.js", content: "console.log();" },
  { fileName: "dal.js", content: "console.log();" },
];

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function askName() {
  const answers = await inquirer.prompt({
    name: "module_name",
    type: "input",
    message: "What is your module's name?",
  });

  moduleName = answers.module_name;
  console.log(moduleName);
}

async function createDir() {
  const spinner = createSpinner("Checking answer...").start();
  const moduleSrc = "src/modules/" + moduleName.trim();

  try {
    if (!fs.existsSync(moduleSrc)) {
      fs.mkdirSync(moduleSrc);
      spinner.success({
        text: `Module -- ${moduleSrc} -- Created`,
      });
    }
    fileCreateTester(moduleSrc + "/", spinner);
  } catch (err) {
    spinner.error({ text: `Folder Create Failed` });
    console.error(err);
    process.exit(1);
  }
}

function createFile(source, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(source, content, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });
}
export function fileCreateTester(moduleSrc, spinner) {
  const promises = files.map((file) => {
    const source = moduleSrc + file.fileName;
    const content = file.content;
    // Use these instead of line above if you have files in different
    // directories and want them all at the same level:
    // const filename = path.parse(file.path).base;
    // const destination = path.join('/tmp', filename);
    const newFile = createFile(source, content);
    spinner.success({
      text: `${file.fileName} Created`,
    });
    return newFile;
  });

  Promise.all(promises)
    .then((_) => {
      // do what you want
      console.log("done");
    })
    .catch((err) => {
      // handle I/O error
      console.error(err);
    });
}
console.clear();
await askName();
await createDir();
