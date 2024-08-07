//run speedTest mode
function speedTest() {
    //Play song. Stop first to ensure no multiple clicks to start music
    songRgb.stop();
    song.stop();
    song.setVolume(vol);
    song.play();
    song.loop();

    //reset background variables
    background("lightgreen");
    getVar();

    //set instance of gameResult class
    gameObj = new gameRes("Speed Test", 0);
    gameObj.startRecordTime();
    isTimeShown = true;

    //call text
    setText();
    setHeader();

    //ensure table does not exist
    isTableShown = false;
}

//activiate zen input function
function changeZen() {
    //stop song
    song.stop();
    songRgb.stop();

    //reset background variables
    background("lightgreen");
    getVar();

    //Create textarea which acts a text box rather than input line
    inp = createElement("textarea", "");
    inp.position(canvasSize * 0.25, (canvasSize * 2) / 8);
    inp.size((canvasSize * 10) / 15, 200);

    //set zen mode checker to activated
    isZenMode = true;

    setHeader();
}

//run 45s Countdown mode
function s45Countdown() {
    //Start song. Stop first to ensure no multiple clicks to start music
    songRgb.stop();
    song.stop();
    song.setVolume(vol);
    song.play();
    song.loop();

    //reset background variables
    background("lightgreen");
    getVar(); //Play song. Stop first to ensure no multiple clicks to start music
    songRgb.stop();
    song.stop();
    song.setVolume(vol);
    song.play();
    song.loop();

    //reset background variables
    background("lightgreen");
    getVar();

    //set instance of gameResult class
    gameObj = new gameRes("45s Countdown", 45);
    gameObj.startRecordTime();
    isTimeShown = true;

    //call text
    setText();
    setHeader();

    //ensure table does not exist
    isTableShown = false;
}

//run showStats mode
function showStats() {
    getVar();

    //ensure mode is actually changed
    isRgbMode = false;
    song.stop();
    songRgb.stop();

    //remove textarea in zen mode if existent
    if (inp != null) {
        //remove zen mode input
        inp.remove();
        isZenMode = false;
    }

    //Remove rgb fields for other mode
    if (rgbInput1 != null) {
        //remove zen mode input
        rgbInput1.remove();
        rgbButton1.remove();
        rgbButton2.remove();
    }

    //remove any trace of the rgb
    background("lightgreen");

    //check if table already exists
    if (isTableShown == false) {
        if (isRadioSelected == false) {
            //Set up radio button headers
            radioContainer = createDiv("");
            statsRadio = createRadio();
            statsRadio.parent(radioContainer);
            statsRadio.option("All");
            statsRadio.option("Speed Test");
            statsRadio.option("45s Countdown");
            statsRadio.position(60, 170);
            statsRadio.selected(radioVal);
            statsRadio.changed(setRadioClicked);
        }

        //separate drawing slate
        push();

        //reset background variables
        background("lightgreen");

        //create table
        let ctr = 0;
        let str =
            "<table><tr><th>No. of Attempts</th><th>Game</th><th>Time Started</th><th>Time End</th><th>Time Taken</th><th>Total Chars</th><th>Accuracy</th></tr>";

        //run a row for every object in objectStatsArray[]
        for (i = 0; i < objectStatsArray.length; i++) {
            //if object has a timeEnd value (aka finished playing)
            if (objectStatsArray[i].timeEnd != 0) {
                //if there are values with radio
                if (
                    statsRadio.value() == "All" ||
                    statsRadio.value() == objectStatsArray[i].mode
                ) {
                    //add row
                    ctr += 1;

                    //input values into row
                    str +=
                        "<tr><td>" +
                        ctr +
                        "</td><td>" +
                        objectStatsArray[i].mode +
                        "</td><td>" +
                        objectStatsArray[i].timeStart.toLocaleTimeString() +
                        "</td><td>" +
                        objectStatsArray[i].timeEnd.toLocaleTimeString() +
                        "</td><td>" +
                        objectStatsArray[i].timeTakenInSec +
                        " sec</td><td>" +
                        objectStatsArray[i].totalChars +
                        "</td><td>" +
                        round(objectStatsArray[i].accuracyPercentage) +
                        "%</td></tr>";
                }
            }
        }

        //end table
        str += "</table>";

        //create and format table
        tableDatabase = createDiv(str);
        tableDatabase.position(60, 200);

        pop();

        //state that table has been shown
        isTableShown = true;
    } else {
        //show empty table
        isTableShown = true;
    }

    //Build the header after the mode is set
    setHeader();
}
