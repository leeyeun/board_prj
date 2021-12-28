const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const PORT = process.env.port || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/board/get", (req, res) => {
    const sqlQuery = "SELECT * FROM board ORDER BY id DESC;";
    db.query(sqlQuery, (err, result) => {
        res.send(result);
    })
});

app.post("/board/insert", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const sqlQuery = "INSERT INTO board (title, content) VALUES (?, ?)";
    db.query(sqlQuery, [title, content], (err, result) => {
        res.send('success!');
    })
});


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});