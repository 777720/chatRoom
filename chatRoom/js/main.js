$(function(){
	//页面加载完执行
	if(document.referrer==""||document.referrer==null){
		//用户直接访问的mian.html
		window.location.href="login.html";
	}
	
	//获取用户 
	setInterval(getUsers,1000);
	function getUsers(){
		//1.显示线上人数，即数据库中有多少个数据
		//2.房间成员，将数据库中的用户名显示
		$.ajax({
			type:"post",
			url:"server.php",
			async:true,
			data:{
				"type":"getUsers"
			},
			success:function(data){
				//前台展示需求1.需要几个用户  2.每个用户的用户名
				var data=JSON.parse(data);
			
				$("#online_member").html(data["count"]);
				var names =data["names"];
				var str="";
				for (var i=0;i<names.length;i++) {
					str+="<p><img src='img/qq.png'>"+names[i]+"</p>";
				}
				$("#membership").html(str);
			}
		});
		
		
	}
	/*发送信息*/
		$("#aside_down_right").click(function(){
			//msg：要发送的信息
			var msg=$("#message").val();
			//name:当前登录用户
			var name=sessionStorage.getItem(name);
			//time：时间戳
			var time=new Date().getTime();
			$.ajax({
				type:"post",
				url:"server.php",
				async:true,
				data:{
					"type":"sendMsg",
					"name":name,
					"msg":msg,
					"time":time,
				},
				success:function(data){
					if(data=="true"){
						//清空输入框
						$("#message").val("");
					}
				}
			});
		});
	
	
})
