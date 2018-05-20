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

    MY.Time = class Time{
        constructor(){
            this.len; //4,6
            this.num;
        }
    }
})()
