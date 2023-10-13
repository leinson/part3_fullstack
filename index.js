require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

morgan.token("postContent", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postContent"
  )
);

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 6,
  },
  {
    name: "Arto Hellas",
    number: "0401020304",
    id: 9,
  },
];

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.number && !body.name) {
    return res.status(400).json({
      error: "name and number missing",
    });
  }
  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }
  if (persons.some((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "name already exists",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
    console.log("mongodb persons:", persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (!person) {
      return res.status(400).json({
        error: "no such id",
      });
    }
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  let person_amount = `Phonebook has info for ${persons.length} people`;
  res.send(person_amount + "<br><br>" + new Date());
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
