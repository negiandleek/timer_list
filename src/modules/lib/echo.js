export default function echo(){
    for(let i = 0; i < arguments.length; i += 1){
        console.log(arguments[i])
    }
}
// temp
const root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this;
root.echo = echo;