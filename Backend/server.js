require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');
//const jwt = require('jsonwebtoken');

const app = express();
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
                email: userAvailable.email,
                name: userAvailable.name
            });
        }

        res.status(400).json({ message: "Invalid credentials" });

    } catch (error) {
        console.error("Login error:", error); // ✅ Detailed error log
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

app.post('/ewasteform', async (req, res) => {
    try {
      const listingData = req.body;
      console.log("Received data:", listingData);
  
    //   const userCollection = await connectToDatabase();
    //   const result = await userCollection.insertOne(listingData);
  
    //  res.status(200).json({ message: "Listing saved", id: result.insertedId });
     res.status(200).json({ message: "Listing saved"});
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
