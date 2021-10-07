const assert = require('assert');
const greet = require('../greetings-webapp');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeting_app',

});

describe('Greet people using database ', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from namelist;");

    });
    let greetingsApp = greet(pool);
    it('should be able to insert and get names that have been greeted', async function () {



        await greetingsApp.storeNames('Lina');
        assert.deepEqual([{ name: 'Lina' }], await greetingsApp.nameGreeted());

    });
    it('should be able to greet lina in IsiXhosa', async function () {



        assert.equal(await greetingsApp.greetpeople('Isixhosa', 'Lina'), 'Molo , Lina!');

    });

    it('should not count a person that have been greeted  more than once', async function () {


        greetingsApp.storeNames('Lina')
        greetingsApp.storeNames('Lina')


        assert.equal(1, await greetingsApp.counting());

    });
    it('should be able to count people that have greeted ', async function () {


        await greetingsApp.storeNames('Lina');
        await greetingsApp.storeNames('Amanda');




        assert.equal(2, await greetingsApp.counting());

    });

    it('should be able to detele greeted names and counter', async function () {


        await greetingsApp.resetBtn()


        assert.equal('', await greetingsApp.nameGreeted());

    });


    after(function () {
        pool.end();
    })
});