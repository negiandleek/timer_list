(function (){
    const root = (typeof window == 'object' && window.self === self && window) ||
                (typeof global == 'object' && global.global === global && global);

    const previous = root.MY;
})()
