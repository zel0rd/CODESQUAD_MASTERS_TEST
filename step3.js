const colors = require('colors');
const OPERATION_SET = ['U','L','F','R','B','D']
const readline = require('readline');
let count = 0

const CUBE = [  [   ['U1','U2','U3'],
                    ['U4','U5','U6'],
                    ['U7','U8','U9']   ],
                [   ['F1','F2','F3'],
                    ['F4','F5','F6'],
                    ['F7','F8','F9']   ],
                [   ['R1','R2','R3'],
                    ['R4','R5','R6'],
                    ['R7','R8','R9']   ],
                [   ['B1','B2','B3'],
                    ['B4','B5','B6'],
                    ['B7','B8','B9']   ],
                [   ['L1','L2','L3'],
                    ['L4','L5','L6'],
                    ['L7','L8','L9']   ],
                [   ['D1','D2','D3'],
                    ['D4','D5','D6'],
                    ['D7','D8','D9']   ],
            ]

function printArray(cube){
    // 현재 큐브의 상태를 출력

    cube.map (function(dim, idx){
        if(idx === 0 || idx == 5){
            dim.map( (arr) => 
                arr.map( (v) => process.stdout.write(v  + " ")) + console.log("")
            ) + console.log("")
        } else if (idx === 1){
            for(let i=0; i<3;i++){
                for(let j=1; j < 5;j++){
                    let text = cube[j][i].join(" ")
                    process.stdout.write(text.rainbow + "\t")
                }+console.log()
            }+console.log()
        }
    })
}

function getInput(){
    console.log("초기 상태 출력".red)
    mixCube()
    printArray(CUBE)
    // 큐브를 조작할 순서를 받음

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
        timeMeasure(startTime,  new Date())
        printCount()
        process.exit();
    })
}

function parser(queue){
    // F, R, U, B, L, D 이외에 숫자나 '(single quote)를 하나의 배열로 처리
    let singleQuote = queue.filter(v => v === "'").length

    // single quote merge
    for (let i = 0; i < singleQuote ; i++){
        let temp_index = queue.indexOf("'")
        queue[temp_index - 1] += "'"
        queue.splice(temp_index,1)
    }
    // number copy to times
    queue.map( function(val, idx) {
        if(parseInt(val)){
            queue.splice(idx,1)
            for(let i=1; i < parseInt(val); i++){
                queue.splice(idx,0,queue[idx-1])
            }
        }
    })
    
    queue = queue.map(v=> v.toUpperCase())
    return queue
}

function processing(line){
    // parser를 거친 input을 count 횟수만큼 push에 호출
    let queue = parser(line.split(''))
    queue.map(function(v){
        push(v)
        printArray(CUBE)
    })
}

function push(v){
    // 큐브를 조작
    // 총 몇회를 조작했는지 기록

    if (v === 'F'){
        f_operation()
        timesCounter()
    } else if (v === "F'"){
        f_operation()
        f_operation()
        f_operation()
        timesCounter()
    }
}

function f_operation(){
    let temp = JSON.parse(JSON.stringify(CUBE[1]))
    for(let i = 0; i < 3; i++){
        for(let j = 0; j<3; j++){
            temp[j][3-1-i] = CUBE[1][i][j]
        }
    }
    CUBE[1] = temp;

    let sideTemp = [CUBE[0][2][0],CUBE[0][2][1],CUBE[0][2][2]]
    CUBE[0][2][0] = CUBE[4][2][2]
    CUBE[0][2][1] = CUBE[4][1][2]
    CUBE[0][2][2] = CUBE[4][0][2] // UL
    
    CUBE[4][0][2] = CUBE[5][0][0]
    CUBE[4][1][2] = CUBE[5][0][1]
    CUBE[4][2][2] = CUBE[5][0][2] // LD
    
    CUBE[5][0][0] = CUBE[2][2][0]
    CUBE[5][0][1] = CUBE[2][1][0]
    CUBE[5][0][2] = CUBE[2][0][0] // DR

    CUBE[2][0][0] = sideTemp[0]
    CUBE[2][1][0] = sideTemp[1]
    CUBE[2][2][0] = sideTemp[2] // R = TEMP
}

function timesCounter(){
    count += 1
}

function timesReset(){
    count = 0
}

function timeMeasure(startTime, endTime){
    // 시작부터 끝날 때 까지의 시간을 기록
    let minutes = parseInt((endTime-startTime)/1000/60)
    let seconds = parseInt((endTime-startTime)/1000%60)
    console.log(`경과시간:`,`${minutes > 9 ? ""+minutes : "0"+minutes}:${seconds > 9 ? ""+seconds : "0"+seconds}`.red)
}

function printCount(){
    console.log(`조작갯수:`,`${count}`.red)
}

function mixCube(){
    // 초기값에서 임의로 F,R,U,B,L,D를 사용한 문자열을 생성하여 수행
}

function completeCheck(){
    // push를 수행할 때마다 모든 면이 같은 색상이 되었는지 확인
}


let startTime = new Date()
getInput()
