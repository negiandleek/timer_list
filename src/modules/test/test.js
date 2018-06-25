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

describe("concatenate_time_to_clock", function(){
    var obj = {
        seconds: "3",
        hours: "1",
        minutes: "2",
        millis: "4"
    };
    it("hours, minutes, secondsを連結した文字列にする", function(){
        assert.equal(whiterabbit.concatenate_time_to_clock(obj), "1234")
    });
    it("hours, minutes, secondsを連結、パッドした文字列にする", function(){
        assert.equal(whiterabbit.concatenate_time_to_clock(obj, whiterabbit.pad_zero), "0102030004")
    });
});

describe("convertMilliToTime", function(){
    it("hours, minutes, secondsのオブジェクトが返ってくる", function(){
        var obj = {
            hours: 3,
            minutes: 28,
            seconds: 23,
            millis: 0
        };
        assert.deepEqual(whiterabbit.convert_milli_to_time("12503000"), obj);
    });
});

describe("convert_str_to_time", function(){
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
            assert.deepEqual(whiterabbit.convert_str_to_milli("1010", false, 1), 10 * 60000 + 10 * 1000);
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

describe("exists_units function", function() {
    it('存在するunitsのindexを配列で返す', function() {
        assert.deepEqual(whiterabbit.exist_units({hours: 0, seconds: 0}), [0,2]);
        assert.deepEqual(whiterabbit.exist_units(["hours", "seconds"]), [0,2]);
    });
});

describe("flat_units function", function() {
    it('単位の引数を配列に変換する', function() {
        assert.deepEqual(whiterabbit.flat_units(["hours"],"minutes","seconds",["millis"]), ["hours","minutes","seconds","millis"]);
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
    it("1時間後のdate millisを生成する", function(){
        assert.equal(
            whiterabbit.generate_date_millis(3600000), 
            feature.getTime()
        );
    });
    after(function(done){
        fake_time.restore();
        done();
    })
});

describe("normalize_name_follow_time", function(){
    it("オブジェクトのキーを正規化", function(){
        assert.deepEqual(whiterabbit.normalize_name_follow_time({hom: 0, h: 0, m: 1, minutes: 2}), {hours: 0, minutes: 1});
    });
});

describe("normalize_time_units function", function(){
    it("時間の単位を正規化した文字列を返す", function(){
        assert.deepEqual(whiterabbit.normalize_units("ms"), "millis");
        assert.deepEqual(whiterabbit.normalize_units("s"), "seconds");
        assert.deepEqual(whiterabbit.normalize_units("m"), "minutes");
        assert.deepEqual(whiterabbit.normalize_units("h"), "hours");
    });
});

describe("pad_unit", function(){
    it("足りない単位を埋める", function(){
        assert.deepEqual(whiterabbit.pad_units({hours:0, seconds: 0}, [0,2]), {hours: 0, minutes: 0, seconds: 0, millis: 0})
        // assert.deepEqual(whiterabbit.pad_units(["hours", "seconds"], [0,2]), ["hours", "minutes", "seconds", "millis"]);
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
        assert.deepEqual(whiterabbit.put_time_base_ten("009999", 1000, 0, 2), {hours: 1, minutes: 0, seconds: 0, millis: 0});
    });
    it("基数が10の引き算", function(){
        assert.deepEqual(whiterabbit.put_time_base_ten("990000", -1000, 0, 2), {hours: 98, minutes: 59, seconds: 59, millis: 0});
    });
});

describe("put_time_base_time", function(){
    it("基数がtimeの足し算", function(){
        assert.equal(whiterabbit.put_time_base_time("005959",1000,0,2), "010000");
    });
    it("基数がtimeの足し算(切り捨て)", function(){
        assert.equal(whiterabbit.put_time_base_time("5900", "3720000",1,2), "0100");
    });
    it("基数がtimeの引き算", function(){
        assert.equal(whiterabbit.put_time_base_time("010000", "-1000",0,2), "005959");
    });
    it("基数がtimeの引き算(切り捨て)", function(){
        assert.equal(whiterabbit.put_time_base_time("6000", "-60000",1,2), "5900");
    });
});

describe("shit_time_to_input", function(){
    it("左にずれる", function(){
        assert.equal(whiterabbit.shift_time_to_input("1111","11112"), "1112");
    });
    it("右にずれる", function(){
        assert.equal(whiterabbit.shift_time_to_input("1111", "111"), "0111");
    });
});

describe("slice_clock", function(){
    it("必要な単位を取得する", function(){
        assert.equal(whiterabbit.slice_clock("1122334444",1,3), "22334444")
    })
});

describe("undisplay function", function() {
    it('6桁の文字列のコロンを抜去する', function() {
    assert.equal(whiterabbit.undisplay("00:00:00"), "000000");
    }); 
});

// describe("isTimeOfString function", function() {
//     it("指定した型以外はエラー表示", function() {
//         assert.equal(whiterabbit.is_time_of_string("0000"), true);
//         assert.equal(whiterabbit.is_time_of_string("000000"), true);
//     });
// });
