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
}
