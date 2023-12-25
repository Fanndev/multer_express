const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');



const app = express();
const port = 3000;

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/admin', {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log('database Connected')
}).catch((err) => {
    console.log('Database not connected')
});

// method-override
app.use(methodOverride('_method'))

// middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000}
}));
app.use(flash());

// templating ejs 
app.use(expressLayout);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('uploads'))


// middleware routes
app.use('/', require('./routes/produk.route'))

app.listen(port, () => {
    console.log(`running on port ${port} Connected`)
})