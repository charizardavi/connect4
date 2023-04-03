const globalGrid = document.getElementById("global-grid");
var boardChips = [];

for (let i = 0; i < 12; i++) {
  for (let j = 0; j < 12; j++) {
    const node = document.createElement("div");
    node.classList.add("grid-cell");
    node.id = j.toString() + "," + i.toString();
    console.log(node.id);
    node.innerHTML = node.id;
    globalGrid.appendChild(node);
  }
}

document.getElementById("header").innerHTML = "Player1";

var xpos = 0;

var player2 = false;

var rect = document.getElementById("1,1").getBoundingClientRect();
console.log((rect.right + rect.left) / 2);

var selector = document.getElementById("selector");
selector.style.width = 100;
// red.style.position = "absolute";
// red.style.top = document.getElementById("0,1").getBoundingClientRect().top;
// console.log(red.style.top);

function isValid(x, y, fileSrcInput){
  if(document.getElementById(x.toString()+","+y.toString()+"img").style.visibility == "visible" &&
  document.getElementById(x.toString()+","+y.toString()+"img").src.includes(fileSrcInput)){
    return true;
  }
  else{
    return false;
  }
}

function checkWin(fileSrc) {
  //horizontal
  for (let j = 0; j < 12 - 3; j++) {
    for (let i = 0; i < 12; i++) {
      if (
        isValid(i, j, fileSrc) &&
        isValid(i, j+1, fileSrc) &&
        isValid(i, j+2, fileSrc) &&
        isValid(i, j+3, fileSrc)
      ) {
        return true;
      }
    }
  }
  // verticalCheck
  for (let i = 0; i < 12 - 3; i++) {
    for (let j = 0; j < 12; j++) {
      if (
        isValid(i, j, fileSrc) &&
        isValid(i+1, j, fileSrc) &&
        isValid(i+2, j, fileSrc) &&
        isValid(i+3, j, fileSrc)
      ) {
        return true;
      }
    }
  }
  // ascendingDiagonalCheck
  for (let i = 3; i < 12; i++) {
    for (let j = 0; j < 12 - 3; j++) {
      if (
        isValid(i, j, fileSrc) &&
        isValid(i-1, j+1, fileSrc) &&
        isValid(i-2, j+2, fileSrc) &&
        isValid(i-3, j+3, fileSrc)
      )
        return true;
    }
  }
  // descendingDiagonalCheck
  for (let i = 3; i < 12; i++) {
    for (let j = 3; j < 12; j++) {
      if (
        isValid(i, j, fileSrc) &&
        isValid(i-1, j-1, fileSrc) &&
        isValid(i-2, j-2, fileSrc) &&
        isValid(i-3, j-3, fileSrc)
      )
        return true;
    }
  }
  return false;
}

for (let i = 0; i < 12; i++) {
  for (let j = 0; j < 12; j++) {
    var node = document.getElementById(j.toString() + "," + i.toString());
    if (node.id != null) {
      var currImg = document.createElement("img");
      currImg.id = j.toString() + "," + i.toString() + "img";

      currImg.src = "red.png";
      currImg.style.width = 50;
      document.getElementById("container").appendChild(currImg);

      currImg.style.position = "absolute";
      currImg.style.left = node.getBoundingClientRect().left + 40;
      currImg.style.top = node.getBoundingClientRect().top;
      currImg.style.visibility = "hidden";
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "KeyA" && player2) {
    xpos = xpos - 1;
    if (xpos < 0) {
      xpos = 0;
    }
    console.log("leftA");
    selector.style.position = "relative";
    selector.style.left = rect.left * xpos + 22;
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "KeyD" && player2) {
    xpos = xpos + 1;
    if (xpos > 11) {
      xpos = 11;
    }
    console.log("rightD");
    selector.style.position = "relative";
    selector.style.left = rect.left * xpos + 22;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight" && !player2) {
    xpos = xpos + 1;
    if (xpos > 11) {
      xpos = 11;
    }
    console.log("right");
    selector.style.position = "relative";
    selector.style.left = rect.left * xpos + 22;
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft" && !player2) {
    xpos = xpos - 1;
    if (xpos < 0) {
      xpos = 0;
    }
    console.log("right");
    selector.style.position = "relative";
    selector.style.left = rect.left * xpos + 22;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code == "Space" && player2 == false) {
    selector.src = "yellow.png";
    player2 = true;
    document.getElementById("header").innerHTML = "Player2";
  } else if (event.code == "Space" && player2 == true) {
    selector.src = "red.png";
    selector.style.top = document.getElementById("0,11").top;
    player2 = false;
    document.getElementById("header").innerHTML = "Player1";
  }

  if (event.code == "Space") {
    for (let i = 11; i >= 0; i = i - 1) {
      if (document.getElementById(xpos.toString()+","+i.toString()+"img").style.visibility == "hidden") {
        console.log("yeah" + xpos.toString() + "," + i.toString());
        document.getElementById(
          xpos.toString() + "," + i.toString() + "img"
        ).style.visibility = "visible";
        // document.getElementById(
        //   xpos.toString() + "," + i.toString() + "img"
        // ).src = red.src;
        if (selector.src.includes("yellow")) {
          document.getElementById(
            xpos.toString() + "," + i.toString() + "img"
          ).src = "red.png";
        } else {
          document.getElementById(
            xpos.toString() + "," + i.toString() + "img"
          ).src = "yellow.png";
        }
        break;
      }
    }
    if (checkWin("red.png") == true){
      window.location.replace("red_win.html");
    }
    else if (checkWin("yellow.png") == true){
      window.location.replace("yellow_win.html");
    }

    console.log(document.getElementById("0,11img").src);
  }
});


