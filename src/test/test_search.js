import {expect} from "chai"
import * as search from "../lib/search"

describe("the search module", function() {
  describe("the matcher function", function() {
    it("should return true when searching for quick AND fox in 'The quick brown fox'", function() {
      var matched = search.matcher({terms: "quick fox", type: "AND"})("The quick brown fox")
      expect(matched).to.be.ok
    })
    
    it("should return false when searching for blue AND fox in 'The quick brown fox'", function() {
      var matched = search.matcher({terms: "blue fox", type: "AND"})("The quick brown fox")
      expect(matched).to.not.be.ok
    })
    
    it("should return true when searching for blue OR fox in 'The quick brown fox'", function() {
      var matched = search.matcher({terms: "blue fox", type: "OR"})("The quick brown fox")
      expect(matched).to.be.ok
    })
    
    it("should return false when searching for blue OR dog in 'The quick brown fox'", function() {
      var matched = search.matcher({terms: "blue dog", type: "OR"})("The quick brown fox")
      expect(matched).to.not.be.ok
    })
  })
  
  describe("The file matcher", function() {
    it("should match rows 0,1,2,3,4,5,6 when searching hscic-news.txt for 'Care Quality Commission' with OR", function(done) {
      search.searchFile("test-data/hscic-news.txt", {terms: "Care Quality Commission", type: "OR"}, function(matches) {
        expect(matches).to.eql([0,1,2,3,4,5,6])
        done()
      })
    })
    
    it("should match row 9 when searching hscic-news.txt for 'September 2004' with OR", function(done) {
      search.searchFile("test-data/hscic-news.txt", {terms: "September 2004", type: "OR"}, function(matches) {
        expect(matches).to.eql([9])
        done()
      })
    })
    
    it("should match rows 6,8 when searching hscic-news.txt for 'general population generally' with OR", function(done) {
      search.searchFile("test-data/hscic-news.txt", {terms: "general population generally", type: "OR"}, function(matches) {
        expect(matches).to.eql([6,8])
        done()
      })
    })

    it("should match row 1 when searching hscic-news.txt for 'Care Quality Commission admission' with AND", function(done) {
      search.searchFile("test-data/hscic-news.txt", {terms: "Care Quality Commission admission", type: "AND"}, function(matches) {
        expect(matches).to.eql([1])
        done()
      })
    })
    
    it("should match row 6 when searching hscic-news.txt for 'general population Alzheimer' with AND", function(done) {
      search.searchFile("test-data/hscic-news.txt", {terms: "general population Alzheimer", type: "AND"}, function(matches) {
        expect(matches).to.eql([6])
        done()
      })
    })
  })
})


