

exports.practice = function(user, move, callback){

	move_out = {
		'狩獵野兔' : getRndInteger(15, 20),
		'自主訓練' : 15,
		'外出野餐' : getRndInteger(13, 20),
		'汁妹'	  : 16,
		'坐下休息' : 15,
		'做善事'	  : 18,
		'釣魚' 	  : 15
	}

	if (!move_out.hasOwnProperty(move)){
		callback('沒有這個行動！')
	}else{
		var e = move_out[move]
		msg = `${user}行動成功！獲得了 ${e} 點經驗值`
		var level = Math.random() < 0.1
		if (level){
			msg = msg.concat(`，等級已提升！能力變化如下：\nHP +30\n攻擊 +2\n防禦 +3\n體力 +3\n敏捷 +2\n反應速度 +1\n技巧 +3\n智力 +3\n幸運 +2\n`)
		}
		var sun = Math.random() < 0.05
		if (sun && move=='汁妹'){
			msg = msg.concat(`\n你已解鎖新角色 天野陽菜 可在下次轉生時使用`)
		}		
		callback(msg)
	}
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}