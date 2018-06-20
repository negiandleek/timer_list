export default function generate_date(mills){
    return new Date(new Date().getTime() + mills);
}