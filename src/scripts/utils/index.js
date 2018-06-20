import ticktack from "../modules"
import _ from "underscore";

export function get_count(date, isAlarm){
    let time = get_remaining_time(date, isAlarm);
    let time_of_string = get_time_of_string(time, isAlarm);
    if(time_of_string.length === 6 && time_of_string.slice(0,2) === "00"){
        time_of_string = time_of_string.slice(2);
    }
    return time_of_string;
}

export function get_time_of_string(time, isAlarm){
    let concatenated = ticktack.concatenate_time_to_str(time);
    return ticktack.slice_time_of_string(concatenated, 4 + (isAlarm? 2: 0), isAlarm);
};

export function get_remaining_time(date, isAlarm){
    let time = ticktack.convert_milli_to_time(date);
    return ticktack.pad_zero(time, 2);
};

export function get_diff_date_and_now(target){
    return target.getTime() - new Date().getTime();
};

export let chime = (function(){
    let urls = ["./chime.mp3", "./chime.ogg", "./chime.wav"];
    let mimes = ["audio/mp3", "audio/ogg", "audio/wav"];
    let audios = _.map(urls, (url)=> new Audio(url));
    let ready = _.filter(audios, (audio, index) => {
        return "" !== audio.canPlayType(mimes[index])
    });
    let audio = "";
    
    if(ready.length !== 0){
        audio = ready[0];
        audio.status = 0;
        audio.addEventListener("loadeddata", ()=>{
            audio.status = 1;
        });
    }

    let play = function (audio){
        return function count_play_audio(count = 1, volume = 0.5){
            if(!audio)return;

            if(audio.status === 0){
                audio.addEventListener("loadeddata", ()=>{
                    audio.status = 1
                    count_play_audio(count, volume);
                });
                return void 0;
            }

            let iterations = count - 1;
            audio.volume = volume;
            audio.status = 2;
            audio.play();
            audio.addEventListener("ended", function(){
                if(iterations > 0){
                    iterations -= 1;
                    this.play();
                }else{
                    audio.status = 3;
                }
            });
        }
    }
    
    let stop = function(audio){
        return function(){
            if(!audio)return;
            if(audio.status === 2){
                audio.pause()
                audio.currentTime = 0;
                audio.status = 3;
            }
        }
    }
    
    return {
        audio: audio,
        play: play(audio),
        stop: stop(audio),
    };
})();

export let notice = (function(){
    if(window.Notification && Notification.permission !== "granted"){
        Notification.requestPermission(function (status) {
            if(Notification.permission !== status){
                Notification.permission = status;
            }
        }); 
    }
    return function notice(text=""){
        if(window.Notification && Notification.permission === "granted"){
            var notification = new Notification("finish", {body: text});
            notification.addEventListener("close", ()=>{chime.stop()})
        }else if(window.Notification && Notification.permission !== "denied"){
            Notification.requestPermission(function (status) {
                if(Notification.permission !== status) {
                    Notification.permission = status;
                }
                if (status === "granted") {
                    notice(text);
                }
            });
        }else{
            alert("finish:" + text);
        }
    }
})();