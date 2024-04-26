import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import User from "./Users.js";

console.log("Start seeding databse!")

async function seedDB() {
  try {
    mongoose.connect("mongodb+srv://kirapopko:8Q6nR0qCAutHz1m5@cluster0.2drcl5t.mongodb.net/IU2")
    const usersList = await createUsers(30)
    console.log("UsersList - ", usersList)
  } catch (error) {
    console.log(`Errormessage: ${error}`)
  }
}

async function createUsers(amount) {
  const usersList = []
  for (let i = 0; i < amount; i++) {
    const newUser = new User({
      title: faker.word.words({ count: { min: 1, max: 4 } }),
      author_name: faker.person.fullName(),
      genre: faker.string.fromCharacters(['comedy', 'drama', 'love_story', 'detectiv']),
      year_of_publishing: faker.date.anytime(),
      about_book: faker.lorem.sentences({ min: 1, max: 3 }),
      rate: faker.string.fromCharacters(['1', '2', '3', '4', '5'])
      
    })
    await newUser.save()
    usersList.push(newUser)
    // console.log(`New user - ${newUser.username} - has been created.`)
  }
  // console.log(`${amount} users has been seeded.`)
  return usersList
}

seedDB()