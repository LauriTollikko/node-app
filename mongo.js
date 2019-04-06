const mongoose = require('mongoose')

if (!(process.argv.length === 3 || process.argv.length === 5)) {
    console.log('invalid number of command-line parameters given')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://fullstackapp:${password}@cluster0-j4emp.mongodb.net/node-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 3) { //print the list of persons
    console.log('puhelinluettelo:')
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length === 5) { //add new person 
    const p = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

    p.save().then(result => {
        console.log(`lisätään ${p.name} numero ${p.number} luetteloon`);
        mongoose.connection.close();
      })
}