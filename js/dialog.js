/**
 * @module Dialog
 * @desc This is an modal component for different settings
 */
 const Dialog ={
	name: 'Dialog',
	template: `
		<div v-if="showDialog" class="modal-overlay" @click="closeModal">
			<div v-if="activeBox=='dialog'" class="settings-dialog" @click.stop>
				<div class="toolbar">
					<search-field class="settings-filter-text"
						placeholder="Search in settings"
						v-on:input-changed="searchSettings($event)"
					></search-field>
					<div class="toolbutton settings-close-button" @click="closeModal"></div>
				</div>
				<div class="dialog-items">
					<div :class="(filtersettings.find(v => ('About me').includes(v))) ? '' :'dialog-item-disable'">
						<div class="dialog-icon">
							<icon id="31" svgfile="icons/owner-icon.svg" color="256" size="75"
						></icon></div>
						<div class="dialog-item-text">About me</div>
					</div>
					<div :class="(filtersettings.find(v => ('About my computer').includes(v))) ? '' :'dialog-item-disable'">
						<div class="dialog-icon">
							<icon id="32" svgfile="icons/module-about_my_computer.svg" color="256" size="75" is-native="true"
						></icon></div>
						<div class="dialog-item-text">About my computer</div>
					</div>
					<div :class="(filtersettings.find(v => ('About my server').includes(v))) ? '' :'dialog-item-disable'">
						<div class="dialog-icon">
							<icon id="33" svgfile="icons/cloud-settings.svg" color="256" size="75" is-native="true"
						></icon></div>
						<div class="dialog-item-text">About my server</div>
					</div>
					<div :class="(filtersettings.find(v => ('My privacy').includes(v))) ? '' :'dialog-item-disable'">
						<div class="dialog-icon">
							<icon id="34" svgfile="icons/login-icon.svg" color="256" size="75" is-native="true"
						></icon></div>
						<div class="dialog-item-text">My privacy</div>
					</div>
					<div :class="(filtersettings.find(v => ('My security').includes(v))) ? '' :'dialog-item-disable'">
						<div class="dialog-icon">
							<icon id="35" svgfile="icons/privacy.svg" color="256" size="75" is-native="true"
						></icon></div>
						<div class="dialog-item-text">My security</div>
					</div>
					<div :class="(filtersettings.find(v => ('Language').includes(v))) ? '' :'dialog-item-disable'">
						<div class="dialog-icon">
							<icon id="36" svgfile="icons/module-language.svg" color="256" size="75" is-native="true"
						></icon></div>
						<div class="dialog-item-text">Language</div>
					</div>
				</div>
			</div>
		</div>
	`,
	components: {
		'icon': Icon, 
		'icon-button': IconButton,
		'search-field': SearchField,
		'select-box': SelectBox,
		'password': Password,
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
			this.showDialog= false;
		},
		searchSettings(searchInput) {
			this.filtersettings = this.settingsData.filter((setting) => {
				return setting.toUpperCase().includes(searchInput.toUpperCase())
			})
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Dialog }