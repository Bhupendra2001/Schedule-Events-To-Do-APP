const express = require('express')

const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())


const fs = require('fs');

const dataPath = './events.json';

// Read data from the JSON file
function readDataFromFile() {
  try {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return [];
  }
}

// Write data to the JSON file
function writeDataToFile(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}

// GET all schedule items
app.get('/api/events', (req, res) => {
    const data = readDataFromFile();
    res.json(data);
  });
  
  // POST a new schedule item
  app.post('/api/events', (req, res) => {
    const data = readDataFromFile();
    const newItem = req.body;
  
    // Assign a unique ID to the new item
   // newItem.id = generateUniqueId();
  
    // Add the new item to the data array
    data.push(newItem);
  
    // Write the updated data back to the JSON file
    writeDataToFile(data);
  
    res.status(201).json(newItem);
  });
  
  // DELETE a schedule item by ID
  app.delete('/api/events/:id', (req, res) => {
    const id = req.params.id;
    const data = readDataFromFile();
  
    // Find the index of the item with the specified ID
    const index = data.findIndex(item => item.id === id);
  
    if (index !== -1) {
      // Remove the item from the data array
      data.splice(index, 1);
  
      // Write the updated data back to the JSON file
      writeDataToFile(data);
  
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
  
  // PUT request to update event status by ID
 app.put('/api/events/:id', (req, res) => {
    const id = req.params.id;
    const data = readDataFromFile();
  
    // Find the index of the event with the specified ID
    const eventIndex = data.findIndex(event => event.id === id);
  
    if (eventIndex !== -1) {
      // Update the event status
      data[eventIndex].completed = !data[eventIndex].completed;
  
      // Write the updated data back to the JSON file
      writeDataToFile(data);
  
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
  
  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  });
  

app.listen(process.env.PORT , ()=>{
    console.log("server started in port "+ process.env.PORT)
})