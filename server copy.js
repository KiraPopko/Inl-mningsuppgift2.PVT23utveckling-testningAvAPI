import express from "express";
import mongoose from "mongoose";

const server = express();
const port = 3000;

server.use(express.json());

mongoose.connect("mongodb+srv://kirapopko:8Q6nR0qCAutHz1m5@cluster0.2drcl5t.mongodb.net/IU2");

const usersSchema = new mongoose.Schema({
    username: String,
    title: String,
    author_name: String,
    genre: String,
    year_of_publishing: Date,
    about_book: String,
    rate: Number
});

const User = mongoose.model('users', usersSchema);

// Route handler for GET /api/users

  server.get('/api/users', async (req, res) => {
    res.json(await User.find());  // Använder Mongoose's "find"-metod för att hämta alla "users".
  });



server.get('/api/users/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
   
})




server.listen(port, () => console.log(`Listening on port http://localhost:${port}`));