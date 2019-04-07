//Environment variables used only in local mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())


  //Getting all persons
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(p => p.toJSON()))
    });
  });

  //Getting site info
  app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
      const infoMessage = 'Puhelinluettelossa on ' + persons.length + ' henkilön tiedot'
        + '<br/>' + Date(req.get('Date'))   
    res.send(infoMessage)
    }) 
  })
 
  //Getting person with id
  app.get('/api/persons/:id', (req, res, next) => {  
    Person.findById(req.params.id)
    .then (p => {
      res.json(p.toJSON())
      if (p) {
          res.json(p.toJSON())
      } else {
          res.status(204).end()
      }
    })
    .catch(error => next(error))
  })

  //Removing person from list
  app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      .catch(error => next(error))
      })
  })

  //Adding new person to list
  app.post('/api/persons', (req, res) => {
    const body = req.body
    
    const p = new Person({
        name: body.name,
        number: body.number,
    })

    p.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return res.status(400).send({ error: 'id in wrong format'})
    } else if (error.name === 'ValidationError' && error.kind == 'unique') {
      return res.status(409).send({ error: 'The given name already exits in the list'})
    } else if (error.name === 'ValidationError') {
      return res.status(400).sen({error: error.message})
    }

    next(error)
  }

  app.use(errorHandler)