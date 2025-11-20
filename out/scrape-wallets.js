import fs from 'fs/promises';

async function getUniqueOwnersFromFile(filePath) {
    try {
        // Read the file
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        // Extract assets
        const assets = jsonData.assets || [];
        
        // Collect unique owners
        const owners = new Set();
        assets.forEach(asset => {
            if (asset.owner) {
                owners.add(asset.owner);
            }
        });

        // Convert the set to an array
        return Array.from(owners);
    } catch (error) {
        console.error('Error reading or parsing the file:', error.message);
        return [];
    }
}

async function saveUniqueOwnersToFile(owners, outputFilePath) {
    try {
        const jsonContent = JSON.stringify(owners, null, 2); // Pretty print JSON
        await fs.writeFile(outputFilePath, jsonContent, 'utf8');
        console.log(`Unique owners have been written to ${outputFilePath}`);
    } catch (error) {
        console.error('Error writing to file:', error.message);
    }
}

// Main function to process and output the data
async function processOwners() {
    const inputFilePath = 'based-ape-gang.json';
    const outputFilePath = 'unique-owners.json';

    const uniqueOwners = await getUniqueOwnersFromFile(inputFilePath);
    if (uniqueOwners.length > 0) {
        await saveUniqueOwnersToFile(uniqueOwners, outputFilePath);
    } else {
        console.log('No unique owners found.');
    }
}

// Run the main function
processOwners();
