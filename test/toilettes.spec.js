const db = require('../db');
const fixture = require("./fixtures");
const toilettes = require("../db/data/seeds/toilettes");
const TOILETTES_TABLE = toilettes.TOILETTES_TABLE;

const assert = require("assert");

describe("toiletteDatabase", function () {
    let toilettesFixture;

    before(async () => {
        toilettesFixture = fixture.getToilet();
        await db("toilettes")
        .insert(toilettesFixture)
        .returning("id")
        .then((result)=> {
            console.log("inserted test toilette");
        })
        .catch(console.error);
    });

    after(async () => {
        await db("toilettes")
        .where("id",toilettesFixture.id)
        .returning("id")
        .del()
        .then((result) => {
            console.log("removed test toilette");
        })
        .catch(console.error);
    });

    describe("getAll", ()=> {
        it("should return add toilette", async () =>{
            const toilettes = await db("toilettes")
            .select("id","name","address","latitude","longitude")
            .where("id",toilettesFixture.id);
            assert.deepEqual(toilettes[0],toilettesFixture)
        })

        it("should return all toilettes count", async () =>{
            const toilettes = await db("toilettes")
            assert.deepEqual(toilettes.length,70)
        })
    })

  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  console.log(TOILETTES_TABLE);
});
