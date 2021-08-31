module.exports = function greet() {

    // let names = "";
    //let language = "";
    //let message = "";
    //let message = "";
    //localStorage.getItem(names);
    var nameList = {};
    var reg = /^[a-zA-Z]+$/

    function storeNames(names) {
        var upperCaseName = names.substring(0, 1).toUpperCase() + names.slice(1).toLowerCase()
        if (reg.test(upperCaseName)) {
            
            if (nameList[upperCaseName] === undefined ) {
                nameList[upperCaseName] = 1;
            }
            else {
                nameList[upperCaseName]++;
            }
        }
    }

    function greetpeople(language,name) {
        // var upperCaseName = names.substring(0, 1).toUpperCase() + names.slice(1).toLowerCase();
        // if (reg.test(upperCaseName)) {
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

    function getGreet(){
        return greet;
    }

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