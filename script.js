
document.addEventListener('DOMContentLoaded', function() {

    function TimerModel() {
        this.session = 25;
        this.break = 5;
    }

    TimerModel.prototype.increment = function( timer ) {
        if (!!this[timer]) this[timer]++;
    };

    TimerModel.prototype.decrement = function( timer ) {
        if (!!this[timer]) this[timer]--;
    };

    function TimerController( model, view ) {
        const self = this
        self.model = model;
        self.view = view;

        self.currentTimer = 'session';
        self.seconds = self.model[self.currentTimer] * 60;
        self.timerID = null;
        self.isPaused = false;

        self.view.bindEvents('incrementSession', function() {
            self.updateModel( {change: 'increment', timer: 'session'} );
        });

        self.view.bindEvents('decrementSession', function() {
            self.updateModel( {change: 'decrement', timer: 'session'} );
        });

        self.view.bindEvents('incrementBreak', function() {
            self.updateModel( {change: 'increment', timer: 'break'} );
        });

        self.view.bindEvents('decrementBreak',function() {
            self.updateModel( {change: 'decrement', timer: 'break'} );
        });

        self.view.bindEvents('start', function() {
            self.start();
        });

        self.view.bindEvents('pause', function() {
            self.pause();
        });

        self.view.bindEvents('reset', function() {
            self.reset();
        });
    }

    TimerController.prototype.updateModel = function ( { change, timer } ) {
        if ((change === 'decrement' && this.model[timer] > 1) || change === 'increment') {
            this.model[change](timer);
            // render updated model
            if (timer === 'session')
                this.view.render('updatedSession', this.model.session);
            if (timer === 'break')
                this.view.render('updatedBreak', this.model.break);
            if (this.timerID === null && this.isPaused === false) {
                this.setSeconds(this.currentTimer);
                this.view.render('updatedTimer', this.secondsToTimeString(this.seconds));
            }
        }
        else console.log(`Can't update ${timer} at the moment.`);
    };

    TimerController.prototype.start = function() {
        // render instead of console logs
        if (this.timerID === null) {
            this.view.render('updatedStatus', this.currentTimer
                                                  .split('')
                                                  .map((letter, i) => i === 0 ? letter.toUpperCase() : letter)
                                                  .join(''));
            this.view.render('updatedTimer', this.secondsToTimeString(this.seconds));
            let countdown = this.countdown.bind(this);
            let timerID = setInterval(countdown, 1000);
            this.timerID = timerID;
            this.isPaused = false;
        }
    };

    TimerController.prototype.secondsToTimeString = function( sec ) {
        function maybeZeroPad (num) {
            return num.length === 1 ? `0${num}` : num;
        }
        const secString = maybeZeroPad(String(sec % 60));
        const minString = String(Math.floor((sec % 3600) / 60));
        const hourString = Math.floor(sec/3600) === 0 ? '' : String(Math.floor(sec/3600));
        return (hourString) ? `${hourString}:${maybeZeroPad(minString)}:${secString}` : `${minString}:${secString}`;
    };

    TimerController.prototype.countdown = function() {
        if (!!this.seconds) {
            this.seconds--;
            // render new count
            this.view.render('updatedTimer', this.secondsToTimeString(this.seconds));
        }
        else this.nextTimer();
    };

    TimerController.prototype.nextTimer = function() {
        this.pause();
        this.isPaused = false;
        this.currentTimer = this.currentTimer === 'session' ? 'break' : 'session';
        this.setSeconds(this.currentTimer);
        this.start();
    };

    TimerController.prototype.setSeconds = function( timer ) {
        this.seconds = this.model[timer] * 60;
    };

    TimerController.prototype.pause = function() {
        clearInterval(this.timerID);
        this.timerID = null;
        this.isPaused = true;
    };

    TimerController.prototype.reset = function () {
        if (this.timerID)
            this.pause();
        this.isPaused = false;
        this.currentTimer = 'session';
        this.setSeconds('session');
        // render new session timer
        this.view.render('updatedStatus', this.currentTimer
                                              .split('')
                                              .map((letter, i) => i === 0 ? letter.toUpperCase() : letter)
                                              .join(''));
        this.view.render('updatedTimer', this.secondsToTimeString(this.seconds));
    };


    function getByID(selector) {
        return document.getElementById(selector);
    }

    function onEvent(target, type, callback) {
		target.addEventListener(type, callback);
	};

    function TimerView () {
        // this.spacebar = 32;
        // this.del = 8;
        // this.up = 38;
        // this.down = 40;
        // this.left = 37;
        // this.right = 39;

        this.startButton = getByID('start');
        this.pauseButton = getByID('pause');
        this.resetButton = getByID('reset');
        this.timerScreen = getByID('timer');
        this.timerStatus = getByID('timerStatus');
        this.sessionLength = getByID('sessionLength');
        this.breakLength = getByID('breakLength');
        this.incrementSessionButton = getByID('incrementSession');
        this.decrementSessionButton = getByID('decrementSession');
        this.incrementBreakButton = getByID('incrementBreak');
        this.decrementBreakButton = getByID('decrementBreak');
    }

    TimerView.prototype.render = function (viewCmd, parameter) {
        const self = this;
        const viewCommands = {
            updatedBreak: function() {
                self.breakLength.innerHTML = parameter;
            },
            updatedSession: function () {
                self.sessionLength.innerHTML = parameter;
            },
            updatedTimer: function () {
                self.timerScreen.innerHTML = parameter;
            },
            updatedStatus: function () {
                self.timerStatus.innerHTML = parameter;
            }
        }
        viewCommands[viewCmd]();
    };

    TimerView.prototype.bindEvents = function (event, handler) {
        const self= this;
        viewEvents = {
            incrementSession: function() {
                onEvent(self.incrementSessionButton,'click', handler)
            },
            decrementSession: function() {
                onEvent(self.decrementSessionButton,'click', handler)
            },
            incrementBreak: function() {
                onEvent(self.incrementBreakButton,'click', handler)
            },
            decrementBreak: function() {
                onEvent(self.decrementBreakButton,'click', handler)
            },
            start: function() {
                onEvent(self.startButton,'click', handler)
            },
            pause: function() {
                onEvent(self.pauseButton,'click', handler)
            },
            reset: function() {
                onEvent(self.resetButton,'click', handler)
            }
        };
        viewEvents[event]();
    };

    const m = new TimerModel();
    const v = new TimerView();
    const c = new TimerController(m, v);

});
