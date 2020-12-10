const colors = require('colors');
const readline = require("readline");
const DIRECTIONS = ['L','R']

function getInput() {
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

function inputChecker(inputs){
    // error1 : less than 3 parameters
    if (inputs.length !== 3){
        return console.log(`[INPUT ERROR]`.bgRed, `INVALID PARAMETERS => (text, count, direction)`.brightGreen)
    }
    let text = inputs[0]

    // error2 : count is not a number
    if (isNaN(parseInt(inputs[1]))){
        return console.log(`[INPUT ERROR]`.bgRed, `ONLY NUMBERS CAN BE ENTERED IN COUNT`.brightGreen, inputs[1])
    }
    let count = parseInt(inputs[1])
    let direction = inputs[2].toUpperCase()

    // error3 : wrong direction
    if (!DIRECTIONS.includes(direction)) {
        return console.log(`[INPUT ERROR]`.bgRed, `UNABLE DIRECTION :`.brightGreen, direction)
    }

    return "pass"
}

function getPositiveCount(count, direction){
    // count가 음수일 경우, 양수로 변환하고 방향을 바꿔 줌
    if (count < 0 ){
        count*= -1
        if(direction === DIRECTIONS[0]){
            direction = DIRECTIONS[1]
        } else {
            direction = DIRECTIONS[0]
        }
    }
    return [count, direction]
}

function processing(line){
    let inputs = line.split(' ')

    if ( inputChecker(inputs) === "pass") {
        let text = inputs[0]
        let getPositive = getPositiveCount(parseInt(inputs[1]),inputs[2].toUpperCase())
        let count = getPositive[0]
        let direction = getPositive[1]

        for(let i=0; i < count;i++){
            text = push(text,direction)
        }
        console.log(text.blue)
    }
}

function push(text, direction){
    text = text.split('')
    if (direction === 'L'){
        text.push(text[0])
        text.shift()
        text = text.join('')
        return text
    } else if(direction === 'R'){
        text.unshift(text[text.length -1])
        text.pop()
        text = text.join('')
        return text
    } 
}

getInput()