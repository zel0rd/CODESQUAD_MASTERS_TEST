const colors = require('colors');
const OPERATION_SET = ['U','L','F','R','B','D']
const readline = require('readline');
let count = 0
let mixFlag = 0

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
    console.log(`=================== 현재 조작 갯수 :${count} ===================`.blue)
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
    console.log(`==========================================================`.blue)
    console.log("")
}

function getInput(){
    console.log("초기 상태 출력".red)
    let startTime = new Date()
    let answer = getAnswer(mixCube())
    printArray(CUBE)
    // 큐브를 조작할 순서를 받음

    let rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt("CUBE> ")
    rl.prompt();
    rl.on('line', function(line) {
        if (line.toLowerCase() === 'q' || line.toLowerCase()==='quit'){
            rl.close()
        } else if(line.toLowerCase() === 'answer'){
            console.log("################### answer ###############".red)
            processing(answer, startTime)
        } else {
            processing(line, startTime)
        }
        rl.prompt()
    })
    .on('close', () => {
        timeMeasure(startTime,  new Date())
        console.log()
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

function processing(line, startTime){
    // parser를 거친 input을 count 횟수만큼 push에 호출
    let queue = parser(line.split(''))
    queue.map(function(v){
        push(v)
        printArray(CUBE)
        completeCheck(startTime)
    })
}

function push(v){
    // 큐브를 조작
    // 총 몇회를 조작했는지 기록

    if (mixFlag !== 0){
        console.log(`${v}를 수행`.green)
    }

    if (v === 'F'){
        f_operation()
        timesCounter()
    } else if (v === "F'"){
        f_operation()
        f_operation()
        f_operation()
        timesCounter()
    } else if (v === "U"){
        u_operation()
        timesCounter()
    } else if (v === "U'"){
        u_operation()
        u_operation()
        u_operation()
        timesCounter()
    } else if (v === "R"){
        r_operation()
        timesCounter()
    } else if (v === "R'"){
        r_operation()
        r_operation()
        r_operation()
        timesCounter()
    } else if (v === "B"){
        b_operation()
        timesCounter()
    } else if (v === "B'"){
        b_operation()
        b_operation()
        b_operation()
        timesCounter()
    } else if (v === "L"){
        l_operation()
        timesCounter()
    } else if (v === "L'"){
        l_operation()
        l_operation()
        l_operation()
        timesCounter()
    } else if (v === "D"){
        d_operation()
        timesCounter()
    } else if (v === "D'"){
        d_operation()
        d_operation()
        d_operation()
        timesCounter()
    }
    
}

function u_operation(){
    CUBE[0] = rotate(CUBE[0])

    let sideTemp = [CUBE[1][0][0],CUBE[1][0][1],CUBE[1][0][2]] // F
    CUBE[1][0][0] = CUBE[2][0][0]
    CUBE[1][0][1] = CUBE[2][0][1]
    CUBE[1][0][2] = CUBE[2][0][2] // FR
    
    CUBE[2][0][0] = CUBE[3][0][0]
    CUBE[2][0][1] = CUBE[3][0][1]
    CUBE[2][0][2] = CUBE[3][0][2] // RB
    
    CUBE[3][0][0] = CUBE[4][0][0]
    CUBE[3][0][1] = CUBE[4][0][1]
    CUBE[3][0][2] = CUBE[4][0][2] // BL

    CUBE[4][0][0] = sideTemp[0]
    CUBE[4][0][1] = sideTemp[1]
    CUBE[4][0][2] = sideTemp[2] // LF
}

function f_operation(){
    CUBE[1] = rotate(CUBE[1])

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

function r_operation(){
    CUBE[2] = rotate(CUBE[2])

    let sideTemp = [CUBE[0][0][2],CUBE[0][1][2],CUBE[0][2][2]]  // U
    CUBE[0][0][2] = CUBE[1][0][2]
    CUBE[0][1][2] = CUBE[1][1][2]
    CUBE[0][2][2] = CUBE[1][2][2] // UF
    
    CUBE[1][0][2] = CUBE[5][0][2]
    CUBE[1][1][2] = CUBE[5][1][2]
    CUBE[1][2][2] = CUBE[5][2][2] // FD
    
    CUBE[5][0][2] = CUBE[3][0][0]
    CUBE[5][1][2] = CUBE[3][1][0]
    CUBE[5][2][2] = CUBE[3][2][0] // DB

    CUBE[3][0][0] = sideTemp[0]
    CUBE[3][1][0] = sideTemp[1]
    CUBE[3][2][0] = sideTemp[2] // BU
}

function b_operation(){
    CUBE[3] = rotate(CUBE[3])

    let sideTemp = [CUBE[0][0][0],CUBE[0][0][1],CUBE[0][0][2]]  // U
    CUBE[0][0][0] = CUBE[2][0][2]
    CUBE[0][0][1] = CUBE[2][1][2]
    CUBE[0][0][2] = CUBE[2][2][2] // UR
    
    CUBE[2][0][2] = CUBE[5][2][0]
    CUBE[2][1][2] = CUBE[5][2][1]
    CUBE[2][2][2] = CUBE[5][2][2] // RD
    
    CUBE[5][2][0] = CUBE[4][0][0]
    CUBE[5][2][1] = CUBE[4][1][0]
    CUBE[5][2][2] = CUBE[4][2][0] // DL

    CUBE[4][0][0] = sideTemp[0]
    CUBE[4][1][0] = sideTemp[1]
    CUBE[4][2][0] = sideTemp[2] // LU
}

function l_operation(){
    CUBE[4] = rotate(CUBE[4])

    let sideTemp = [CUBE[0][0][0],CUBE[0][1][0],CUBE[0][2][0]]  // U
    CUBE[0][0][0] = CUBE[3][2][2]
    CUBE[0][1][0] = CUBE[3][1][2]
    CUBE[0][2][0] = CUBE[3][0][2] // UB
    
    CUBE[3][0][2] = CUBE[5][2][0]
    CUBE[3][1][2] = CUBE[5][1][0]
    CUBE[3][2][2] = CUBE[5][0][0] // BD
    
    CUBE[5][0][0] = CUBE[1][0][0]
    CUBE[5][1][0] = CUBE[1][1][0]
    CUBE[5][2][0] = CUBE[1][2][0] // DF

    CUBE[1][0][0] = sideTemp[0]
    CUBE[1][1][0] = sideTemp[1]
    CUBE[1][2][0] = sideTemp[2] // FU
}

function d_operation(){
    CUBE[5] = rotate(CUBE[5])

    let sideTemp = [CUBE[1][2][0],CUBE[1][2][1],CUBE[1][2][2]]  // F
    CUBE[1][2][0] = CUBE[4][2][0]
    CUBE[1][2][1] = CUBE[4][2][1]
    CUBE[1][2][2] = CUBE[4][2][2] // FL
    
    CUBE[4][2][0] = CUBE[3][2][0]
    CUBE[4][2][1] = CUBE[3][2][1]
    CUBE[4][2][2] = CUBE[3][2][2] // LB
    
    CUBE[3][2][0] = CUBE[2][2][0]
    CUBE[3][2][1] = CUBE[2][2][1]
    CUBE[3][2][2] = CUBE[2][2][2] // BR

    CUBE[2][2][0] = sideTemp[0]
    CUBE[2][2][1] = sideTemp[1]
    CUBE[2][2][2] = sideTemp[2] // RF
}

function rotate(dim){
    let rotated_dim = JSON.parse(JSON.stringify(dim))
    for(let i = 0; i < 3; i++){
        for(let j = 0; j<3; j++){
            rotated_dim[j][3-1-i] = dim[i][j]
        }
    }
    return rotated_dim
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
    minutes = minutes > 9 ? ""+minutes : "0"+minutes
    seconds = seconds > 9 ? ""+seconds : "0"+seconds
    process.stdout.write(`경과시간: ` + minutes+"분"+seconds+"초")
}

function printCount(){
    process.stdout.write(`조작갯수: `+count+"\t")
}

function mixCube(){
    // 초기값에서 임의로 F,R,U,B,L,D를 사용한 문자열을 생성하여 수행
    mixLine = ''
    for(let i=0; i < 5 ; i++){
        mixLine += getRandomOperationSet()
    }

    // console.log(`정답 ${mixLine}`)

    let queue = parser(mixLine.split(''))
    queue.map(function(v){
        push(v)
    })
    mixFlag = 1;
    timesReset();
    return mixLine;
}

function getRandomOperationSet(){
    return OPERATION_SET[Math.floor(Math.random() * OPERATION_SET.length)]
}

function completeCheck(startTime){
    // push를 수행할 때마다 모든 면이 같은 색상이 되었는지 확인
    let checker = 0;
    let result = CUBE.flat().flat().map( function(v) { return v[0] } )
    for(let i = 0; i < 6; i++){
        if( new Set(temp = result.slice(9*i, 9*i + 9)).size === 1){
            checker += 1;
        }
    }

    if (checker === 6){
        congratulation(startTime)
    }
}

function congratulation(startTime){
    console.log("##############################################".rainbow)
    console.log("##########      congratulation      ##########".rainbow)
    process.stdout.write("########      ".rainbow)
    timeMeasure(startTime,  new Date())
    process.stdout.write("      ########\n".rainbow)
    process.stdout.write("########      ".rainbow)
    printCount()
    process.stdout.write("      ########\n".rainbow)
    console.log("##########      congratulation      ##########".rainbow)
    console.log("##############################################".rainbow)
    process.exit();
}

function getAnswer(mixLine){
    return mixLine.split("").reverse().map( v => v.concat("'")).join('')
}

getInput()