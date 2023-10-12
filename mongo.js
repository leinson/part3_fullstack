const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

console.log("argv:", process.argv);
const password = process.argv[2];

const url = `mongodb+srv://leinson:{password}@cluster0.6hesnuk.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const generateId = (max) => {
    return Math.floor(Math.random() * max);
  };

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: generateId(99999999999),
  });

  person.save().then((result) => {
    console.log("added", process.argv[3], process.argv[4], "to the phonebook");
    mongoose.connection.close();
  });
}
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
