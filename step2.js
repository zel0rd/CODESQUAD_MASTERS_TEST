const readline = require("readline");
const ARRAY = [['R','R','W'],['G','C','W'],['G','B','B']]

function printArray(arr){
    arr.map( (rows) => 
        rows.map( (value) => 
            process.stdout.write(value + " ")
        ) + console.log("")
    ) + console.log("")
}

function getInput(){
    // print INIT
    printArray(ARRAY)

    // getInput
    let rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt("CUBE> ")
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
    let queue = line.split('')
    queue.map(function(v){
        push(v)
        printArray(ARRAY)
    })
}

function push(v){
    console.log("executed from push :",v)
}

getInput()