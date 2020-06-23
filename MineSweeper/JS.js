//Click start and create 100 grids
//Left Click:   Number -> Display number represents number of surrounded mines
//                   0 -> Expand until display number
//                Mine -> Game over
//Right Click:  Marked -> Clear mark
//              UnMark -> Make mark


var startBtn = document.getElementById('startBtn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImage = document.getElementById('alertImage');
var closeBtn = document.getElementById('closeBtn');
var score = document.getElementById('score');
var minesNum;
var mineOver;
var block;
var mineMap = [];
var startGame = true;
var mineNo = 15;

bindEvent();

function bindEvent() {
    startBtn.onclick = function () {
        if(startGame){
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            startGame = false;
        }

    };
    box.oncontextmenu = function () {
        return false;
    };
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1){
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }
    };
    closeBtn.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = "";
        startGame = true;
    }
}

function init() {
    mineOver = mineNo * 3;
    minesNum = mineNo * 3;
    score.innerHTML = mineOver;
    for (var i = 0; i < mineNo; i++) {
        for (var j = 0; j < mineNo; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({mine: 0});
        }
    }
    block = document.getElementsByClassName('block');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * mineNo * mineNo);
        if (mineMap[mineIndex].mine === 0) {
            block[mineIndex].classList.add('isMine');
            mineMap[mineIndex].mine = 1;
            minesNum--;
        }
    }
}

function leftClick(dom) {
    if(dom.classList.contains('flag'))
        return;
    var isMine = document.getElementsByClassName('isMine')
    if(dom && dom.classList.contains('isMine')){
        console.log('Game OVer');
        for (var i = 0; i < isMine.length; i++){
            isMine[i].classList.add('show');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImage.style.backgroundImage = 'url("Image/GameOver.jpg")'
        }, 800)
    }else {
        var n = 0;
        if(dom)
            var posArr = dom.getAttribute('id').split('-');
        var posX = +posArr[0];
        var posY = +posArr[1];
        dom.classList.add('num');
        for (var i = posX - 1; i<= posX + 1; i++){
            for (var j = posY - 1; j <= posY + 1; j++){
                var aroundBox = document.getElementById(i + '-' + j);
                if(aroundBox && aroundBox.classList.contains('isMine'))
                    n++;
            }
        }
        dom && (dom.innerHTML = n);
        if(n == 0){
            for (var i = posX - 1; i<= posX + 1; i++){
                for (var j = posY - 1; j <= posY + 1; j++){
                    var nearBox = document.getElementById(i + '-' + j);
                    if(nearBox){
                        if(!nearBox.classList.contains('checked')){
                            nearBox.classList.add('checked')
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }

}

function rightClick(dom) {
    if(dom.classList.contains('num'))
        return;
    dom.classList.toggle('flag');
    if(dom.classList.contains('isMine') && dom.classList.contains('flag')){
        mineOver--;
        score.innerHTML = mineOver
    }

    if(dom.classList.contains('isMine') && !dom.classList.contains('flag')){
        mineOver++;
        score.innerHTML = mineOver
    }
    if(mineOver == 0){
        alertBox.style.display = 'block';
        alertImage.style.backgroundImage = 'url("Image/Won.jpg")';
    }

}






















