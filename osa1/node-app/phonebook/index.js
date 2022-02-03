const express = require('express')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

morgan.token('body', function (req, res) 
{ 
    return JSON.stringify(req.body)
})


// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// setup the logger
app.use(morgan(':method :url :status :response-time :body', { stream: accessLogStream }))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info',(request, response) => {
  response.send(
  `<div> Phonebook has info for ${persons.length} people </div>

   <div> ${new Date()} </div>`)
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }


  persons = persons.concat(person)
  console.log(body)
  response.json(person)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})