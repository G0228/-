function Magnifier(){
            
        };

        //初始化函数,获取元素以及将遮罩位置初始化
        Magnifier.prototype.init=function(){
            this.cover=document.querySelector("#cover");
            this.box1=document.querySelector("#box1");
            this.box2=document.querySelector("#box2");
            this.box3=document.querySelector("#box3");
            this.cover.position={
                offsetX:0,
                offsetY:0
            };
            this.handleEvent();
        };

        //事件绑定函数,绑定鼠标移入、事件
        Magnifier.prototype.handleEvent=function(){
            this.box1.onmousemove=function(event){
                this.cover.style.display="block";
                var evt=event||window.event;
                this.cover.position={
                    offsetX:evt.offsetX,
                    offsetY:evt.offsetY
                }

                //将鼠标位置设置为遮罩的中心
                this.cover.move={
                    moveX:this.cover.position.offsetX-Math.round(this.cover.offsetWidth/2),
                    moveY:this.cover.position.offsetY-Math.round(this.cover.offsetHeight/2)
                }
                this.CoverMove();
                this.Show();
                this.BorderTest();
                this.PicMove();
            }.bind(this)
            this.box1.onmouseout=function(){
                this.Hide();
            }.bind(this)
        };

        //半透明遮罩移动函数
        Magnifier.prototype.CoverMove=function(){
            this.cover.style.left=this.cover.move.moveX+"px";
            this.cover.style.top=this.cover.move.moveY+"px";
            this.BorderTest();
        };

        //右侧图片移动函数
        Magnifier.prototype.PicMove=function(){
            
            //大图的left/遮罩的left = 大图宽度/小图宽度
            var imgleft=Math.round(this.box3.offsetWidth/this.box1.offsetWidth*parseInt(this.cover.style.left));
            var imgtop=Math.round(this.box3.offsetHeight/this.box1.offsetHeight*parseInt(this.cover.style.top));
            this.box3.style.left=-imgleft+"px";
            this.box3.style.top=-imgtop+"px";
        };

        //边界检测函数
        Magnifier.prototype.BorderTest=function(){
            if(this.cover.move.moveX>=this.box1.offsetWidth-this.cover.offsetWidth){
                this.cover.style.left=this.box1.offsetWidth-this.cover.offsetWidth+"px";
            }
            if(this.cover.move.moveX<=0){
                this.cover.style.left=0;
            }
            if(this.cover.move.moveY<=0){
                this.cover.style.top=0;
            }
            if(this.cover.move.moveY>=this.box1.offsetHeight-this.cover.offsetHeight){
                this.cover.style.top=this.box1.offsetHeight-this.cover.offsetHeight+"px";
            }
        };

        //图片隐藏
        Magnifier.prototype.Hide=function(){
            this.cover.style.display="none";
            this.box2.style.display="none";
        }

        //图片显示
        Magnifier.prototype.Show=function(){
            this.box2.style.display="block";
        }
        var magnifier=new Magnifier();
        magnifier.init();