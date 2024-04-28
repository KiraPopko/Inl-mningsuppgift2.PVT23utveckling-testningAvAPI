import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({
  title: String,
  author_name: String,  
  genre: String,
  year_of_publishing: Date,
  about_book: String,
  rate: String
});


const User = mongoose.model('users', usersSchema);

export default User