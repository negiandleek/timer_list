export default function echo(){
    for(let i = 0; i < arguments.length; i += 1){
        console.log(arguments[i])
    }
}
// temp
window.echo = echo;