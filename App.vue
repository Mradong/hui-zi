<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	body,html{
		width: 100%;
		height: 100%;
		margin: 0;
		padding:0;
	}
	body{margin:0;padding:0;font-size:14px;line-height:22px;  font-family:"微软雅黑"; color:#3e3938;-webkit-text-size-adjust:none;}
	body, div, p, h1, h2, h3, h4, h5, h6, ul, ol, li, dl, dd, dt, img, form { padding:0px; margin:0px; border:0; font-size:14px; }
	.clear{clear:both;}
	a:link, a:visited { text-decoration:none; }
	a:hover { text-decoration:none;} 
	a:focus { outline:none; }
	a{text-decoration:none; blr:expression(this.onFocus=this.blur());}
	a{outline:none;}
	ul, ol li { list-style:none; }
	.fr{float: right;}
	.fl{float: left;}
</style>
