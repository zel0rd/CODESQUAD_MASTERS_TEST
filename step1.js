const readline = require("readline");

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
    push()
    console.log(line)
}

function push(text, direction){
}

getInput()