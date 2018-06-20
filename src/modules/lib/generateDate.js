export default function generate_date(ms){
    return new Date(new Date().getTime() + ms);
}