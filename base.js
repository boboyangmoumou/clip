window.onload=function(){
    var main=document.getElementById("main");
    var box=document.getElementById("box");
    var mainbox=document.getElementById("mainbox");
    var left=document.getElementById("left");
    var key=false;//鼠标按下状态
    var contact = "";//表示被按下的触点

    left.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        contact="left";
    }

    //鼠标松开事件
    window.onmouseup = function(){
        key= false;
    }

    //鼠标移动事件
    window.onmousemove=function(e){
        if(key==true){
            switch (contact){
                case "left": leftmove(e);break;
            }
        }
    }

    //leftmove
    function leftmove(e){
        var x=e.clientX;
        var mainX = local(box).left;
        var addWidth = mainX-x; //增加的宽度
        var widthbefore=box.offsetWidth-2;//原来的宽度
        box.style.width= widthbefore+addWidth+"px";
        box.style.left=box.offsetLeft-addWidth+"px";
    }
    //获取元素相对于屏幕左边的距离
    function local(item){
        var left=item.offsetLeft;
        var top=item.offsetTop;
        var parent=item.offsetParent;//元素最近的经过定位(position不等于static)的父级元素
        while(parent != null){
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent=parent.offsetParent;
        }
        return {"left":left,"top":top};
    }


    //选中区域
    // function choose(){
    //     var top=box.offsetTop;
    //     var right=box.offsetLeft+box.offsetWidth;
    //     var bottom=box.offsetTop+box.offsetHeight;
    //     var left=box.offsetLeft;
    //     var img2=document.getElementById("img2");
    //     img2.style.clip="rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
    // }

};