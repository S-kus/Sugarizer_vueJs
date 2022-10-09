const Popup ={
	name: 'Popup',
	template: `<div>
					<p>Current Activity: {{this.activity}}</p>
				</div>`,
	props: ['activity'],
	data() {
		return {
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Popup }