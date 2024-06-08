require("dotenv").config();
const express = require ("express");
const db = require('./db');
const morgan = require ("morgan");
const app = express();

app.use(express.json())

//Get all restaurants
app.get("/api/v1/restaurants" , async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM restaurants ORDER BY id");
        res.json({
            status: "success",
            result: result.rows.length,
            data: {
                restaurants: result.rows,
            },
        });
    } catch (error) {
        console.log(err);
    }
});

//Get a restaurants
app.get("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const {id} = req.params
        const result = await db.query(`select * from restaurants where id = $1`, [id]);
        console.log(result.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0] ,
            },
        });
    } catch (error) {
        console.log(err);
    }
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);

    try {
        const result = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
            [req.body.name, req.body.location, req.body.price_range]);
        console.log(result); 
        
        res.status(201).json({
            status: "success",
            data: {
                restaurant: result.rows[0],
            },
        });
    } catch (error) {
        console.log(err);
    }
});

//Update a restaurant
app.put("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const result = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(result);
        res.status(200).json({
        status: "success",
        data: {
            restaurant: result.rows[0],
        },
    });
    } catch (error) {
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);

    
});

//Delete

app.delete("/api/v1/restaurants/:id", async(req, res)=> {
    try {
        const result = db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);

        res.status(204).json({
            status: "success",
        });

    } catch (error) {
        console.log(err);
    }
    
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Console is up and listening on port ${port}`);
});