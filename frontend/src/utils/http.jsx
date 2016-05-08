
var $ = require('jquery');



var get = function(url){
	return $.ajax({
		url : url,
		type : 'GET',
		dataType : 'json',
		cache : false,
		contentType:"application/json"
	})
}

var post = function(url, data){
//	return $.post(url, data);
	return $.ajax({
				url : url,
				type : 'POST',
				contentType:"application/json",
				data : JSON.stringify(data)
			})
}

var del = function(url){
	return $.ajax({
		url : url,
		type : 'DELETE'
	})
}

var put = function(url, data){
	return $.ajax({
		type: 'PUT',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url : url
	})
}

module.exports = {
	get : get,
	post : post,
	del : del,
	put : put
}