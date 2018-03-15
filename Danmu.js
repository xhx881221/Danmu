var dm_submit = document.querySelector(".dm_submit");
var dm_txt = document.querySelector(".dm_txt");
var dm_screen = document.querySelector(".dm_screen");
var dm_delete = document.querySelector(".dm_delete");
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
    while(dm_screen.firstChild) {
      dm_screen.removeChild(dm_screen.firstChild);
    }
  })    
  
  //监听wilddog云端的message，当有子节点添加时，将该子节点输出到dm_screen上。
  ref.child("message").on("child_added", function(snapshot) {
    var submitTxt = snapshot.val();
    var div = document.createElement("div");
    div.innerHTML = submitTxt;
    div.className = "dm_message";
    moveObj(div);
  })
  
  //为弹幕设定运动时间，起始和结束的位置，以及弹幕的颜色。
  var moveObj = function(element) {
    var dm_message = document.querySelector(".dm_message");
    
  };
})