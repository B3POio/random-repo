import { copyFile } from 'fs/promises';

async function copyImageMultipleTimes() {
  const sourceImage = '0.jpg'; 
  const destinationFolder = './'; 
  const numberOfCopies = 602;

  for (let i = 1; i <= numberOfCopies; i++) {
    const newFileName = `based_ape_gang_${i}.png`; 

    try {
      await copyFile(sourceImage, `${destinationFolder}${newFileName}`);
      console.log(`Copied and renamed to: ${newFileName}`);
    } catch (err) {
      console.error(`Error copying file: ${err}`);
    }
  }
}

copyImageMultipleTimes();
