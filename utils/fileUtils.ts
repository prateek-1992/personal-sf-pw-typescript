import * as fs from 'fs';
import csv from 'csv-parser'; // Change the import style here

async function readDataFromCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const data: any[] = [];

    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

// Example usage
const csvFilePath = 'path/to/your/file.csv';

(async () => {
  try {
    const data = await readDataFromCSV(csvFilePath);
    console.log('Data from CSV:', data);
    // Use the data as needed in your Playwright tests
  } catch (error) {
    console.error('Error reading CSV file:', error);
  }
})();
