const express = require('express');
const path = require('path');
const port = 8080;

const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: "Arjun more",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

// load from mongoDb
app.get('/', async (req, res) => {
    const contacts = await Contact.find({});
    return res.render('home', {
        title: "Contact List",
        contact_list: contacts
    });
})

// create new mongoDb
app.post('/create-contact', function (req, res) {
    /// ad in db.
    Contact.create(req.body).
        then(newContact => {
            return res.redirect('back');
        }).catch(err => {
            console.log('error in creating ', err);
        })
});

// delete mongoDb
app.get('/delete-contact/:id', async (req, res) => {
    let id = req.params.id;
    await Contact.findByIdAndDelete(id)
    res.redirect('back')
});



app.listen(port, (err) => {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

