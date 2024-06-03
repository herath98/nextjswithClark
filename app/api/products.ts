import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const filePath = path.resolve('data/products.json');

// Helper function to read the JSON file
const readData = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to the JSON file
const writeData = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newProduct = req.body;
    const data = readData();
    data.push({ ...newProduct, id: data.length + 1 });
    writeData(data);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } else if (req.method === 'GET') {
    const data = readData();
    res.status(200).json(data);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
