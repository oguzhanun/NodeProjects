const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// -*-*-*-*-*-*-*-*-*-*-*     HEROKU DA DEPLOY İÇİN     *-*-*-*-*-*-*-*-*-*
// ÖNCELİKLE HEROKUNUN TOOLBELT İ DOWNLOAD EDİLİP YÜKLENMELİ...
// sonrasında ise terminalden 
// heroku --help
// bu komut ile ilk CLI yükleniyor
// sonrasında
// heroku login
// sonrasında
// heroku keys:add (ssh anahtarı varsa)
// heroku keys remove ile anahtar kaldırılıyor
// sonrasında
// ssh -v git@heroku.com (heroku nun serverları ile iletişim için)
// sonrasında
// uygulamada kullanılan port un heroku tarafından seçilmesini sağla
// sonrasında
// package.json da script kısmında "start":"node server.js" yazmalıyız.
// sonrasında
// heroku remote
// bu komut ile herokuda içinde bulunduğumuz dosya için bir remote açtık
// sonrasında
// git push heroku
// sonrasında
// heroku open 
// VE SONUNDA UYGULAMAMIZ DEPLOY EDİLMİŞ DURUMDA KARŞIMIZDADIR.


// local olarak 8000'de heroku çalıştırırken remote cihazın uygun portunda uygulamanın çalışabilmesi için gerekli...
const port = process.env.PORT || 8000;

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');


// sitede bakım yapılacaksa bu method içinde next() komutu çalıştırılmayarak bu husus sağlanabilir.
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })


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

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle:'Projects',
        message:'Welcome to our projects page...'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error:'you made a bad request body...'
    })
})

app.listen(port, ()=>{
    console.log('The server is up and running on port : ' + port);
});