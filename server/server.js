const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// เส้นทางไปยังไฟล์ build ของ Angular
app.use(express.static(path.join(__dirname, '../dist/intelligent-global/browser')));

const dataFilePath = path.join(__dirname, '../dist/intelligent-global/browser/assets/data/data.json');

// API Endpoints
app.get('/api/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/data', (req, res) => {
    console.log("=================", dataFilePath)
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log("=================", err)
            return res.status(500).send('Error reading data');
        }
        const jsonData = JSON.parse(data);
        jsonData.push(req.body);
        console.log("=================", jsonData)
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log("=================", err)
                return res.status(500).send('Error writing data');
            }
            console.log("=================1")
            res.status(201).send('Data added');
        });
    });
});

app.put('/api/data/:id', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const jsonData = JSON.parse(data);
        const index = jsonData.findIndex(item => item.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).send('Data not found');
        }
        jsonData[index] = req.body;
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            res.send('Data updated');
        });
    });
});

app.delete('/api/data/:id', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const jsonData = JSON.parse(data);
        const updatedData = jsonData.filter(item => item.id !== parseInt(req.params.id));
        fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            res.send('Data deleted');
        });
    });
});

// ส่งไฟล์ index.html เมื่อเข้าถึง URL ที่ไม่ใช่ API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/intelligent-global/browser/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
