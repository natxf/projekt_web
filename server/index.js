const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const salt =10;

// Middleware
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'prog_web',
    password: 'admin',  
    port: 5432
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "You are not authenricated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "incorrect token"});
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name});
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

app.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term;
        if (!searchTerm) {
            return res.status(400).json({ error: "Search term is required." });
        }

        const query = `
            SELECT * 
            FROM missing_people 
            WHERE LOWER(name) LIKE $1 OR LOWER(surname) LIKE $2
        `;
        const searchValue = `%${searchTerm.toLowerCase()}%`;

        const result = await pool.query(query, [searchValue, searchValue]);

        res.json(result.rows);
    } catch (err) {
        console.error("Error executing search query", err);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.post('/register', (req, res) => {
    const userId = uuidv4();

    const query = "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"}); 
        const values = [
            userId,
            req.body.name,
            req.body.email,
            hash
        ]
        pool.query(query, values, (err, result) => {
            if(err) {
                console.error("Database error: ", err);
                return res.json({Error: "Inserting registration data in server error"})
            }
            return res.json({Status: "Success"});
        });
    });
});

app.post('/login', (req, res) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const email = req.body.email;

    if (!email) {
        return res.json({ Error: "Email is required" });
    }

    pool.query(query, [email], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.json({ Error: "Login error in server" });
        }

        if (result.rows.length > 0) {
            const user = result.rows[0];

            if (!user.password) {
                return res.json({ Error: "Password not found for this user" });
            }

            bcrypt.compare(req.body.password.toString(), user.password, (compareErr, response) => {
                if (compareErr) {
                    console.error("Error comparing passwords:", compareErr);
                    return res.json({ Error: "Password compare error" });
                }

                if (response) {
                    const name = result.rows[0].email;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: "1d"});
                    console.log('Before setting cookie:', res.getHeaders());

                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax',
                        path: '/',

                    });
                    console.log('After setting cookie:', res.getHeaders());

                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            });
        } else {
            return res.json({ Error: "Email doesn't exist" });
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
