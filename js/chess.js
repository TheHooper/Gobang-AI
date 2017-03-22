var chess = $("#chess");
var context = chess[0].getContext('2d');

var chessWidth = chess.attr("width").replace("px","");
var chessHeight = chess.attr("height").replace("px","");
var chessPadding = 15;//
var gridNum = 15;
var chessGap = (chessWidth - chessPadding * 2) / gridNum;

context.strokeStyle = "#BFBFBF" ;

var background = new Image();
background.src = "images/background.jpg";
background.onload = function () {

    context.globalAlpha = 0.5;//添加透明度 0.2
    context.drawImage(background,80,140,320,200);

    context.globalAlpha = 1;
    drawLine();

}

function chessmanDown(gridX,gridY,colorToggle) {
    context.beginPath();
    context.arc(chessPadding + gridX*chessGap,chessPadding + gridY*chessGap,12,0,2*Math.PI);// gridX，gridY，半径,弧度
    context.closePath();
    var gradient = context.createRadialGradient(
        chessPadding + gridX*chessGap + 2,chessPadding + gridY*chessGap - 2,
        12,chessPadding + gridX*chessGap,chessPadding + gridY*chessGap,0);
    if(colorToggle){
        gradient.addColorStop(0,"#0A0A0A");
        gradient.addColorStop(1,"#636766");
    }else{
        gradient.addColorStop(0,"#e1e1e1");
        gradient.addColorStop(1,"#fcfcfc");
    }

    context.fillStyle = gradient;
    context.fill();
}


function drawLine() {
    for(var i=0 ; i<= gridNum ; i++){
        context.moveTo(chessPadding + i*chessGap,chessPadding);
        context.lineTo(chessPadding + i*chessGap,chessWidth-chessPadding);
        context.stroke();
        context.moveTo(chessPadding,chessPadding + i*chessGap) ;
        context.lineTo(chessHeight-chessPadding,chessPadding + i*chessGap);
        context.stroke();
    }

}

var chessBoard = [];
for(var i=0; i<gridNum+1 ; i++){
    chessBoard[i] = [];
    for(var j=0 ; j<gridNum+1 ; j++){
        chessBoard[i][j] = "-";
    }
}
var isMe = true;

chess[0].onclick = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var gridX = Math.floor(x / chessGap);
    var gridY = Math.floor(y / chessGap);
    if(chessBoard[gridX][gridY] == "-"){
        chessmanDown(gridX,gridY,isMe);
        if(isMe){
            chessBoard[gridX][gridY] = "X";
        }else{
            chessBoard[gridX][gridY] = "O"
        }
    }
    chessmanDown(gridX,gridY,isMe);
    isMe = !isMe;
}

function chessBoardInfo() {
    var info = "";
    for(var i=0; i<gridNum+1 ; i++){
        for(var j=0 ; j<gridNum+1 ; j++){
            info +=  chessBoard[j][i] + " ";
        }
        info +=  "\n";
    }
    console.log(info);
}

