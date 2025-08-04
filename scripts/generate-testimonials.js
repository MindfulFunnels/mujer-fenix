// Script para generar automáticamente la lista de testimonios
import fs from "fs";
import path from "path";

const testimonialsDir = path.join(process.cwd(), "public", "testimonios");
const outputFile = path.join(process.cwd(), "src", "data", "testimonials.json");

function generateTestimonialsList() {
  try {
    // Leer archivos de la carpeta testimonios
    const files = fs.readdirSync(testimonialsDir);

    // Filtrar solo imágenes
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const imageFiles = files.filter((file) =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    // Generar rutas
    const images = imageFiles.map((file) => `/testimonios/${file}`);

    // Crear objeto JSON
    const data = {
      images: images,
      lastUpdated: new Date().toISOString(),
    };

    // Escribir archivo
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

    console.log(`✅ Testimonials list updated! Found ${images.length} images.`);
    console.log("Images:", images);
  } catch (error) {
    console.error("❌ Error generating testimonials list:", error);
  }
}

// Ejecutar el script
generateTestimonialsList();
