var timer = {};
const startInterval = (key, fn, time, isOneRun = true) => {
    // console.log(time, 'time');
    isOneRun && fn();
    if (timer[key]) {
        clearInterval(timer[key]);
        timer[key] = ''
    }
    if (!timer[key]) timer[key] = setInterval(() => {
        // console.log(timer, '全局轮训器');
        // if()
        fn()
    }, time || 20000);
}
const stopInterval = (pageUrl) => {
    Object.values(timer).forEach(e => {
        clearInterval(e);
    });
    timer = {}
}
const clearKeyTime = (key) => {
    if (!timer[key]) return
    clearInterval(timer[key]);
    delete timer[key]
}

export {
    startInterval,
    stopInterval,
    clearKeyTime,
}