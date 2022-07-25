let total = {
    hours: 0,
    minutes: 0,
    seconds: 0
}
let completed = {
    hours: 0,
    minutes: 0,
    seconds: 0
}
let remaining = {
    hours: 0,
    minutes: 0,
    seconds: 0
}

function trackFactory(tracking_obj ) {
    return (minutes, seconds, hours, e) => {
        let current = { hours, minutes, seconds }
        optmize_obj_time(current)
        tracking_obj.hours = tracking_obj.hours + current.hours
        tracking_obj.minutes = tracking_obj.minutes + current.minutes
        tracking_obj.seconds = tracking_obj.seconds + current.seconds
        if (current.minutes || current.seconds || current.hours) e.prev().append("(" + current.hours + ":" + current.minutes + ":" + current.seconds + ")")
    }
}

function init() {
    // calculate completed and append to course header
    setTimes(trackFactory(completed), ".section-list", ".completed .lecture-name")
    optmize_obj_time(completed)
    $(".course-progress-percentage").append(", COMPLETED (" + completed.hours + ":" + completed.minutes + ")")

    // calculate remaining and append to course header
    setTimes(trackFactory(remaining) , ".section-list", ".incomplete .lecture-name")
    optmize_obj_time(remaining)
    $(".course-progress-percentage").append(", Remaining (" + remaining.hours + ":" + remaining.minutes + ")")

}

function setTimes(cb, section = ".section-list", lesson = ".lecture-name") {
    $(section).each((i2, e_ul) => {
        let min = 0
        let sec = 0
        const e = $(e_ul)
        let str = e.find(lesson).text()
        let regexp = /\((\d+)\:(\d+)\)/gm
        const array = [...str.matchAll(regexp)];

        for (let i = 0; i < array.length; i++) {
            const m = array[i];
            if (m && m[1]) {
                min = min + parseInt(m[1])
                sec = sec + parseInt(m[2])
            }
        }
        cb(min, sec, 0, e)
    })
}

function optmize_obj_time(obj) {
    obj.minutes = obj.minutes + Math.floor(obj.seconds / 60)
    obj.seconds = obj.seconds % 60
    obj.hours = obj.hours + Math.floor(obj.minutes / 60)
    obj.minutes = obj.minutes % 60
    return obj
}

jQuery(() => {
    init()
})