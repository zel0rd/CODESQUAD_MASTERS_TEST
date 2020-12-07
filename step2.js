const readline = require("readline");

const DIRECTIONS = ['L','R']
const INIT_ARRAY = [['R','R','W'],['G','C','W'],['G','B','B']]

function printArray(arr){
    arr.map( (rows) => 
        rows.map( (value) => 
            process.stdout.write(value + " ")
        ) + console.log("")
    ) + console.log("")
}

function getInput(){
    // print INIT
    printArray(INIT_ARRAY)

    // getInput
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
        console.log("Bye~")
        process.exit();
    })
    
    // processing1
    // push
    // printArr

    // processing2
    // push
    // printArr

    // exit
}

function processing(line){
    console.log(line)
}

function push(){

}

getInput()