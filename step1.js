const colors = require('colors');
const readline = require("readline");
const DIRECTIONS = ['L','R']

function getInput() {
    // getInput - readline
    // process - direction, text, count
    // push - text, direction
    let rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt("> ")
    rl.prompt();
    rl.on('line', function(line) {
        if (line === 'q' || line.toLowerCase()==='quit'){
            rl.close()
        } else {
            processing(line)
        }
        rl.prompt()
    })
    .on('close', () => {
        console.log("closed!!")
        process.exit();
    })
}

function processing(line){
    let inputs = line.split(' ')

    // error
    if (inputs.length !== 3){
        return console.log(`[INPUT ERROR]`.bgRed, `INVALID PARAMETERS => (text, count, direction)`.brightGreen)
    }

    let text = inputs[0]

    // error
    if (isNaN(parseInt(inputs[1]))){
        return console.log(`[INPUT ERROR]`.bgRed, `ONLY NUMBERS CAN BE ENTERED IN COUNT`.brightGreen, inputs[1])
    }
    let count = parseInt(inputs[1])
    let direction = inputs[2].toUpperCase()

    // err
    if (!DIRECTIONS.includes(direction)) {
        return console.log(`[INPUT ERROR]`.bgRed, `UNABLE DIRECTION :`.brightGreen, direction)
    }
    
    if (count < 0 ){
        count*= -1
        if(direction === DIRECTIONS[0]){
            direction = DIRECTIONS[1]
        } else {
            direction = DIRECTIONS[0]
        }
    }
    for(let i=0; i < count;i++){
        text = push(text,direction)
    }
    console.log(text)
}

function push(text, direction){
}

getInput()