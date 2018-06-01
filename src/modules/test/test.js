var assert = require('assert');
var whiterabbit = require("../index").default;
var fs = require('fs')

// hours, minutes, second, (millis is not support)

describe("concatenateTimeToStr", function(){
    it("hours, minutes, secondsを連結した文字列にする", function(){
        var obj = {
            seconds: "3",
            minutes: "2",
            hours: "1"
        };
        assert.equal(whiterabbit.concatenate_time_to_str(obj), "123")
    })
})

describe("display function", function() {
    it('2つの間にコロンを挿入する', function() {
        assert.equal(whiterabbit.display("0000"), "00:00");
        assert.equal(whiterabbit.display("000000"), "00:00:00");        
    });
});

describe("undisplay function", function() {
    it('2つの間にコロンを抜去する', function() {
        assert.equal(whiterabbit.undisplay("00:00"), "0000");
        assert.equal(whiterabbit.undisplay("00:00:00"), "000000");        
    });
});

describe("isTimeOfString function", function() {
    it("指定した型以外はエラー表示", function() {
        assert.equal(whiterabbit.is_time_of_string("0000"), true);
        assert.equal(whiterabbit.is_time_of_string("000000"), true);
    });
});
