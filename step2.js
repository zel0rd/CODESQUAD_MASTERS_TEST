const colors = require('colors');
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
    console.log("INIT ARRAY".blue)
    printArray(ARRAY)

    // getInput
    let rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt("CUBE> ")
    rl.prompt();
    rl.on('line', function(line) {
        if (line.toLowerCase() === 'q' || line.toLowerCase()==='quit'){
            rl.close()
        } else {
            processing(line)
        }
        rl.prompt()
    })
    .on('close', () => {
        console.log("Bye~".red)
        process.exit();
    })
    
}

function processing(line){
    let queue = parser(line.split(''))

    queue.map(function(v){
        push(v)
        printArray(ARRAY)
    })
}

function parser(queue){
    let singleQuote = queue.filter(v => v === "'").length
    for (let i = 0; i < singleQuote ; i++){
        let temp_index = queue.indexOf("'")
        queue[temp_index - 1] += "'"
        queue.splice(temp_index,1)
    }
    return queue
}

function push(v){
    console.log(`EXECUTE : ${v}`.green)
    if(v === "U"){
        ARRAY[0].push(ARRAY[0][0])
        ARRAY[0].shift()
    }
    if(v === "U'"){
        ARRAY[0].unshift(ARRAY[0][ARRAY[0].length -1])
        ARRAY[0].pop()
    }
    if(v === "R"){
        let tempArr = ARRAY.map( (v) => v[2] )
        tempArr.push(tempArr[0])
        tempArr.shift()
        ARRAY.map( function(val, idx){
            val[2] = tempArr[idx]
        })
    }
    if(v === "R'"){
        let tempArr = ARRAY.map( (v) => v[2] )
        tempArr.unshift(tempArr[tempArr.length -1])
        tempArr.pop()
        ARRAY.map( function(val, idx){
            val[2] = tempArr[idx]
        })
    }
    if(v === "L"){
        let tempArr = ARRAY.map( (v) => v[0] )
        tempArr.unshift(tempArr[tempArr.length -1])
        tempArr.pop()
        ARRAY.map( function(val, idx){
            val[0] = tempArr[idx]
        })
    }
    if(v === "L'"){
        let tempArr = ARRAY.map( (v) => v[0] )
        tempArr.push(tempArr[0])
        tempArr.shift()
        ARRAY.map( function(val, idx){
            val[0] = tempArr[idx]
        })
    }
    if(v === "B"){
        ARRAY[2].unshift(ARRAY[2][ARRAY[2].length -1])
        ARRAY[2].pop()
    }
    if(v === "B'"){
        ARRAY[2].push(ARRAY[2][0])
        ARRAY[2].shift()
    }
   
}

getInput()