
document.addEventListener('DOMContentLoaded', function() {


    model = {
        state: 'ready', // ready, break, or session
        sessionLength: 25, // 25 minute default length
        breakLength: 5, // 5 minute default length
        timerString: '25:00', // 25:00 is default timer
        progress: 0, // progress is 1 - 100
        pause: false // pause starts at false
        currentTimerSeconds: 1500, // current timer state in seconds
        minutesToSeconds: min => min * 60, // converts minutes to seconds
        // method converts seconds to time formatted string
        secondsToTimeString: sec => {
            return '00:00';
        },
        reset: () => {
            model.state = 'ready';
            model.timerString = model.secondsToTimeString(model.currentTimerSeconds);
            model.progress = 0;
            model.pause = false;
        },
    };





});
