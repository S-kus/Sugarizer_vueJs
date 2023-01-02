/**
 * @module Dialog
 * @desc This is an modal component for different settings
 */

 const Dialog ={
	name: 'Dialog',
	template: `
			<div>
				<p><slot></slot></p>
			</div>
		`
	,
	components: {
		
	},
	data() {
		return {
			showDialog: false,
			settingsData: ['About me', 'About my computer', 'About my server', 'My privacy', 'My security', 'Language'],
			filtersettings: null,
			activeBox: 'dialog'
		}
	},
	mounted() {
		this.filtersettings=this.settingsData
	},
	watch: {
		filtersettings: function(newData, oldData) {
			this.filtersettings= newData
		}, 
	},
	methods: {
		closeModal() {
			this.activeBox='dialog';
			this.showDialog= false;
		},
		searchSettings(searchInput) {
			this.filtersettings = this.settingsData.filter((setting) => {
				return setting.toUpperCase().includes(searchInput.toUpperCase())
			})
		},
		moduleClicked(moduleVal) {
			this.activeBox=moduleVal
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Dialog, AboutMyComputer }