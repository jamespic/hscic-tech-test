var expect = require("chai").expect
var search = require("../lib/search")


describe("the matcher function", function() {
  it("should return true when searching for quick AND fox in 'The quick brown fox'", function() {
    var matched = search.matcher({terms: ["quick", "fox"], type: "AND"})("The quick brown fox")
    expect(matched).to.be.ok
  })
  
  it("should return false when searching for blue AND fox in 'The quick brown fox'", function() {
    var matched = search.matcher({terms: ["blue", "fox"], type: "AND"})("The quick brown fox")
    expect(matched).to.not.be.ok
  })
  
  it("should return true when searching for blue OR fox in 'The quick brown fox'", function() {
    var matched = search.matcher({terms: ["blue", "fox"], type: "OR"})("The quick brown fox")
    expect(matched).to.be.ok
  })
  
  it("should return false when searching for blue OR dog in 'The quick brown fox'", function() {
    var matched = search.matcher({terms: ["blue", "dog"], type: "OR"})("The quick brown fox")
    expect(matched).to.not.be.ok
  })
})
