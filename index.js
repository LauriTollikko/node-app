require('dotenv').config()
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

/* Initial test data
let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      }
]
*/
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(p => p.toJSON()))
    });
  });

  app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
      const infoMessage = 'Puhelinluettelossa on ' + persons.length + ' henkilön tiedot'
        + '<br/>' + Date(req.get('Date'))   
    res.send(infoMessage)
    }) 
  })
 
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

  app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      .catch(error => next(error))
      })
  })

  //function for generating random ids -- not in use anymore
  /*
  const generateId = () => {
    const min = 1
    const max = 10000

    return Math.floor(Math.random() * (max - min) + min)
  }
  */

  app.post('/api/persons', (req, res) => {
    const body = req.body
    
    //body input validation
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    /* TODO
    //check if name already exists in the persons list
    names = persons.map(p => p.name)

    for (let i = 0; i < names.length; i++) {
        if (names[i] === body.name)
            return res.status(409).json({
                error: 'name already exists'
        })
    }
    */
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
    }

    next(error)
  }

  app.use(errorHandler)