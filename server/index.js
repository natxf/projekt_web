const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'prog_web',
    password: 'admin',  
    port: 5432
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API endpoint example
app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM missing_people');
        console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/m-year', async (req, res) => {
    try{
        const result = await pool.query('SELECT m_year FROM missing_people');
       // console.log(result.rows);
        res.json(result.rows);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

app.get('/b-year', async (req, res) => {
    try{
        const result = await pool.query('SELECT b_year FROM missing_people');
        console.log(result);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
