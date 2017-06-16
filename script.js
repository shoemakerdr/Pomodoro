
//document.addEventListener('DOMContentLoaded', function() {

    function TimerModel() {
        this.session = 25;
        this.break = 5;
    }

    TimerModel.prototype.increment = function(timer) {
        if (!!this[timer]) this[timer]++;
    };

    TimerModel.prototype.decrement = function(timer) {
        if (!!this[timer]) this[timer]--;
    };

    function TimerController(model) {
        this.model = model;

        this.currentTimer = 'session';
        this.seconds = this.model[this.currentTimer] * 60;
        this.timerID = null;
    }

    //methods for controller

    TimerController.prototype.updateModel = function() {

        console.log(this.model);
    };

    TimerController.prototype.start = function() {
        // render instead of console logs
        console.log(`Starting ${this.currentTimer}`)
        console.log(this.secondsToTimeString(this.seconds));
        let countdown = this.countdown.bind(this);
        let timerID = setInterval(countdown, 1000);
        this.timerID = timerID;
    };

    TimerController.prototype.secondsToTimeString = function(sec) {
        const secString = String(sec % 60).length === 1 ?
                          `0${String(sec % 60)}` :
                          String(sec % 60);
        const minString = String(Math.floor(sec / 60));
        return `${minString}:${secString}`;
    };

    TimerController.prototype.countdown = function() {
        if (!!this.seconds) {
            this.seconds--;
            // render new count
            console.log(this.secondsToTimeString(this.seconds));
        }
        else this.nextTimer();
    };

    TimerController.prototype.nextTimer = function() {
        this.pause();
        this.currentTimer = this.currentTimer === 'session' ? 'break' : 'session';
        this.setSeconds(this.currentTimer);
        this.start();
    };

    TimerController.prototype.setSeconds = function(timer) {
        this.seconds = this.model[timer] * 60;
    };

    TimerController.prototype.pause = function() {
        clearInterval(this.timerID);
        // render pause message
        this.timerID = null;
    };

    TimerController.prototype.reset = function () {
        if (this.timerID)
            this.pause();
        this.currentTimer = 'session';
        // render new session timer
        this.setSeconds('session');
    };





// });
