function setup() {
    //call variables so that canvas can be setted up
    getVar();
  
    //create button to call for speed test
    button1 = createButton("Speed Test");
    button1.size(100, 50);
    button1.position(
      canvasSize * 1.5 - (canvasSize * 3) / 16,
      canvasSize / 12 + 0.5 * lineSpacing
    );
    button1.mousePressed(speedTest);
  
    //create button to call for 45sCountdown
    button2 = createButton("45s Countdown");
    button2.size(100, 50);
    button2.position(
      canvasSize * 1.5 - (canvasSize * 3) / 16,
      canvasSize / 12 + 2 * lineSpacing
    );
    button2.mousePressed(s45Countdown);
  
    //create button to call zen mode
    button3 = createButton("Zen Mode");
    button3.size(100, 50);
    button3.position(
      canvasSize * 1.5 - (canvasSize * 3) / 16,
      canvasSize / 12 + 3.5 * lineSpacing
    );
    button3.mousePressed(changeZen);
  
    //create button to call for statistics
    button4 = createButton("Stats for Nerds");
    button4.size(100, 50);
    button4.position(
      canvasSize * 1.5 - (canvasSize * 3) / 16,
      canvasSize / 12 + 5 * lineSpacing
    );
    button4.mousePressed(showStats);
  
    //create button to call RGBType
    button5 = createButton("RGBType");
    button5.size(100, 50);
    button5.position(
      canvasSize * 1.5 - (canvasSize * 3) / 16,
      canvasSize / 12 + 6.5 * lineSpacing
    );
    button5.mousePressed(RGBType);
  
    //create slider
    slider = createSlider(0, 100, 5);
    slider.position(
      canvasSize * 1.5 - (canvasSize * 2.4) / 16,
      canvasSize / 12 + 8.1 * lineSpacing
    );
    slider.style("width", "80px");
    slider.value(vol / 100);
    slider.mouseReleased(setMusicVol);
  
    //set up canvas with backing
    createCanvas(canvasSize * 1.5, canvasSize);
    background("lightgreen");
  
    //initialise header
    setHeader();
  
    //printline to check for characters
    print(splitString);
  }
  
  function draw() {
    //show timer if object exists
    if (isTimeShown == true) {
      gameObj.showTimer();
      halt();
    } else if (isRgbMode == true) {
      push();
      //set and check frameRate
      frameRate(rateFrame);
  
      //remove the black outline
      noStroke();
  
      //set a random light-coloured fill background; the variable 'done' toggles between 255 (when game is being played) and 0 (when results are being shown)
      fill(random(250, 255), random(250, 255), random(250, 255), done);
      rect(canvasSize / 40, canvasSize / 4, canvasSize * 1.25, canvasSize / 1.75);
  
      //set up the variable properties of the words; if a word has been inputted correctly into the system, the system removes the word from the display from the next frame onwards
      for (var i = 0; i < wordArray.length; i++) {
        //set up the x and y-coordinates of the words
        xCoord = random(
          canvasSize / 40,
          (canvasSize * 51) / 40 - (canvasSize * 15) / 80
        );
        yCoord = random(canvasSize / 4 + 30, (canvasSize * 23) / 28 - 10);
  
        //generate random variable fill of each word
        fill(random(0, 255), random(0, 255), random(0, 255));
  
        //initialise display size of words
        textAlign(LEFT);
        textSize(30);
  
        //display text
        text(wordArray[i], xCoord, yCoord);
      }
  
      //set user interface features
      fill("darkgreen");
  
      //set sidebar border
      rect(
        (canvasSize * 84) / 80,
        canvasSize / 9,
        (canvasSize * 19) / 80,
        lineSpacing
      );
  
      //display score with variable colour of text in box
      textAlign(CENTER);
      textSize((canvasSize * 3) / 80);
      fill(random(0, 255), random(0, 255), random(0, 255));
      text(
        "Score: " + score,
        (canvasSize * 93.5) / 80,
        canvasSize / 9 + 0.75 * lineSpacing
      );
  
      //find the time elasped since game begin
      var time = second();
      currentTime = time;
    }
  }
  