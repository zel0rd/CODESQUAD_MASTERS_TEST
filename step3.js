const colors = require('colors');
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
    // 큐브를 조작할 순서를 받음
}

function parser(){
    // F, R, U, B, L, D 이외에 숫자나 '(single quote)를 하나의 배열로 처리
}

function processing(){
    // parser를 거친 input을 count 횟수만큼 push에 호출
}

function push(){
    // 큐브를 조작
    // 총 몇회를 조작했는지 기록
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