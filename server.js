

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
server.get('/api/users/filter', async (request, response) => {
  try {
    let { page, limit } = request.query;
    console.log(request.query);

    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.countDocuments(); // Count all documents

    return response.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Något gick fel", error: error });
    // You may want to call `next(error)` here if you want to pass the error to the error handling middleware
  }
});
server.get('/api/users', async (request, response) => {
  try {
    let { page, limit } = request.query;
    console.log(request.query);

    const users = await User.find({ ...request.query })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.countDocuments(); // Count all documents

    return response.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Något gick fel", error: error });
    // You may want to call `next(error)` here if you want to pass the error to the error handling middleware
  }
});

server.get('/api/users', async (req, res) => {
  res.json(await User.find());  // Använder Mongoose's "find"-metod för att hämta alla "users".
});


server.get('/api/users/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)

    response.status(200).json({ message: "You are trying to get 1 user", user: user })
  } catch (error) {
    response.status(500).json({ message: "Some error occured", error: error })
  }
})

server.post('/api/users', async (request, response) => {
  try {

    const title = request.body.title
    const author_name = request.body.author_name 
    const genre = request.body.genre
    const year_of_publishing = request.body.year_of_publishing
    const about_book = request.body.about_book
    const rate = request.body.rate

    console.log(title + " - title");
    console.log(typeof title + " - title typeof");
    console.log(title.length + " - title length");

    console.log(author_name + " - author_name");
    console.log(typeof author_name + " - author_name typeof");
    console.log(author_name.length + " - author_name length");

    console.log(genre + " - genre");
    console.log(typeof genre + " - genre typeof");
    console.log(genre.length + " - genre length");

    console.log(year_of_publishing + " - year_of_publishing");
    console.log(typeof year_of_publishing + " - year_of_publishing typeof");
    console.log(year_of_publishing.length + " - year_of_publishing length");

    console.log(about_book + " - about_book");
    console.log(typeof about_book + " - about_book typeof");
    console.log(about_book.length + " - about_book length");

    console.log(rate + " - rate");
    console.log(typeof rate + " - rate typeof");
    console.log(rate.length + " - rate length");

    if (!title || !author_name || !genre || !year_of_publishing || !about_book || !rate) {
      return response.status(400).json({ message: "All fields are required." });
    }


    const newUser = new User({

      title: title,
      author_name: author_name,  
      genre: genre,
      year_of_publishing: year_of_publishing,
      about_book: about_book,
      rate: rate
    })
    const savedUser = await newUser.save()

    response.status(201).json({ message: "Du försöker skapa en ny användare!", newUser: newUser, savedUser: savedUser })
  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error })
  }
})



server.put("/api/users/:id", async (request, response) => {
  try {
    const updateUser = await User.findByIdAndUpdate(request.params.id, request.body)

    response.json({ updatedUser: updateUser })

  } catch (error) {
    response.status(500).json({ message: "Some error occured", error: error })
  }
})


server.delete("/api/users/:id", async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id)

    response.json({ deletedUser: deletedUser })

  } catch (error) {
    response.status(500).json({ message: "Något gick fel", error: error })
  }
})

/*server.get('/api/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) ;
    const limit = parseInt(req.query.limit, 10) ;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: "Page and limit must be positive integers." });
    }

    const { name } = req.query;
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    const skip = (page - 1) * limit;
    const users = await users.find(query).skip(skip).limit(limit);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}); */




/* 
  Startar servern så att den lyssnar på den definierade porten.
  När servern har startat, loggas ett meddelande till konsolen.
*/
server.listen(port, () => console.log(`Listening on port http://localhost:${port}`)) 
