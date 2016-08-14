$('#next').click(function() {
	if($('#agree').prop('checked'))
		window.location.href="info.html";
	else
		alert('请阅读该提示');
})