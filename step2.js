const { get } = require("http")

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
    
    // processing1
    // push
    // printArr

    // processing2
    // push
    // printArr

    // exit
}

function processing(){

}

function push(){

}

getInput()