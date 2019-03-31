const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

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
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    let infoMessage = 'Puhelinluettelossa on ' + persons.length + ' henkilön tiedot'
        + '<br/>' + Date(req.get('Date'))
    
    res.send(infoMessage)
  })
 
  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const p = persons.find(p => p.id === id)
    
    if (p) {
        res.json(p)
    } else {
        res.status(404).end()
    }

  })

  app.delete('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id);
      persons = persons.filter(p => p.id !== id);

      res.status(204).end();
  })

  const generateId = () => {
    const min = 1
    const max = 10000

    return Math.floor(Math.random() * (max - min) + min)
  }

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

    //check if name already exists in the persons list
    names = persons.map(p => p.name)

    for (let i = 0; i < names.length; i++) {
        if (names[i] === body.name)
            return res.status(409).json({
                error: 'name already exists'
        })
    }

    const p = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(p)

    res.json(p)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })