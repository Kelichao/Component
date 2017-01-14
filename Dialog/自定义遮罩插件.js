/*
*kelichao
*jq_mask  自定义遮罩插件
*20160311   ifind
*参数说明
*color       //遮罩内部字体颜色
*fontSize    //遮罩内部字体大小
*text        //遮罩内部文字
*option      //遮罩透明度
*show        //是否生成后直接展示
*top         //距离顶部的高度
*/
$("docoment").ready(function(){

    MaskLayer = function(obj,opts){
        this.obj=$(obj) || $("docoment");
        this.opts=$.extend({},MaskLayer.DEFAULTS,opts); 
        this._define();
    };
    //内部原型方法，外部不能访问
    MaskLayer.prototype._define = function(){   
        var opts=this.opts; 
        var $obj=this.obj;         
        //默认配置
            $obj.height($(document).height());
            $obj.css({
                "width":"100%",
                "background":"rgba(120,120,120,"+opts.option+")",
                "position":" absolute",
                "left":"0",
                "top":"0",
                "z-index":" 10000",
                "display":opts.show
            });

            var perValue='<div class="pos"><span class="sp">'+opts.text+'</span></div>';
            $obj.append(perValue);
            $(".pos").css({"position":"relative","width":"100%"});
            $(".sp").css({
                "display":" block",
                "z-index":" 10001",
                "opacity":"1",
                "position":"",
                "color":opts.color,
                "background":"rgba(53,53,53,0.2)",
                "margin":"0 auto",
                "width":"160px",
                "height":"30px",
                "line-height":" 30px",
                "text-align":" center",
                "font-family":" 微软雅黑",
                "border-radius":" 3px",
                "margin-top":opts.top,
                "font-size":"16px",
            });
         }
         //默认参数
         MaskLayer.DEFAULTS={
            color:"white",            //遮罩内部字体颜色
            fontSize:"16px",          //遮罩内部字体大小
            text:"正在努力加载中...", //遮罩内部文字
            option:0.1,               //遮罩透明度
            show:"none",              //是否生成后直接展示
            top:"240px",              //距离顶部的高度
         };
         $.fn.extend({
            mask:function(opts){
                return this.each(function(){
                    new MaskLayer(this,opts);
                });
            }
         });
         // $(".mask").mask();
         //初始调用方式
         //$(".mask").show();
         //new MaskLayer($(".mask"),{
         //   text:"正在努力加载中..."
         //});
         //mask._define();  
       // $(".mask").mask();
       // $(".mask").show();
});
