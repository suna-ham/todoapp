const $s = s => document.querySelector(s)
const $a = s => Array.apply(null,document.querySelectorAll(s))

// 브라우저 로컬 스토리지에 저장 부분

let localStorageValue = [];

const htmlRule = `
<div class="task">
    <span class="taskname">
    </span>
    <button class="delete">
        <i class="far fa-trash-alt"></i>
    </button>
</div>    
`

if (!localStorage.getItem('dataArray')) {
    localStorage.setItem('dataArray', '[]')
} else {
    localStorageValue = JSON.parse(localStorage.getItem('dataArray'))
    for (const it of localStorageValue) {
        $s('#tasks').insertAdjacentHTML('beforeend',htmlRule)
        if(it.complete) $s('#tasks .task:last-child').classList.add('completed')
        $s('#tasks .task:last-child .taskname').innerText = it.value
    }
}



// 일정 완료ㆍ삭제 기능 갱신

const functionReload = () => {
    if ($s('.task')) {
        const tasks = $a('.taskname');
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].addEventListener('click', function () {
                this.classList.toggle('completed');
                localStorageValue[i].complete = !localStorageValue[i].complete
                localStorage.setItem('dataArray', JSON.stringify(localStorageValue))
            })
        }
        $s("#newtask input").value = "";
    }

    if ($s('.task')) {
        const current_tasks = $a('.delete');

        for (let i = 0; i < current_tasks.length; i++) {
            current_tasks[i].addEventListener('click', function () {
                this.parentNode.remove();
                localStorageValue = localStorageValue.filter((it, ix) => ix !== i)
                localStorage.setItem('dataArray', JSON.stringify(localStorageValue))
            })
        }
    }
}

functionReload() // 로딩시 완료ㆍ삭제 기능 넣기




// 일정 추가

$s('#push').addEventListener('click', function () {
    if ($s('#newtask input').value.length == 0) {
        alert("Please Enter a Task")
    } else {
        $s('#tasks').insertAdjacentHTML('beforeend',htmlRule)
        $s('#tasks .task:last-child .taskname').innerText = $s('#newtask input').value
        localStorageValue.push({
            value: $s('#newtask input').value,
            complete: false
        })

        localStorage.setItem('dataArray', JSON.stringify(localStorageValue))

        functionReload()
    }
})






// 엔터키 부분

addEventListener('keydown', function (e) {
    if (e.key === 'Enter') $s('#push').click()
})

// addEventListener('keydown', e => {
//     if (e.key === 'Enter') $s('#push').click()
// })





// 리셋 부분
$s('#reset').addEventListener('click', function () {
    if(confirm('Really reset?')){
        localStorage.removeItem('dataArray')
        location.reload()
    }
})

