
//document.addEventListener('DOMContentLoaded', function() {


    // model = {
    //     state: 'ready', // ready, break, or session
    //     sessionLength: 25, // 25 minute default length
    //     breakLength: 5, // 5 minute default length
    //     currentTimerSeconds: 1500, // current timer state in seconds
    //     timerString: '25:00', // 25:00 is default timer
    //     progress: 0, // progress is 1 - 100
    //     pause: false, // pause starts at false
    //     // method converts seconds to time formatted string
    //     secondsToTimeString: sec => {
    //         return '00:00';
    //     },
    //     reset: () => {
    //         model.state = 'ready';
    //         model.progress = 0;
    //         model.pause = false;
    //         model.updateTimer(model.sessionLength);
    //     },
    //     updateTimer: min => {
    //         model.currentTimerSeconds = (min) ? (min * 60) : (model.currentTimerSeconds - 1);
    //         model.timerString = model.secondsToTimeString(model.currentTimerSeconds);
    //     }
    // };

    function TimerModel() {
        this.session = 25;
        this.break = 5;
    }

    TimerModel.prototype.increment = timer => {
        if (!!this[timer]) this[timer]++;
    };

    TimerModel.prototype.decrement = timer {
        if (!!this[timer]) this[timer]--;
    };

    function TimerController(model) {
        this.model = model;

        this.currentTimer = 'session';
        this.startSeconds = this.model[this.currentTimer] * 60;

    }

    //methods for controller

    TimerController.prototype.updateModel = () => {

        console.log(this.model);
    };

    TimerController.prototype.start = countdown => {
        setInterval(countdown, 1000);
    };

    TimerController.prototype.countdown = () => {
        if (!!this.startSeconds) {
            this.startSeconds--;
            console.log(this.startSeconds);
        }
    };

    TimerController.prototype.nextTimer = () => {

    };

    TimerController.prototype.pause = timer {
        clearInterval(timer);
    };

    pause



// });
