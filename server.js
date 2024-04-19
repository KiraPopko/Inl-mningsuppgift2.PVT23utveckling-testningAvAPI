

// Importera Express för att kunna skapa en webbserver och Mongoose för att interagera med MongoDB-databasen.
import express from "express"
import mongoose from "mongoose"

//const express = require("express");
//const mongoose = require("mongoose");

// Skapar en instans av Express-appen, detta är vår webbserver.
const server = express()

// Bestämmer vilken port som servern ska lyssna på.
const port = 3000

/*
  Servern använder en middleware ( express.json() ) för att omvandla våra request till JSON.
  Detta gör att vi kan hantera JSON-data som skickas i request body.
*/
server.use(express.json())

/* 
  Vår MongoDB Atlas connection-string
  Ansluter till MongoDB-databasen med hjälp av Mongoose.
  Strängen innehåller: 
    Användarnamn - <Username>
    Lösenord - <Password>
    Databasnamnet (Optional) - <DB-Name>
*/
mongoose.connect("mongodb+srv://kirapopko:8Q6nR0qCAutHz1m5@cluster0.2drcl5t.mongodb.net/IU2")
/*
  Byt ut connection-string'en med er egna. Ni hittar er på MongoDB Atlas genom att gå in på: 

  Database -> 
  Kolla att ni har en databas, heter ofta "Cluster0" ->
  Trycka på "Connect" för den databasen ni vill ansluta till ->
  Kolla att eran nuvarande ip-adress är tillagd ->
  Välj "Compass" ->
  Under "2. Copy the connection string" hittar ni er connection-string

  OBS. Glöm inte ändra <password> !
*/

// Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
const usersSchema = new mongoose.Schema({
  username: String, // Varje "user" kommer att ha ett "username".
  title: String,
  author_name: String,  
  genre: String,
  year_of_publishing: String,
  about_book: String,
  rate: String
});

/* 
  Skapar en Mongoose-modell baserat på usersSchema.
  Detta tillåter oss att skapa, läsa, uppdatera, och ta bort (CRUD) dokument i vår "users"-collection.
*/
const User = mongoose.model('users', usersSchema);

/*
  Skapar en GET - route på '/api/users'. 
  När denna route anropas, hämtar den alla dokument från vår "users"-collection och skickar tillbaka dem som en JSON-response.
*/
server.get('/api/users', async (req, res) => {
  res.json(await User.find());  // Använder Mongoose's "find"-metod för att hämta alla "users".
});

server.get('/api/users/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)

    response.status(200).json({ message: "Du försöker hämta 1 användare", user: user })
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error })
  }
})

server.get('/api/users/test', async (request, response) => {
 
  try {
    //const { page, limit } = request.query;
    console.log(request.query)
  

   console.log("test")
    const users = await User.find()
        /*.limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();*/

    //const count = await User.countDocuments(); // Count all documents

     response.json({
      users: users,
      //totalPages: Math.ceil(count / limit),
      //currentPage: page,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Något gick fel", error: error })
  }
});

server.get("/api/users/tests", async (req, res) => {
  try {
    console.log(req.query)
    return res.status(409).json({ message: "Ingen inloggad." })
  } catch (error) {
    res.status(500).json({ message: "Något blev fel på servern" })
  }
})






/* 
  Startar servern så att den lyssnar på den definierade porten.
  När servern har startat, loggas ett meddelande till konsolen.
*/
server.listen(port, () => console.log(`Listening on port http://localhost:${port}`)) 
