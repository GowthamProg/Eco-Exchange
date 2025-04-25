        require('dotenv').config();

        const express = require('express');
        const { MongoClient } = require('mongodb');
        const bodyparser = require('body-parser');
        const cors = require('cors');
        //const jwt = require('jsonwebtoken');

        const app = express();
        app.use(express.json());
        app.use(bodyparser.json());
        app.use(cors());

        const uri = process.env.uri;
        const client = new MongoClient(uri);
        const Secret_key = process.env.Secret_key;

        let collection=0;
        async function connectToDatabase() {
            if (!collection) {
                await client.connect();
                collection = client.db("E-Waste_collection").collection('user');
            }
            return collection;
        }
        let collect=0;
        async function connectionToDatabase() {
            if (!collect) {
                await client.connect();
                collect = client.db("E-Waste_collection").collection('ewasteform');
            }
            return collect;
        }

        // ✅ LOGIN ROUTE (email + password)
            app.post('/login', async (req, res) => {
                const { email, password } = req.body;
                console.log("Login request received:", email, password); // ✅ Debug log

                try {
                    const userCollection = await connectToDatabase();
                    console.log("Connected to DB");
                    const userAvailable = await userCollection.findOne({ email, password });
                    console.log("User found:", userAvailable);

                    if (userAvailable) {

                        return res.status(200).json({
                            message: "Login successful",
                            id: userAvailable._id,
                            username: userAvailable.username
                        });
                    }

                    res.status(400).json({ message: "Invalid credentials" });

                } catch (error) {
                    console.error("Login error:", error); // ✅ Detailed error log
                    res.status(500).json({ message: "Login failed", error: error.message });
                }
            });



        app.post('/register', async (req, res) => {
            try {
                const userCollection = await connectToDatabase();
                const userData = req.body;
                console.log("User inserted:",userData);

                // Optional: Check if user already exists
                const existingUser = await userCollection.findOne({ email: userData.email });
                if (existingUser) {
                    return res.status(400).json({ message: "User already exists with this email" });
                }
                
                // Insert into database
                const result = await userCollection.insertOne(userData);
                console.log("User inserted:", result.insertedId);

                res.status(200).json({ message: "Registration successful" });
            } catch (error) {
                console.error("Registration error:", error);
                res.status(500).json({ message: "Server error", error });
            }
        });



        app.post('/ewasteform', async (req, res) => {
            try {
            const {id, ...listingData} = req.body;
            console.log("Received data:", listingData);
            console.log("ID: ", id);
        
            const userCollection = await connectionToDatabase();
            const dataToInsert = {
                ...listingData,
                userId: id  // Attach user ID to the listing
            };
            const result = await userCollection.insertOne(dataToInsert);
            res.status(200).json({ message: "Listing saved", id: result.insertedId });
            } catch (error) {
            console.error("Error saving listing:", error);
            res.status(500).json({ message: "Failed to save listing", error });
            }
        });
        
        // ✅ Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on http://localhost:${PORT}`);
        });
