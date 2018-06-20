var assert = require('assert');
var whiterabbit = require("../index").default;
var sinon = require("sinon");

describe("check_past function", function(){
    var temp = new Date();
    var now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
    var clock;
    var past;
    var feature;
    before(function(done){
        clock = sinon.useFakeTimers(now);
        past = new Date(now.setHours(now.getHours() - 1));
        feature = new Date(now.setHours(now.getHours() + 2));
        done();
    });
    it("過去", function(){
        assert.equal(whiterabbit.check_past(past), true);
    });
    it("過去ではない", function(){
        assert.equal(whiterabbit.check_past(feature), false);
    });
    after(function(done){
        clock.restore();
        done();
    });
});

describe("concatenate_time_to_ttr", function(){
    var obj = {
        seconds: "3",
        minutes: "2",
        hours: "1"
    };
    it("hours, minutes, secondsを連結した文字列にする", function(){
        assert.equal(whiterabbit.concatenate_time_to_str(obj), "123")
    });
    it("hours, minutes, secondsを連結、パッドした文字列にする", function(){
        assert.equal(whiterabbit.concatenate_time_to_str(obj, whiterabbit.pad_zero), "010203")
    });
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
    var temp = new Date();
    var now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), 10,10);
    var fake_clock;
    var feature_today;
    var feature_tomorrow;
    before(function(done){
        fake_clock = sinon.useFakeTimers(now);

        feature_today= new Date(fake_clock.Date());
        feature_today.setHours(feature_today.getHours() + 1);

        feature_tomorrow = new Date(fake_clock.Date());
        feature_tomorrow.setHours(feature_tomorrow.getHours() - 1);
        feature_tomorrow.setDate(feature_tomorrow.getDate() + 1);

        done();
    });
    describe("timer", function(){
        it("4桁の文字をmilliに変換する", function(){
            assert.deepEqual(whiterabbit.convert_str_to_milli("1010"), 10 * 60000 + 10 * 1000);
        });
        it("6桁の文字をmilliに変換する", function(){
            assert.deepEqual(whiterabbit.convert_str_to_milli("101010"), 10 * 3600000 + 10 * 60000 + 10 * 1000);
        })
    });
    describe("alarm", function(){
        it("4桁の文字をアラームに変換する(今日)", function(){
            assert.deepEqual(whiterabbit.convert_str_to_milli(
                feature_today.getHours() + "" + feature_today.getMinutes(),
                true
            ), feature_today.getTime());
        });
        it("4桁の文字をアラームに変換する(明日)", function(){
            assert.equal(whiterabbit.convert_str_to_milli(
                feature_tomorrow.getHours() + "" + feature_tomorrow.getMinutes(),
                true
            ),feature_tomorrow.getTime());
        });
    });
    after(function(done){
        fake_clock.restore();
        done();
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
});

describe("display function", function() {
    it('2つの間にコロンを挿入する', function() {
        assert.equal(whiterabbit.display("0000"), "00:00");
        assert.equal(whiterabbit.display("000000"), "00:00:00");        
    });
});

describe("generate_date", function(){
    var temp = new Date();
    var now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), 10);
    var fake_time;
    var feature;
    before(function(done){
        fake_time = sinon.useFakeTimers(now);
        feature = new Date(fake_time.Date());
        feature.setHours(feature.getHours() + 1);
        done();
    });
    it("1時間後のdateを生成する", function(){
        assert.equal(
            whiterabbit.generate_date(3600000).getTime(), 
            feature.getTime()
        );
    });
    after(function(done){
        fake_time.restore();
        done();
    })
});

describe("normalize_name_follow_time", function(){
    it("配列のキーを正規化", function(){
        assert.deepEqual(whiterabbit.normalize_name_follow_time(["hou","h","minutes", "m"]), ["hours", "minutes"]);
    });
    it("オブジェクトのキーを正規化", function(){
        assert.deepEqual(whiterabbit.normalize_name_follow_time({hom: 0, h: 0, m: 1, minutes: 2}), {hours: 0, minutes: 1});
    });
});

describe("normalize_time_units function", function(){
    it("時間の単位を正規化した配列を返す", function(){
        assert.deepEqual(whiterabbit.normalize_time_units("seconds,m"), ["minutes","seconds"])
    });
    it("重複した時間の単位を正規化した配列を返す", function(){
        assert.deepEqual(whiterabbit.normalize_time_units("m","hours","seconds","minutes"), ["hours","minutes","seconds"])
    });
});

describe("pad_zero", function(){
    it("4桁ゼロで埋める", function(){
        assert.equal(whiterabbit.pad_zero("1", 4), "0001")
    });
});

describe("pad_zero_specific", function(){
    it("timer_orderに合わせてarrayを0で埋める", function(){
        assert.deepEqual(whiterabbit.pad_zero_specific(["11","22"],["minutes", "seconds"]), ["00","11","22","0000"]);      
    });
    it("timer_orderに合わせてobjectを0で埋める", function(){
        assert.deepEqual(whiterabbit.pad_zero_specific({hours:"11", seconds: "33"}), {hours: "11", minutes: "00", seconds: "33", millis: "0000"});
    });
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
