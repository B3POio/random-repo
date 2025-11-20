import fetch from 'node-fetch'; // Ensure node-fetch is installed
import fs from 'fs';

// Define the API endpoint and headers
const url = 'https://api.opensea.io/api/v2/collection/basedapesummer/nfts?limit=200';
const options = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'x-api-key': '866f191685d5486aaf8f61a414e8bf5a',
  },
};

// Fetch data from the API
fetch(url, options)
  .then(response => response.json())
  .then(data => {
    // Save the data to posters.json
    fs.writeFile('posters.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Data saved to posters.json');
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
