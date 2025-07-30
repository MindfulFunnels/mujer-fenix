const fs = require("fs");
const path = require("path");
const readline = require("readline");
const fse = require("fs-extra");

const TEMPLATE_PATH = process.cwd(); // carpeta donde está este script
const TARGET_BASE_PATH = "C:/Users/Gallardo/Documents/MindFul"; // destino

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Nombre de la nueva landing: ", async (name) => {
  const targetPath = path.join(TARGET_BASE_PATH, name);

  try {
    // Copiar archivos, omitir carpetas basura
    await fse.copy(TEMPLATE_PATH, targetPath, {
      filter: (src) => {
        return !["node_modules", ".astro", ".vscode", "setup.js"].some(
          (excluded) => src.includes(path.join(TEMPLATE_PATH, excluded))
        );
      },
    });

    // Modificar el package.json
    const packagePath = path.join(targetPath, "package.json");
    const packageData = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
    packageData.name = name;
    fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));

    console.log(`✅ Proyecto "${name}" creado en:\n${targetPath}`);
    console.log(`👉 cd "${targetPath}"`);
    console.log("👉 npm install");
  } catch (err) {
    console.error("❌ Error al crear el proyecto:", err);
  } finally {
    rl.close();
  }
});
