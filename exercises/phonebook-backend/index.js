const { request, response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let phoneBooks = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
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
    id: 4,
  },
];

app.get("/api/persons", (request, response) => {
  response.json(phoneBooks);
});

app.get("/api/persons/:id", (request, response) => {
  //Where ':id' is the params value
  const id = Number(request.params.id);
  const phoneBookID = phoneBooks.find((phoneBook) => id === phoneBook.id);
  console.log(phoneBookID);
  if (phoneBookID !== null) {
    console.log("On True Block");
    response.json(phoneBookID);
  } else {
    response.status(404).end();
  }
});

app.get("/api/info", (request, response) => {
  let currentTime = new Date();
  response.send(`Phonebook has info for ${phoneBooks.length}\n${currentTime}`);
});

app.delete("/api/persons/:id", (request, response) => {
  //Where ':id' is the params value
  const id = Number(request.params.id);
  //Check if Id exist
  phoneBooks = phoneBooks.filter((phoneBook) => phoneBook.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
