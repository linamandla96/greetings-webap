let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require("./greetings-webapp");

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






app.get('/', async function (req, res) {
    let greet = greetApp.greetpeople()
    let counti = await greetApp.counting()

    res.render('index', {
        greeting: greet,
        count: counti
    });
});

app.post('/greeting', async function (req, res) {


    const thename = req.body.names;
    const language = req.body.languages
    var myCount = await greetApp.counting(thename);


    var message = "";

    if (thename && language) {
        await greetApp.storeNames(thename)

        var message = await greetApp.greetpeople(language, thename);
        var myCount = await greetApp.counting(thename);
        var greetedUser = await greetApp.nameGreeted();


        console.log({ message })
        console.log({ myCount })
        console.log({ greetedUser });

    }
    else if (!thename && language) {
        req.flash('errors', 'Please enter your name!')
    }
    else if (thename && !language) {
        req.flash('errors', 'Please select a language!')
    }
    else if (!thename && !language) {
        req.flash('errors', 'Please enter your name and select a language!')
    }

    res.render('index', {
        message,
        count: myCount
    })

});

app.post('/actions', function (req, res) {
    var greetedUser = greetApp.nameGreeted();

    res.render('actions', {
        greetedUser,
    })
});

app.get('/actions', async function (req, res) {
    res.render('actions', {
        actions: await greetApp.nameGreeted()
    });

});




app.get('/greeted/:names', async function (req, res) {
    var greetedUsers = req.params.names;

    var countUsers = await greetApp.counterPeople(greetedUsers)
    console.log(countUsers)
    res.render('greeted', { name: greetedUsers, counter: countUsers });


});


app.post('/reset', async function (req, res) {
    await greetApp.resetBtn()

    res.redirect('/')
});


let PORT = process.env.PORT || 3013;

app.listen(PORT, function () {
    console.log('App started on port:', PORT);
});


