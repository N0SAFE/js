export class Timer {
    // ! all can be:    stop with stop()
    // !                pause with pause()
    // !                start/restart with start()
    // !                return state with getStateRunning()
    // !                return time left with getTimeLeft()

    // ! func with exec after can set the func to exec after with setFunction(Function, ...args)

    // ! set timer with function in end
    static timeout(Function, delay, ...funcArgs) {
        return new TimerClasse.TimerTimeout(Function, delay, ...funcArgs)
    }

    // ! run an infinit loop and run first loop after timinig
    static infinityLooper(Function, delay, ...funcArgs) {
        return new TimerClasse.TimerInfinityReapeter(Function, delay, ...funcArgs)
    }

    // ! run an infinit loop and run instant 
    static infinityLooperInstant(Function, delay, ...funcArgs) {
        return new TimerClasse.TimerInfinityReapeterInstant(Function, delay, ...funcArgs)
    }

    // ! run a loop with number of loop in argument and run first loop after timing
    static looper(Function, delay, numberOfLoop, ...funcArgs) {
        return new TimerClasse.TimerReapeter(Function, delay, numberOfLoop, ...funcArgs)
    }

    // ! run a loop with number of loop in argument and run execution instant
    static looperInstant(Function, delay, numberOfLoop, ...funcArgs) {
        return new TimerClasse.TimerReapeterInstant(Function, delay, numberOfLoop, ...funcArgs)
    }

    // ! run a loop with number of loop in argument, run first loop after timing and run a function after the loop as finish
    static looperRunAfter(Function, delay, numberOfLoop, ...funcArgs) {
        return new TimerClasse.TimerReapeaterWithFunctionAfter(Function, delay, numberOfLoop, ...funcArgs)
    }

    // ! run a loop with number of loop in argument, run execution instant and run a function after the loop as finish
    static looperInstantRunAfter(Function, delay, numberOfLoop, ...funcArgs) {
        return new TimerClasse.TimerReapeaterInstantWithFunctionAfter(Function, delay, numberOfLoop, ...funcArgs)
    }
}

export class TimerTimeout {
    constructor(callback, delay, ...args) {
        this.selfID = new Date()
        this.args = args;
        this.callback = callback;
        this.remaining = delay;
        this.this = this
        this.start()
    }
    setObj(obj) { this.this = obj }
    start() {
        this.running = true
        this.started = new Date()
        this.id = setTimeout(this.callback, this.remaining, ...this.args)
    }
    reload() {
        this.stop()
        this.remaining = this.delay
        this.start()
    }
    pause() {
        this.running = false
        clearTimeout(this.id)
        this.remaining -= new Date() - this.started
    }
    stop() {
        this.running = false;
        clearTimeout(this.id)
        delete this.this;
    }
    getTimeLeft() {
        if (this.running) {
            this.pause()
            this.start()
        }
        return this.remaining
    }
    getStateRunning() {
        return this.running
    }
}
export class TimerInfinityReapeter extends TimerTimeout {
    constructor(callback, delay, ...args) {
        super(callback, delay, ...args)
        this.delay = delay
        this.start()
    }
    start(THIS = this) {
        THIS.running = true
        THIS.started = new Date()
        THIS.id = setTimeout(THIS.loop, THIS.remaining, THIS)
    }
    loop(THIS) {
        if (THIS.running == true) {
            THIS.callback(...THIS.args)
            THIS.stop()
            THIS.remaining = THIS.delay
            THIS.start(THIS)
        }
    }
}
export class TimerInfinityReapeterInstant extends TimerInfinityReapeter {
    constructor(callback, delay, ...args) {
        super(callback, delay, ...args)
        this.callback(...args)
    }
}
export class TimerReapeter extends TimerTimeout {
    constructor(callback, delay, numberOfLoop, ...args) {
        super(callback, delay, ...args)
        this.delay = delay
        this.numberOfLoop = numberOfLoop
        this.selfNumberOfLoop = 0
        this.start()
    }
    start(THIS = this) {
        this.running = true
        this.started = new Date()
        this.id = setTimeout(this.loop, this.remaining, THIS)
    }
    loop(THIS) {
        THIS.callback(...THIS.args)
        THIS.stop()
        THIS.remaining = THIS.delay
        if (THIS.selfNumberOfLoop < THIS.numberOfLoop - 1) {
            THIS.start(THIS)
        }
        THIS.selfNumberOfLoop++;
    }
}
export class TimerReapeaterWithFunctionAfter extends TimerReapeter {
    constructor(callback, delay, numberOfLoop, ...args) {
        super(callback, delay, numberOfLoop, ...args)
    }
    loop(THIS) {
        THIS.callback(...THIS.args)
        THIS.stop()
        THIS.remaining = THIS.delay
        if (THIS.selfNumberOfLoop < THIS.numberOfLoop - 1) {
            THIS.start(THIS)
        } else {
            THIS.function(...this.functionArgs)
        }
        THIS.selfNumberOfLoop++;
    }
    setFunction(Function, ...args) {
        this.function = Function
        this.functionArgs = args
    }
}
export class TimerReapeterInstant extends TimerReapeter {
    constructor(callback, delay, numberOfLoop, ...args) {
        super(callback, delay, numberOfLoop, ...args)
        this.callback(...args)
        this.selfNumberOfLoop++;
    }
}
export class TimerReapeaterInstantWithFunctionAfter extends TimerReapeterInstant {
    constructor(callback, delay, numberOfLoop, ...args) {
        super(callback, delay, numberOfLoop, ...args)
    }
    loop(THIS) {
        THIS.callback(...THIS.args)
        THIS.stop()
        THIS.remaining = THIS.delay
        if (THIS.selfNumberOfLoop < THIS.numberOfLoop - 1) {
            THIS.start(THIS)
        } else {
            THIS.function(...THIS.functionArgs)
        }
        THIS.selfNumberOfLoop++;
    }
    setFunction(Function, ...args) {
        this.function = Function
        this.functionArgs = args
    }
}
