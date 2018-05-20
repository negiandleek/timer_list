import _ from "underscore";
(function (){
    const root = (typeof window == 'object' && window.self === self && window) ||
                (typeof global == 'object' && global.global === global && global) ||
                {};

    const previous = root.MY;

    let MY = function(){};

    if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports`
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = MY;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.MY = MY;
    }else{
        root.MY = MY;
    }

    MY.reg_hour_second = /^[0-9]{1,4}$/;
    MY.reg_time_split = /([0-9]{2})(?=[0-9]{2})/g;

    MY.Time = class Time{
        constructor(value, typeSize){
            this.time = value;
            this.len = value.length >>> 0;
            this.type_size = typeSize; //4,6
        }
        get_time_to_display(){
            return this.time.replace(MY.reg_time_split,(match)=> match + ":");
        }
        get_time_to_calc(){
            return this.time;
        }
        zero_padding(){
            let str = new Array(this.type_size + 1).join("0");
            this.time = (str + this.time).slice(-1 * this.type_size);
        }
    }

    MY.HourSecond = class HourSecond extends MY.Time{
        constructor(value){
            if(!_.isString(value)){
                throw new Error("[HourSecond] must be string type]");
            }
            if(value.length > 4){
                throw new Error("[HourSecond] must be length four");
            }
            if(!MY.reg_hour_second.test(value)){
                throw new Error("[HourSecond] must be string of number");                
            }
            super(value, 4)
            super.zero_padding();
        }
    }
})()
