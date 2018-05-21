import _ from "underscore";
(function (){
    const root = (typeof window == 'object' && window.self === self && window) ||
                (typeof global == 'object' && global.global === global && global) ||
                {};

    const previous = root.My;
    const TYPE = {
        "FOUR": 4,
        "SIX": 6,
        /*
        "TIMESTAMP": 16 //new Date(8640000000000000)
        */
    };

    let My = class My{
        constructor(str){
            let type = str.toUpperCase();
            if(!My.reg_type.test(type)){
                throw new Error(str + "not defined. type are [FOUR],[SIX]")
            }
            this.__type = type; //4,6;
        }
    }
    const p = My.prototype;

    if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports`
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = My;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.My = My;
    }else{
        root.My = My;
    }
    
    My.reg_type = /^(?:FOUR)|(?:SIX)$/;
    My.reg_hour_second = /^[0-9]{1,4}$/;
    My.reg_time_split = /([0-9]{2})(?=[0-9]{2})/g;
    My.reg_non_zero = /^(0+)([1-9]*)$/g;
    My.milli_hour = 100 * 60 * 60;
    My.milli_minute = 100 * 60;
    My.milli_second = 100;

    p.display = function(value){
        return value.replace(My.reg_time_split,(match)=> match + ":");
    }

    // TODO:set関数を利用してp.is_timeを書かなくて良いようにする？？？
    p.is_time = function(value){
        if(!_.isString(value)){
            return ("[HourSecond] must be string type]");
        }
        if(value.length > TYPE[this.__type]){
            throw new Error("[HourSecond] length must be four");
        }
        if(!My.reg_hour_second.test(value)){
            throw new Error("[HourSecond] must be string of number");                
        }
        return true;
    }
    
    // milli convert time(hours, minutes, seconds)
    p.conversion_milli_to_time = function(value){
        // check type
        this.is_time(value);

        let result = value;
        let hours = 0;
        let minutes = 0
        let seconds = 0;

        hours = Math.floor(result / My.milli_hour);
        result = result - (hours * My.milli_hour);

        minutes = Math.floor(result / My.milli_minute);
        result = result - (minutes * My.milli_minute);

        seconds = Math.floor(result / My.milli_second);
        result = result - (seconds * My.milli_second);

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    // time convert milli based on type
    p.conversion_time = function(value){
        // check type
        this.is_time(value);
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
    
        if(TYPE[this.__type] >= 6){
            hours = Number(value.slice(0,2)) * My.milli_hour;
            value = value.slice(2,);
        }

        if(TYPE[this.__type] >= 4){
            minutes = Number(value.slice(0,2)) * My.milli_minute;
            seconds = Number(value.slice(2,4)) * My.milli_second;
        }

        return p.conversion_milli_to_time(hours + minutes + seconds);
    }

    p.zero_padding = function(value, range = 2){
        if(_.isObject(value)){
            for(let key in value){
                let m = String(value[key])
                let str = new Array(range + 1).join("0");
                value[key] = (str + m).slice(-1 * range);
            }
            return value;
        }else{
            // check type
            // this.is_time(value);
            return (this.zero_padding({temp: value}, range)).temp;
        }
    }

    p.zero_unpadding = function(value){
        // check type
        this.is_time(value);

        let r = value.replace(My.reg_zero, (match, $1, $2)=>{
            return typeof $2 === "undefined"? 0: $2;
        });
        
        return r;
    }

    p.increment = function(value){
        // check type
        this.is_time(value);

        let n = Number(this.zero_unpadding(value)) + 1;
        let m = this.zero_padding(n, 4);
        let l = this.conversion_time(m, 2);
        let r = this.zero_padding(l);
        let time = r.hours + r.minutes + r.seconds;
        return time.slice(-1 * TYPE[this.__type]);
    }

    p.decrement = function(value){
        // check type
        this.is_time(value);

        let r = Number(this.zero_unpadding(value)) - 1;
        
        return this.zero_padding(r);
    }
})()