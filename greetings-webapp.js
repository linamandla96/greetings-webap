

module.exports = function greet(pool) {



    var nameList = {};
    var reg = /^[a-zA-Z]+$/

    async function storeNames(name) {
        // console.log(names)

        let names = name[0].toUpperCase() + name.slice(1).toLowerCase()
        try {


            let countname = await pool.query(`SELECT name from namelist WHERE name = $1`, [names]);
            if (countname.rowCount < 1) {

                await pool.query('insert into namelist (name, counterUsers) values($1, $2)', [names, 1])




            } else {

                await pool.query('UPDATE  namelist SET counterUsers = counterUsers + 1  WHERE name = $1', [names])

            }

        } catch (err) {
            console.log("error caught this", err)
            throw err;
        }
    }


    function greetpeople(language, name) {

        if (language == "English") {

            return "Hello , " + name[0].toUpperCase() + name.slice(1).toLowerCase() + "!";
        }

        else if (language == "Isixhosa") {

            return "Molo , " + name[0].toUpperCase() + name.slice(1).toLowerCase() + "!";
        }
        else if (language == "Sesotho") {

            return "Dumela , " + name[0].toUpperCase() + name.slice(1).toLowerCase() + "!";
        }

    }
    async function counting() {

        let counting = await pool.query('select * from namelist')
        const countingP = counting.rowCount;
        return countingP;
    }

    async function counterPeople(name) {
        try {
            var countList = await pool.query('select counterusers from namelist WHERE name = $1', [name])
            
            var countedlist = countList.rows[0];
            var countUserList = countedlist.counterusers;
            return countUserList;

        }
        catch (err) {
            console.log("error caught this", err)
            throw err;
        }
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

    async function nameGreeted() {

        var nameList = await pool.query('Select distinct name FROM namelist ')

        return nameList.rows;

    }
    async function resetBtn() {
        let reset = await pool.query('delete from namelist');
        return reset;
    }



    return {

        nameGreeted,
        greetpeople,
        storeNames,
        counterPeople,
        errorMesseges,
        errors,
        errorMes,
        counting,
        resetBtn

    }

}