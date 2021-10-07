let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require("./route");

const flash = require('express-flash');
const session = require('express-session')

app.use(session({
    secret: "string save",
    resave: false,
    saveUninitialized: true
}))

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.use(express.static('public'));

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())


const pg = require("pg");
const Pool = pg.Pool;


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}


const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeting_app',
    ssl: {
        useSSL,
        rejectUnauthorized: false
    }
});
const greetApp = greet(pool);






app.get('/', greetApp.route1);

app.post('/greeting', greetApp.route2)

app.post('/greetedlist', greetApp.route3)

app.get('/greetedname', greetApp.route4)

app.get('/greeted/:names', greetApp.route5)

app.post('/reset', greetApp.route6)


let PORT = process.env.PORT || 3013;

app.listen(PORT, function () {
    console.log('App started on port:', PORT);
});


