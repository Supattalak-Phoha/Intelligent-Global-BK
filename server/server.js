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
// const dataFilePathDB = path.join(__dirname, '../public/assets/data/data.json');

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
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const jsonData = JSON.parse(data);
        jsonData.push(req.body);
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            console.log("================= Dist =================")

            const axios = require('axios');
            const fs = require('fs');
            const path = require('path');

            const GITHUB_TOKEN = ''; // Replace with your GitHub token
            const REPO_OWNER = 'Supattalak-Phoha';
            const REPO_NAME = 'Intelligent-Global'; // Your repository name
            const FILE_PATH = dataFilePath; // Local file path you want to upload
            const COMMIT_MESSAGE = 'Update Data';
            const TARGET_PATH = 'public/assets/data'; // Directory in the repository

            const uploadFileToGitHub = async () => {
                try {
                    const fileName = path.basename(FILE_PATH);
                    const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
                    const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${fileName}`;

                    // Check if the file already exists
                    let sha = null;
                    try {
                        const response = await axios.get(fileUrl, {
                            headers: {
                                Authorization: `token ${GITHUB_TOKEN}`,
                            },
                        });
                        sha = response.data.sha;
                    } catch (error) {
                        if (error.response && error.response.status === 404) {
                            // File does not exist
                            sha = null;
                        } else {
                            throw error;
                        }
                    }

                    // Upload or update the file
                    const response = await axios.put(
                        fileUrl,
                        {
                            message: COMMIT_MESSAGE,
                            content: fileContent,
                            sha: sha, // Include sha if updating an existing file
                        },
                        {
                            headers: {
                                Authorization: `token ${GITHUB_TOKEN}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    console.log('File uploaded successfully');
                } catch (error) {
                    console.error('Error uploading file');
                }
            };

            uploadFileToGitHub();
            res.status(201).send('Data added');
        });

        // fs.writeFile(dataFilePathDB, JSON.stringify(jsonData, null, 2), (err) => {
        //     if (err) {
        //         return res.status(500).send('Error writing data');
        //     }
        //     console.log("================= DB =================")
        // });




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

app.post('/api/upload', (req, res) => {
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');

    const GITHUB_TOKEN = ''; // Replace with your GitHub token
    const REPO_OWNER = 'Supattalak-Phoha';
    const REPO_NAME = 'Intelligent-Global'; // Your repository name
    const FILE_PATH = '../public/assets/data/data.json'; // Local file path you want to upload
    const COMMIT_MESSAGE = 'your_commit_message';
    const TARGET_PATH = 'public/assets'; // Directory in the repository

    const uploadFileToGitHub = async () => {
        try {
            const fileName = path.basename(FILE_PATH);
            const fileContent = fs.readFileSync(FILE_PATH, { encoding: 'base64' });
            const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_PATH}/${fileName}`;

            // Check if the file already exists
            let sha = null;
            try {
                const response = await axios.get(fileUrl, {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`,
                    },
                });
                sha = response.data.sha;
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // File does not exist
                    sha = null;
                } else {
                    throw error;
                }
            }

            // Upload or update the file
            const response = await axios.put(
                fileUrl,
                {
                    message: COMMIT_MESSAGE,
                    content: fileContent,
                    sha: sha, // Include sha if updating an existing file
                },
                {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file');
        }
    };

    uploadFileToGitHub();

});


// ส่งไฟล์ index.html เมื่อเข้าถึง URL ที่ไม่ใช่ API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/intelligent-global/browser/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
