let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require("./greetings-webapp");

const flash = require('express-flash');
const session = require('express-session')

app.use(session({
    secret:"string save",
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
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeting_app';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });
const greetApp = greet(pool);



//   const query = pool.query('select * from namelist')
//   query.then(function(namelist){
//    console.log(namelist.rows)
//   });




app.get("/", async function (req, res) {
    //console.log(req.params.id);
    res.render('index', {
        greeting: greetApp.greetpeople(),
        count: await greetApp.counterPeople(),
    });
});

app.post('/greeting', async function (req, res) {
    // console.log(req.body)
        var message = "";
        var count = "";
       const name = req.body.names;
       const language = req.body.languages

       if(name && language){
       greetApp.storeNames(name)
       message = greetApp.greetpeople(language,name);
       count = await greetApp.counterPeople();
       greetedUser =greetApp.nameGreeted();
     console.log({message})
     console.log({count})
     console.log({greetedUser});

       }
       else if(!name && language){
           req.flash('errors','Please enter your name!')
       }
       else if(name && !language){
          req.flash('errors','Please select a language!')
       }
       else if(!name && !language){
         req.flash('errors','Please enter your name and select a language!')
       }

    res.render('index',{
message,
count,


    })
    
});

app.post('/actions', function (req, res) {
greetedUser =greetApp.nameGreeted();
    res.redirect("/")
    res.render('actions',{
        greetedUser,
    })
});

app.get('/actions', function (req, res) {
   res.render('actions',{actions:greetApp.nameGreeted()});

});




app.get('/greeted/:names', function (req, res) {
    var greetedUsers = req.params.names;
    var getNames = greetApp.nameGreeted();
    var countUsers = getNames[greetedUsers]
    res.render('greeted',{name:greetedUsers,counterie:countUsers});


});





let PORT = process.env.PORT || 3013;

app.listen(PORT, function () {
    console.log('App started on port:', PORT);
});


