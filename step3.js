const colors = require('colors');
const { futimesSync } = require('fs');
const readline = require('readline')
const CUBE = [  [   ['B','B','B'],
                    ['B','B','B'],
                    ['B','B','B']   ],
                [   ['W','W','W'],
                    ['W','W','W'],
                    ['W','W','W']   ],
                [   ['O','O','O'],
                    ['O','O','O'],
                    ['O','O','O']   ],
                [   ['G','G','G'],
                    ['G','G','G'],
                    ['G','G','G']   ],
                [   ['Y','Y','Y'],
                    ['Y','Y','Y'],
                    ['Y','Y','Y']   ],
                [   ['R','R','R'],
                    ['R','R','R'],
                    ['R','R','R']   ]
            ]

function printArray(cube){
    // 현재 큐브의 상태를 출력

    cube.map (function(dim, idx){
        if(idx === 0 || idx == 5){
            dim.map( (arr) => 
                arr.map( (v) => process.stdout.write(v + " ")) + console.log("")
            ) + console.log("")
        } else if (idx === 1){
            for(let i=0; i<3;i++){
                for(let j=1; j < 5;j++){
                    let text = cube[j][i].join(" ")
                    process.stdout.write(text + "\t")
                }+console.log()
            }+console.log()
        }
    })
}

function getInput(){
    console.log("초기 상태 출력".red)
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
        console.log("Bye~".red)
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
    console.log(`executed : ${v}`)
}

function timeMeasure(){
    // 시작부터 끝날 때 까지의 시간을 기록
}

function mixCube(){
    // 초기값에서 임의로 F,R,U,B,L,D를 사용한 문자열을 생성하여 수행
}

function completeCheck(){
    // push를 수행할 때마다 모든 면이 같은 색상이 되었는지 확인
}

getInput()