const expect = require("chai").expect;
const deadbolt = require("../src/deadbolt");

require("jsdom-global")();

describe("Deadbolt Framework initial Tests", () => {
    const element = document.createElement("form");
    const dblt = deadbolt(element);

    it("create a deadbolt a valid object", () => {
        expect(dblt).to.be.a("function");
    });
});

describe("isValid()", () => {
    const element = document.createElement("form");
    const dblt = deadbolt(element);

    it("should return true if no testing elements exist", () => {
        const output = dblt.isValid();

        expect(output).to.equal(true);
    });
});