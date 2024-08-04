//set up gameResult class
class gameRes {
    constructor(mode, countdown) {
        //determine current mode activated
        this.mode = mode;

        //set up timestamp
        this.timeStart = new Date();

        //define endTime() variables
        this.timeEnd = 0;
        this.timeTakenInSec = 0;

        //define showTimer() variables
        this.timer = 0;
        this.countDown = countdown;
        this.timing = countdown;
        this.startTimer = 0;
        this.isAdded = false;
        this.coeff = 0;

        //define win variables
        this.winLose = "win";
        this.stopGame = false;
        this.immediateStopGame = false;

        //define charCount() variables
        this.correctChars = 0;
        this.wrongChars = 0;
        this.totalChars = 0;
        this.accuracyPercentage = 0;
    }

    //to call time taken when time ends
    setEndTime() {
        //set end timeStamp
        this.timeEnd = new Date();

        //set time difference
        this.timeTakenInSec = round(
            (this.timeEnd.getTime() - this.timeStart.getTime()) / 1000
        );
    }
}
