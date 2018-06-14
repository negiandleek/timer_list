import ticktack from "../modules"
import _ from "underscore";

export function get_count(date, isAlarm){
    let time = get_remaining_time(date, isAlarm);
    let time_of_string = get_time_of_string(time, isAlarm);
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
    let ready = _.filter(audios, (audio, index) => "probably" === audio.canPlayType(mimes[index]))

    //todo: refactoring;
    let play = function (audio){
        audio.state = 0;
        if(!audio){
            return ()=>alert("finish!!");
        }
        audio.addEventListener("loadeddata", ()=>{
            audio.state = 1;
        });

        return function count_play_audio(count = 1, volume = 0.25){
            if(audio.state === 0){
                audio.addEventListener("loadeddata", ()=>{
                    audio.state = 1
                    count_play_audio(count, volume);
                });
                return void 0;
            }
            let iterations = count - 1;
            audio.volume = volume;
            audio.play();
            audio.addEventListener("ended", function(){
                if(iterations > 0){
                    iterations -= 1;
                    this.play();
                }else{
                    audio.state = 3;
                }
            });
        }
    }
    
    return {
        audio: ready[0],
        play: play(ready[0]),
        stop: ()=>{
            ready[0].pause()
            ready[0].currentTime = 0;
        },
    };
})();