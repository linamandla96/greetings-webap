let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require("./greetings-webapp");
const greetApp = greet();

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

app.get("/", function (req, res) {
    //console.log(req.params.id);
    res.render('index', {
        greeting: greetApp.greetpeople(),
        count: greetApp.counterPeople()
    });
});

app.post('/greeting', function (req, res) {
    // console.log(req.body)
        var message = "";
        var count = "";
       const name = req.body.names;
       const language = req.body.languages
       greetApp.storeNames(name)
       message = greetApp.greetpeople(language,name);
       count = greetApp.counterPeople();
     console.log({message});
     console.log({count})


    

    res.render('index',{
message,
count,


    })
});

app.post('/actions', function (req, res) {


});

app.get('/actions', function (req, res) {

});




app.get('/actions/:actionType', function (req, res) {

});





let PORT = process.env.PORT || 3017;

app.listen(PORT, function () {
    console.log('App started on port:', PORT);
});


