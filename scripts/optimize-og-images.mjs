import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;
const MAX_SIZE_KB = 300;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OG_DIR = path.join(PUBLIC_DIR, 'og-images');
const REPORT_FILE = path.join(process.cwd(), 'og-optimization-report.json');

// S'assurer que les répertoires existent
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
if (!fs.existsSync(OG_DIR)) fs.mkdirSync(OG_DIR, { recursive: true });

const report = {
  timestamp: new Date().toISOString(),
  processed: [],
  errors: []
};

function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const statsBefore = fs.statSync(filePath);
  const sizeBeforeKB = statsBefore.size / 1024;

  try {
    // Utilisation d'ImageMagick pour redimensionner et compresser
    // -resize 1200x630^ : redimensionne pour remplir les dimensions
    // -gravity center -extent 1200x630 : recadre au centre
    // On force la sortie en JPG pour une meilleure compression si c'est pour du OG
    const tempOutput = filePath.replace(ext, '.tmp.jpg');
    
    execSync(`convert "${filePath}" -resize ${TARGET_WIDTH}x${TARGET_HEIGHT}^ -gravity center -extent ${TARGET_WIDTH}x${TARGET_HEIGHT} -quality 85 "${tempOutput}"`);
    
    let statsAfter = fs.statSync(tempOutput);
    let sizeAfterKB = statsAfter.size / 1024;

    // Si l'image est toujours trop grande, on réduit la qualité
    if (sizeAfterKB > MAX_SIZE_KB) {
      execSync(`convert "${tempOutput}" -quality 70 "${tempOutput}"`);
      statsAfter = fs.statSync(tempOutput);
      sizeAfterKB = statsAfter.size / 1024;
    }

    // Remplacer l'original par la version optimisée (en gardant l'extension originale pour ne pas casser les liens)
    fs.renameSync(tempOutput, filePath);

    report.processed.push({
      file: fileName,
      beforeKB: sizeBeforeKB.toFixed(2),
      afterKB: sizeAfterKB.toFixed(2),
      status: 'success'
    });
  } catch (error) {
    report.errors.push({
      file: fileName,
      error: error.message
    });
  }
}

// Scanner le répertoire pour les images
if (fs.existsSync(OG_DIR)) {
  const files = fs.readdirSync(OG_DIR);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  files.forEach(file => {
    if (imageExtensions.includes(path.extname(file).toLowerCase()) && !file.includes('.tmp.')) {
      optimizeImage(path.join(OG_DIR, file));
    }
  });
}

fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
console.log(`Optimisation terminée. Rapport généré : ${REPORT_FILE}`);
console.table(report.processed);
if (report.errors.length > 0) {
  console.error('Erreurs rencontrées :');
  console.table(report.errors);
}
