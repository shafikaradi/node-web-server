const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();


hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');


app.use((req ,res ,next) => {
   
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log + '\n', (error) => {

        if(error){

            console.log('Unable to append to server');
            
        }


    });
    next();

});

app.use((req ,res ,next) => {

    res.render('maintenance.hbs');

});
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {

   return text.toUpperCase();

});

app.get('/',(resquest, response) => {

    response.render('index.hbs',{
       
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to our website, your website 😉'

    });

});

app.get('/about',(resquest, response) => {

    response.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/bad',(resquest, response) => {
    
        response.send({
            errorMessage :"Error, unable to load the requested page",
            errorCode:404
        });
    
});

app.listen(2013,() => {
    console.log('localhost:2013');
});