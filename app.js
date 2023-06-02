const express = require('express');
var XMLHttpRequest = require('xhr2');
const app = express();

// Add body parsing middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


app.set('view engine','ejs');

app.use('/weather',(req,res)=>{
    
    const xhtml = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=faisalabad&units=metric&appid=867c2f0510902cd42733fccd01cb3961`;
    xhtml.open('GET',url,true);
    xhtml.onreadystatechange  = ()=>{
        if(xhtml.readyState == 4 && xhtml.status === 200)
        {
            const data = JSON.parse(xhtml.responseText);
            res.render('index',{data});
        }
    }
    xhtml.send();
})

app.use('/search',(req,res)=>{
    const city = req.body.city;
    const xhtml = new XMLHttpRequest();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=92bf29af468b68a73c4d48354fe9f94d`;
    xhtml.open('GET', URL);
  
    xhtml.onload = () => {

            const data = JSON.parse(xhtml.responseText);
            if(data.cod == '404')
            {
                res.send(data.message);
            }
            else
            {
                res.render("index", { data });
            }
    }
    xhtml.send();
})

app.use('/*',(req,res)=>{
    res.send('<h1>Invalid Address</h1>')
})

const port = process.env.P || 8000;
app.listen(8000,(err)=>{
    if(err) throw err
    console.log(`Listen At Port ${port}`);
});