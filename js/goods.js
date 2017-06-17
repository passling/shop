

    //$(".navi li a").click(function(){
    //    $(this).addClass("selected").siblings().removeClass("selected");
    //})
$(function(){
    var shopPath = 'http://friend.vipspace.top:8080/space-shop-web-1.0-SNAPSHOT';//商城
    var shopOther1Path = 'http://192.168.20.242:8086';//商城卖家提现

    var shopOtherPath = 'http://192.168.40.160:8080/space-account-web-1.0-SNAPSHOT';//账号  测试接口
    var spacePath = 'http://customer.vipspace.top:8083/collect-console-1.0-SNAPSHOT';//空间站
    var imagePath = 'http://friend.vipspace.top:8080/ar-console-1.0-SNAPSHOT';//图片
    var spaceMusicPath = 'http://customer.vipspace.top:8083/net-cache-helper-console-1.0-SNAPSHOT';//空间站音乐
    var spaceMusicSearchPath = 'http://customer.vipspace.top:8083/space-search-history-console-1.0-SNAPSHOT';//空间站音乐搜索


    var accountPath = shopOtherPath ;//账号
    var loginSpaceid = 0;//37226346681
    var tokenid = '';
    var spaceid=37226346680;

//读取cookies
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    }
// console.log(getCookie('loginspaceid'));
    loginSpaceid = getCookie('loginspaceid');
    tokenid = getCookie('tokenid');
    var spaceid = loginSpaceid;//

var store={
    init:function(){
        this.i=1;//分页
        this.pageNumber='';//标签id
        this.changeNav();
        this.changeStyle();
        this.getTitle(1);
        this.getScroll();
    },
    //点击导航
    changeNav:function(){
         $(".navi li a").each(function(){
             $(this).click(function(){
                 $(".navi li a").removeClass("selected")
                 $(this).addClass("selected");
             })
         })
     },
    //版面更改样式
    changeStyle:function(){
        var float=true;
        $(".checklist_icon").click(function(){
            if(float==true){
                $(".checklist_icon").attr('src','img/checklist-b@2x.png');
                $(".goods").attr('id','goods_col');
                float=false;
            }else{
                $(".checklist_icon").attr('src','img/checklist-a@2x.png');
                $(".goods").attr('id','goods_row');
                float=true;
            }
        })
},
    //获取标签
    getTitle:function(pageNumber){
        var that=this;
        $.ajax({
            url: shopPath+"/shop/prd/b/findPrdList",
            dataType:'json',
            data:{
                spaceid:37226346680,
                pageNumber:pageNumber,
                pageSize:10
            },
            success:function(res){
                console.log(res);
                var result=res.data;
                var div='';
                for(var i=0;i<result.length;i++){
                    div+='<div class="goods" id="goods_row">'+
                        '<div class="goods_img">'+'<img src=" '+result[i].coverImgurl+'" alt="">'+'</div>'+
                        '<div class="goods_details_box1">'+
                        '<div class="product_details">'+
                        '<p class="product_description">'+
                        result[i].productName+
                        '</p>'+
                        ' <p class="product_adds">'+ result[i].deliverAddress+
                        '</p>'+
                        '<img src="img/baoyou.png" class="poster">'+
                        '</img>'+
                        '<span class="goods_price_icon">￥</span>'+
                        '<span class="goods_price">'+result[i].salePrice +
                        '</span>'+'<span class="people">'+
                        result[i].salesVolume+
                        '</span>'+
                        '<span class="pay">付款</span>'+
                        '<span class="cart"></span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'
                }
                $(".products").append(div);

            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
            }
        })
    },
    //滚动条滚动 获取新内容
    getScroll:function(){
        $(window).scroll(function(){
            var that=this;
            var scrollTop=parseInt($(this).scrollTop());
            var scrollHeight=$(document).height();
            var windowHeight=$(this).height();
            console.log(windowHeight)
            if(scrollTop+windowHeight==scrollHeight){
                this.i=this.i;
               store.getTitle(2)


            }
        })
    }

};

    store.init();


})
