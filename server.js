const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})


// app.use ların sırası önemli.....

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;

    fs.appendFile('serverLog.log', log + "\n", (err) => {
        if(err)
        console.log(err);
    });
    
    console.log(log);

    next();
})


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express...</h1>');
    // res.send({
    //     name:"oguzhan",
    //     likes:"reading, running, talking, working, hiking, watching..."
    // })

    res.render('home.hbs', {
        pageTitle:'Home',
        message:'Welcome to our home page...'//, hbs.registerHelper metodu ile artık buna ihtiyaç yok...
        //currentYear: new Date().getFullYear()
    });

});

app.get('/about', (req, res) => {
    //res.send('<h1>About Page</h1>');

    res.render('about.hbs', {
        pageTitle:'About' //, hbs.registerHelper metodu ile artık buna ihtiyaç yok...
        //currentYear : new Date().getFullYear()
    });
})


app.get('/bad', (req, res) => {
    res.send({
        error:'you made a bad request body...'
    })
})

app.listen(3000, ()=>{
    console.log('The server is up and running...')
});