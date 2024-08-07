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

    //to count characters
    setCharCount(comNo) {
        if (comNo == 0) {
            this.wrongChars++;
        } else if (comNo == 1) {
            this.correctChars++;
        }
        this.updateCharPercentage();
    }

    updateCharPercentage() {
        this.totalChars = this.correctChars + this.wrongChars;
        this.accuracyPercentage = (this.correctChars / this.totalChars) * 100;
    }

    //to show the timer
    showTimer() {
        //check if the mode is at Speed Test
        if (this.mode == "Speed Test" && isEndGame == false) {
            //set time to run
            this.timer = second() + 60 * this.coeff;

            //if this.timer == 0
            if (this.timer < this.startTimer && this.isAdded == false) {
                //countup one second
                this.timimg++;

                //add 60 seconds to this.timer
                this.coeff++;

                //indicate that coefficient has been added
                this.isAdded = true;

                //if this.timer != 0
            } else {
                //take time running to be time now - time at start
                this.timing = this.timer - this.startTimer;

                //reset whether 60 seconds have been added to false
                this.isAdded = false;
            }

            //if mode is at countdown
        } else if (isEndGame == false || this.stopGame == true) {
            //set time to run
            this.timer = second() + 60 * this.coeff;

            //if this.timer == 0
            if (this.timer < this.startTimer && this.isAdded == false) {
                //countdown one second
                this.timing--;

                //add 60 seconds to this.timer
                this.coeff++;

                //indicate that coefficient has been added
                this.isAdded = true;

                //if this.timer != 0
            } else {
                //take time running to be time now - time at start
                let timeSince = this.timer - this.startTimer;
                this.timing = this.countDown - timeSince;

                //reset whether 60 seconds have been added to false
                this.isAdded = false;
            }

            //check if time is up
            if (this.timing == 0) {
                //stop game
                this.immediateStopGame = true;
                this.winLose = "lose";
            }
        }

        //display timer
        push();

        //remove lime
        noStroke();

        //set user interface features
        fill("darkgreen");

        //set sidebar border
        rect(
            (canvasSize * 84) / 80,
            canvasSize / 9,
            (canvasSize * 19) / 80,
            lineSpacing
        );

        //set text user interfaces
        fill("white");
        textSize((canvasSize * 3) / 80);
        textAlign(CENTER);

        //show text
        text(
            "Timer: " + this.timing,
            (canvasSize * 93.5) / 80,
            canvasSize / 9 + 0.75 * lineSpacing
        );
        pop();
    }

    startRecordTime() {
        //set initial time
        this.startTimer = second();
    }

    call() {
        //if lose
        if (this.accuracyPercentage < 50 || this.timing == 0) {
            this.winLose = "lose";

            //if win
        } else {
            this.winLose = "win";
        }

        //stop game naturally
        this.stopGame = true;
    }
}
