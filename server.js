const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}, ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         page_title: 'Website is in maintenance'
//     })
// });

app.use(express.static(__dirname + '/Public'));

hbs.registerHelper('get_current_year', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream_it', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        page_title: 'Home page',
        welcome_message: 'Welcome to my website',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        page_title: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to make request'
    })
});

app.listen(PORT, () => {
    console.log(`Express server started, listening on port ${PORT}`)
});