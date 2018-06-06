var assert = require('assert');
var whiterabbit = require("../index").default;
var fs = require('fs')
var sinon = require("sinon");
// hours, minutes, second, (millis is not support)

describe("concatenateTimeToStr", function(){
    it("hours, minutes, secondsを連結した文字列にする", function(){
        var obj = {
            seconds: "3",
            minutes: "2",
            hours: "1"
        };
        assert.equal(whiterabbit.concatenate_time_to_str(obj), "123")
        assert.equal(whiterabbit.concatenate_time_to_str(obj, whiterabbit.pad_zero), "010203")        
    })
});

describe("convertMilliToTime", function(){
    it("hours, minutes, secondsのオブジェクトが返ってくる", function(){
        var obj = {
            hours: 3,
            minutes: 28,
            seconds: 23
        };
        assert.deepEqual(whiterabbit.convert_milli_to_time("12503000"), obj);
    });
});

describe("convertStrToTime", function(){
    it("strをmilliに変換する", function(){
        assert.deepEqual(whiterabbit.convert_str_to_milli("1010"), 10 * 60000 + 10 * 1000);
        assert.deepEqual(whiterabbit.convert_str_to_milli("101010"), 10 * 3600000 + 10 * 60000 + 10 * 1000);        
    });
});

describe("convertTimeToMilli", function(){
    it("{hours, minutes, seconds}をmilliに変換", function(){
        var obj = {
            hours: 3,
            minutes: 28,
            seconds: 23
        };
        assert.equal(whiterabbit.convert_time_to_milli(obj), "12503000");
    });
})

describe("display function", function() {
    it('2つの間にコロンを挿入する', function() {
        assert.equal(whiterabbit.display("0000"), "00:00");
        assert.equal(whiterabbit.display("000000"), "00:00:00");        
    });
});

describe("generate_in_date_time", function(){
    var temp = new Date();
    var now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), 10);
    var feature;
    var clock;
    before(function(done){
        clock = sinon.useFakeTimers(now);
        feature = new Date(clock.Date());
        feature.setDate(feature.getDate() + 1);
        feature.setHours(feature.getHours() - 1);
        done();
    });
    it("何時間後のdateを生成する", function(){
        assert.equal(
            whiterabbit.generate_in_date_time("1000", false).getTime(), 
            new Date(now.setMinutes(now.getMinutes() + 10)).getTime()
        );
        assert.equal(
            whiterabbit.generate_in_date_time(
                ("0" + feature.getHours()).slice(-2) + ("0" + feature.getMinutes()).slice(-2),
                true
            ).getTime(),
            feature.getTime()
        );
    });
    after(function(done){
        clock.restore();
        done();
    });
});

describe("is_tomorrow", function(){
    var temp = new Date();
    var now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), 10);
    var date;
    var clock;
    before(function(done){
        clock = sinon.useFakeTimers(now);
        date = new Date(clock);
        done();
    });
    it("明日かどうか", function(){
        assert.equal(whiterabbit.is_tommorow("0900"), true);
        assert.equal(whiterabbit.is_tommorow("1100"), false);
    });
    after(function(done){
        clock.restore();
        done();
    });
});

describe("pad_zero", function(){
    it("stringをゼロで埋める", function(){
        assert.equal(whiterabbit.pad_zero("1"), "01");
        assert.equal(whiterabbit.pad_zero("1", 4), "0001")
        assert.equal(whiterabbit.pad_zero("11"), "11")
    });
    it("objectをゼロで埋める", function(){
        assert.deepEqual(whiterabbit.pad_zero(
                {hours: "1", minutes: "20"}
            ), {hours: "01", minutes: "20"}
        );
        assert.deepEqual(whiterabbit.pad_zero(
            {hours: "1", minutes: "20", seconds: "3000"},
            4
            ), {hours: "0001", minutes: "0020", seconds:"3000"}
        );
    });
});

describe("pad_zero_specific", function(){
    it("timer_orderに合わせてarrayを0で埋める", function(){
        assert.deepEqual(whiterabbit.pad_zero_specific(["11","22"],"m,seconds"), ["00","11","22", "0000"]);
        // assert.equal(whiterabbit.pad_zero_specific(["11","22"],"s","minutes"), ["00","11","22", "0000"]);        
    });
    // it("timer_orderに合わせてobjectを0で埋める", function(){
    //     assert.equal(whiterabbit.pad_zero_specific({h: "11", hoge: "22", seconds: "33"}), {hours: "11", minutes: "00", seconds: "33", minutes: "0000"});
    // });
})

describe("put_time_base_ten", function(){
    it("基数が10の足し算", function(){
        assert.equal(whiterabbit.put_time_base_ten("090999", "010101"), "101100");
    });
    it("基数が10の引き算", function(){
        assert.equal(whiterabbit.put_time_base_ten("990000", "-010101"), "975859");
    })
});

describe("put_time_base_time", function(){
    it("基数がtimeの足し算", function(){
        assert.equal(whiterabbit.put_time_base_time("005959"), "010000");
        assert.equal(whiterabbit.put_time_base_time("5900", "3720000"), "0100");
    });
    it("基数がtimeの引き算", function(){
        assert.equal(whiterabbit.put_time_base_time("010000", "-1000"), "005959");
        assert.equal(whiterabbit.put_time_base_time("6000", "-60000"), "5900");
    });
});

describe("shit_time_to_input", function(){
    it("左にずれる", function(){
        assert.equal(whiterabbit.shift_time_to_input("1111","11112"), "1112");
        assert.equal(whiterabbit.shift_time_to_input("1111", "111"), "0111");
    });
});

describe("slice_time_of_string", function(){
    it("アラームの取得", function(){
        assert.equal(whiterabbit.slice_time_of_string("112233",4,true), "1122")
        assert.equal(whiterabbit.slice_time_of_string("112233",4,false), "2233")
    })
});

describe("undisplay function", function() {
    it('2つの間にコロンを抜去する', function() {
        assert.equal(whiterabbit.undisplay("00:00"), "0000");
        assert.equal(whiterabbit.undisplay("00:00:00"), "000000");        
    });
});

// describe("isTimeOfString function", function() {
//     it("指定した型以外はエラー表示", function() {
//         assert.equal(whiterabbit.is_time_of_string("0000"), true);
//         assert.equal(whiterabbit.is_time_of_string("000000"), true);
//     });
// });
