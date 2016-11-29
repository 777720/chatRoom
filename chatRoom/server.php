<?php
  $type = $_POST["type"];//获取前台传过的type，通过判断type值，确定执行哪个方法
  
  if($type){
  	//执行登录操作
  	if($type == "login"){
  		$flag = null;
  		$name = $_POST["username"];
  		$pass = $_POST["pwd"];
  		$json_file = file_get_contents("user.json");//将json文件读取成字符串
  		//将$json_file转化为数组
  		$json_arr = json_decode($json_file,true);//true 是否转化为数组，如果不是true，则转化成的是object
  		for($i = 0; $i < count($json_arr);$i++){
  			//$json_arr[$i]   json
  			if($json_arr[$i]["name"] == $name && $json_arr[$i]["psd"] == $pass){
  				$flag = "true";
  			}
  		}
  		
  		echo $flag;
  	}
  	/*获取房间成员*/
  	if($type == "getUsers"){
	  		$json_file = file_get_contents("user.json");//读取用户表
	  		$json_arr = json_decode($json_file,true);//将json转化为数组
	  		//$arr = array();
	  		//数组的个数
	  		$arr["count"] = count($json_arr); 		//"count":2
	  																					// "names" null
	  		//数组内元素的名字
				for($i = 0; $i < count($json_arr);$i++){ // "names" 0 "admin"
																									// "names" 1 "admin1"
						$arr["names"][$i] = $json_arr[$i]["name"];
				}
		  	echo json_encode($arr);//将数组转成json传递到前台
	  	
  		}
  	
///*发送信息*/
	if($type == "sendMsg"){
			//1.取前台传递数据
			$name = $_POST["name"];
			$msg = $_POST["msg"];
			$time = $_POST["time"];
			//2.读取数据库中值
			$json_file = file_get_contents("msg.json");
			$json_arr = json_decode($json_file,true);
			//3.将前台传递数据组合成数组
			$arr = array("name"=>$name,"msg"=>$msg,"time"=>$time);
			//4.合并数组
			array_push($json_arr,$arr);
			//5.将新数组json解析后插入到msg.json中 file_put_contents
			file_put_contents("msg.json",json_encode($json_arr));
			echo "true";
		}	
		if($type == "showMsg"){
			//给前台传递msg.json里最后一条记录数据，无需将数据表中所有记录都查到
			$json_file = file_get_contents("msg.json");
			$json_arr = json_decode($json_file,true);
			if(count($json_arr) != 0){
				echo json_encode($json_arr[count($json_arr)-1]);
			}
			
		}	
	
	/*判断用户名是否存在*/
	if($type == "checkUser"){
			$flag = null;
			$name = $_POST["username"];
			$json_file = file_get_contents("user.json");
			$json_arr = json_decode($json_file,true);
			for($i = 0; $i < count($json_arr);$i++){
					if($json_arr[$i]["name"] == $name){
						$flag = "true";
						break;
					}
					
			}
			echo $flag;
	}

  }
?>