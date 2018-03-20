//取得节点，并初始化数组。
var dm_submit = document.querySelector(".dm_submit");
var dm_txt = document.querySelector(".dm_txt");
var dm_screen = document.querySelector(".dm_screen");
var dm_delete = document.querySelector(".dm_delete");
var arr = [];

//在整个页面加载完成之后，再令函数生效。
window.addEventListener("load", function() {
  
  //初始化wilddog。
  var config = {
    authDomain : "wd2201329602elrrgv.wilddog.com" ,
    syncURL : "https://wd2201329602elrrgv.wilddogio.com"
  };
  wilddog.initializeApp(config);
  var ref = wilddog.sync().ref("/web/saving-data/wildblog/users/message");
  
  //对发送按钮增加监听事件，当点击时，将输入框中的文字上传到wilddog云端，同时清空输入框。  
  dm_submit.addEventListener("click", function() {
    if (dm_txt.value !== "") {
      ref.child("message").push(dm_txt.value);
      dm_txt.value = "";
    }
  })
  
  //对清屏按钮增加监听事件，当点击时，删除所有wilddog云端的子节点，并将屏幕清空。
  dm_delete.addEventListener("click", function() {
    ref.child("message").remove();
    arr = [];
    while(dm_screen.firstChild) {
      dm_screen.removeChild(dm_screen.firstChild);
    }
  })    
  
  //监听wilddog云端的message，当有子节点添加时，将该子节点输出到dm_screen上。
  ref.child("message").on("child_added", function(snapshot) {
    var submitTxt = snapshot.val();
    arr.push(submitTxt);
    initialFunc(arr);
  })

  //初始化函数，从本地数组中随机抽取一个字符串，并初始化该字符串的颜色，高度，运动时间等。
  var initialFunc = function(arr) {
    var div = document.createElement("div");
    var number = Math.floor(Math.random() * arr.length);
    div.innerHTML = arr[number];
    div.className = "dm_message";
    var left_total = getAttr(dm_screen, "width") + 20;
    var top_total = getAttr(dm_screen, "height") - 46;
    div.style.left = left_total + "px";
    div.style.top = 30 + Math.random() * top_total + "px";
    div.style.color = randomColor();
    dm_screen.appendChild(div);
    var time = 10000 + Math.random() * 10000;
    var speed = left_total / time;
    moveObj(div, speed);
    //该处按照题目要求，本来应该设置一个多次循环的setInterval，未设置。
  };
  
  //生成并返回随机颜色。
  var randomColor = function() {
    return "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
  }
  
  //自编的属性获得函数，输入参数为element和property，输出参数为可以直接参与运算的数值，无单位。
  var getAttr = function(element, property) {
    return parseInt(window.getComputedStyle(element, null).getPropertyValue(property));
  };
  
  //为弹幕设定运动时间，起始和结束的位置，以及弹幕的颜色。
  var moveObj = function(element, speed) {
    var left = getAttr(element, "left");
    if (left - speed * 30 < 0) {
      dm_screen.removeChild(element);
    } else {
      element.style.left = left - speed * 30 + "px";
      window.setTimeout(moveObj, 30, element, speed);
    }
  };
})