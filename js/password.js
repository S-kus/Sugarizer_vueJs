const Password ={
	name: 'Password',
	template: `<h2>{{text}}</h2>`,
	props: ['text'],
	data() {
		return {
			
		}
	},
};

if (typeof module !== 'undefined') module.exports = { Password }