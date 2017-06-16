var a=document.getElementsByTagName("button");
console.log(a)
a.onclick=function(){
    alert("有效吗")
}
console.log(2)

$("button").mouseover(function(){
    console.log("鼠标进入")
})