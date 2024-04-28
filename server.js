
import express from "express"
import mongoose from "mongoose"


const server = express()


const port = 3000

server.use(express.json())


mongoose.connect("mongodb+srv://kirapopko:8Q6nR0qCAutHz1m5@cluster0.2drcl5t.mongodb.net/IU2")

const usersSchema = new mongoose.Schema({
  username: String, 
  title: String,
  author_name: String,  
  genre: String,
  year_of_publishing: String,
  about_book: String,
  rate: String
});


const User = mongoose.model('users', usersSchema);


server.get('/api/users/filter', async (request, response) => {
  try {
    let { page, limit } = request.query;
    console.log(request.query);

    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.countDocuments(); 

    return response.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Något gick fel", error: error });
    
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

    const count = await User.countDocuments(); 

    return response.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Något gick fel", error: error });
    
  }
});

server.get('/api/users', async (req, res) => {
  res.json(await User.find());  
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

    response.status(201).json({ message: "You created new user!", newUser: newUser, savedUser: savedUser })
  } catch (error) {
    response.status(500).json({ message: "Some error occured!", error: error })
  }
})



server.put("/api/users/:id", async (request, response) => {
  try {
    const updateUser = await User.findByIdAndUpdate(request.params.id, request.body)

    response.json({ message: "You updated a user!", updatedUser: updateUser })

  } catch (error) {
    response.status(500).json({ message: "Some error occured!", error: error })
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


server.listen(port, () => console.log(`Listening on port http://localhost:${port}`)) 
