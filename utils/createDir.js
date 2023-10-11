import fs from "fs";
import { createSpinner } from "nanospinner";

export default async function createDir(moduleName) {
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

function createFile(source, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(source, content, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });
}
