//const { Pool } = require("pg");

module.exports = function greet(pool) {


    //localStorage.getItem(names);
    var nameList = {};
    var reg = /^[a-zA-Z]+$/

     async function storeNames(names) {

        try{
        var upperCaseName = names.substring(0, 1).toUpperCase() + names.slice(1).toLowerCase()
            if (reg.test(upperCaseName)) {
                
                if (nameList[upperCaseName] === undefined ) {
                    nameList[upperCaseName] = 1;
                    await pool.query('insert into namelist (name, counter) values($1, $2)', [upperCaseName,1])
                }
                else {
                    nameList[upperCaseName]++;
                }
            }
        } catch(err){
            console.log("error caught this", err)
            throw err;
        }
    }

    function greetpeople(language,name) {
    
        if (language == "English") {

            return "Hello , " + name[0].toUpperCase() + name.slice(1).toLowerCase() + "!" ;
        }

        else if (language == "Isixhosa") {

            return "Molo , " + name[0].toUpperCase() + name.slice(1).toLowerCase() + "!";
        }
        else if (language == "Sesotho") {

            return "Dumela , " + name[0].toUpperCase() + name.slice(1).toLowerCase() + "!";
        }

    }

    // function getGreet(){
    //     return greet;
    // }

    function counterPeople() {
        return Object.keys (nameList).length;
    }

    function errorMesseges(names) {
        if (names === "") {
            return " Please enter your name!"
        }
    }

    function errors(language) {
        if (language === "") {
            return "Please select language!"
        }
    }

    function errorMes(names, language) {
        if (names === "" && language === "") {
            return "Please enter name and select language!"
        }
    }

    function nameGreeted() {
        return nameList;
    }


    return {

        nameGreeted,
        greetpeople,
        storeNames,
        counterPeople,
        errorMesseges,
        errors,
        errorMes,

    }

}