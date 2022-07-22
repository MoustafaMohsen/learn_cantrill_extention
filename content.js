let t_hours = 0 // total hours
let t_minutes = 0
let t_seconds = 0
function setTimes(){
    jQuery(".section-list").each((i2,e_ul)=>{
		let min = 0
		let sec = 0
        const e = jQuery(e_ul)
        let str = e.find(".lecture-name").text()
        let regexp = /\((\d+)\:(\d+)\)/gm
        const array = [...str.matchAll(regexp)];

        for (let i = 0; i < array.length; i++) {
            const m = array[i];            
            if(m && m[1]){
                min = min + parseInt(m[1])
                sec = sec + parseInt(m[2])
            }
        }
        
        const {hours, minutes, seconds} = optmize_to_time(0, min, sec)
        const time = hours + ":" + minutes +":" + seconds

        t_hours = t_hours + hours
        t_minutes = t_minutes + minutes
        t_seconds = t_seconds + seconds
        if(minutes || seconds || hours) e.prev().append("(" + time + ")")

	})
    setTotalTime();

}

function optmize_to_time(hours, minutes, seconds) {
    minutes = minutes + Math.floor(seconds / 60)
    seconds = seconds % 60
    hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    return {hours, minutes, seconds}
}

function setTotalTime(){
    const {hours, minutes, seconds} = optmize_to_time(t_hours, t_minutes, t_seconds)
    const time = hours + ":" + minutes +":" + seconds
    $(".course-progress-percentage").append(", TOTAL (" + time + ")")
}

jQuery(()=>{setTimes()})