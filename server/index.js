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
                console.log("Decoded token:", decoded); // Log decoded token
                req.userId = decoded.userId; // Ensure userId is being assigned correctly
                console.log("User ID from token:", req.userId);
                console.log(req.userId);
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
                    //const name = result.rows[0].email;
                    const userId = result.rows[0].id;
                    const token = jwt.sign({userId}, "jwt-secret-key", {expiresIn: "1d"});
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

app.post('/add-person', verifyUser, async (req, res) => {
    try {
        const {name, surname, voiv, m_year, b_year, sex, description} = req.body;
        const userId = req.userId;

        const insertQuery = `INSERT INTO missing_people (id, name, surname, voiv, m_year, b_year, sex, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

        const personId = uuidv4();
        const userMissingID = uuidv4();

        await pool.query(insertQuery, [
            personId,
            name,
            surname,
            voiv,
            m_year,
            b_year,
            sex,
            description
        ]);

        const relationQuery = `INSERT INTO user_missing_people (id, user_id, missing_person_id) VALUES ($1, $2, $3)`;
        await pool.query(relationQuery, [userMissingID, userId, personId]);

        res.json({Status: "Success", personId, userMissingID});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({Error: "Server error while adding missing person"});
    }
});

app.get('/personal-list',verifyUser, async (req, res) => {
    try {
        const userId = req.userId;
        const query = `SELECT * FROM missing_people AS mp JOIN user_missing_people AS ump ON mp.id=ump.missing_person_id WHERE ump.user_id = $1`;
        const result = await pool.query(query, [userId]);
        console.log("Query Result:", result.rows); // Debugging query result

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({Error: 'Server error viewing logged list '});
    }
});

app.post('/edit-data', verifyUser, async (req, res) => {
    console.log("Hit /edit-data route");

    try {
        const {missing_person_id, name, surname, voiv, m_year, b_year, sex, description} = req.body;
        console.log("Request Data:", missing_person_id, name, surname, voiv, m_year, b_year, sex, description);  // Log the data you're trying to update

        const query = `UPDATE missing_people SET name =$1, surname =$2, voiv=$3, m_year=$4, b_year=$5, sex=$6, description=$7 WHERE id=$8 RETURNING *`;
        const values = [name, surname, voiv, m_year, b_year, sex, description, missing_person_id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Record not found" });
        }
        console.log("Updated Record:", result.rows[0]);  // Log the updated record

        res.json({ Status: "Success", data: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        console.log({Error:'Server update data error'});
    }
});

app.post('/delete', verifyUser, async (req, res) => {
    try {
        const {id, missing_person_id} = req.body;

        const personQuery = `DELETE FROM missing_people WHERE id=$1`;
        const pValues = [missing_person_id];

        const userPersonQuery = `DELETE FROM user_missing_people WHERE id=$1`;
        const upValues = [id];

        await pool.query(personQuery, pValues);
        await pool.query(userPersonQuery, upValues);
        res.status(200).json({ status: "Success", message: "Record deleted successfully" });

    } catch (err) {
        console.error(err.message);
        console.log({Error:'Server delete data error'});
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


