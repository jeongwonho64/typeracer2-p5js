//set up character class
class charKeyed {

    //initialise variables in charKey
    constructor(xpos, ypos, letter, textSize) {

        //set fill to untyped
        this.fill = 'grey'

        //initialise location coordinates
        this.x = xpos
        this.y = ypos

        //set letter
        this.letter = letter

        //set text size
        this.textSize = textSize
    }

    //change fill according whether character is correctly keyed
    changeFill(num) {

        //if character is incorrectly keyed
        if (num == 0) {
            this.fill = 'red'

            //if character is correctly keyed
        } else if (num == 1) {
            this.fill = 'black'

            //if character was backspaced on
        } else {
            this.fill = 'grey'
        }
    }

    //show character
    display() {

        //set up character user interface variables
        textAlign(LEFT)
        fill(this.fill)
        textSize(this.textSize)

        //display character
        text(this.letter, this.x, this.y)
    }
}