const expect = require("chai").expect;
const deadbolt = require("../src/deadbolt");

require("jsdom-global")();

describe("Deadbolt Framework initial Tests", function() {
    const element = document.createElement("form");
    const dblt = deadbolt(element);

    it("create a deadbolt a valid object", function() {
        expect(dblt).to.be.a("function");
    });
});

describe("isValid()", function() {
    const element = document.createElement("form");
    const dblt = deadbolt(element);

    it("should return true if no testing elements exist", function() {
        const output = dblt.isValid();

        expect(output).to.equal(true);
    });
});