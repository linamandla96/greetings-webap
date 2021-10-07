module.exports = function(pool){

    const greet = require('./greetings-webapp')
    const greetApp = greet(pool)

    async function route1(req, res) {
        let greet = greetApp.greetpeople()
        let counti = await greetApp.counting()
    
        res.render('index', {
            greeting: greet,
            count: counti
        });
   }


   async function route2 (req, res) {


    const thename = req.body.names;
    const language = req.body.languages
    var myCount = await greetApp.counting(thename);


    var message = "";

    if (thename && language) {
        await greetApp.storeNames(thename)

        var message = await greetApp.greetpeople(language, thename);
        var myCount = await greetApp.counting(thename);
        var greetedUser = await greetApp.nameGreeted();


      

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

}


function route3(req, res) {
    var greetedUser = greetApp.nameGreeted();

    res.render('greetedname', {
        greetedUser,
    })
}

async function route4 (req, res) {
    res.render('greetedname', {
        actions: await greetApp.nameGreeted()
    });

}

async function route5(req, res) {
    var greetedUsers = req.params.names;

    var countUsers = await greetApp.counterPeople(greetedUsers)
    console.log(countUsers)
    res.render('greeted', { name: greetedUsers, counter: countUsers });


}

async function route6(req, res) {
    await greetApp.resetBtn()

    res.redirect('/')
}

return{
    route1,
    route2,
    route3,
    route4,
    route5,
    route6

}


}