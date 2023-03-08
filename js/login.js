
/**
 * @module Login
 * @desc This is an icon component for both native and simple SVG icons
 * @vue-prop {String} svgfile - Url of svg file
 * @vue-prop {String} content - whether we are using it for login or signup
*/
const Login ={
	name: 'Login',
	template: `<div class="login" ref="login">
	          <img :src="svgfile" alt="login" class="login-image">
			 <p class="login-text">{{contentData}}</p>
	</div>`,
	props: ['svgfile','color','size','content'],
	data() {
		return {
			contentData: this.content,
			svgfile: this.svgfile,
		}
	},
	
};

if (typeof module !== 'undefined') module.exports = { Login }