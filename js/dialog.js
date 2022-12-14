/**
 * @module Dialog
 * @desc This is an modal component for different settings
 */

 const AboutMyComputer= {
	name: 'AboutMyComputer',
	template: `
		<div class="module-dialog">
			<div class="toolbar">
				<div class="module-icon">
					<icon id="37" svgfile="icons/module-about_my_computer.svg" color="256" x="4" y="4" size="40" is-native="true"
				></icon></div>
				<div class="module-text">About my computer</div>
				<div class="toolbutton module-cancel-button" @click="cancelClicked"></div>
				<div class="toolbutton module-ok-button" @click="okClicked"></div>
			</div>
			<div class="computer-content">
				<div class="computer-software">Software</div>
				<div>
					<div class="computer-sugarizer">Sugarizer:</div>
					<div class="computer-value">{{computerData.sugarizerVersion}}</div>
				</div>
				<div>
					<div class="computer-clienttype">Client type:</div>
					<div class="computer-value">{{computerData.clientName}}</div>
				</div>
				<div>
					<div class="computer-browser">Browser:</div>
					<div class="computer-value">{{computerData.browser}}</div>
				</div>
				<div>
					<div class="computer-browserversion">Browser version:</div>
					<div class="computer-value">{{computerData.browserVersion}}</div>
				</div>
				<div>
					<div class="computer-useragent">User Agent:</div>
					<div class="computer-value">{{computerData.useragent}}</div>
				</div>
				<div>
					<div class="computer-storage">Storage:</div>
					<div class="computer-value">{{computerData.storage}}</div>
				</div>
				<div class="computer-copyright">Copyright and license</div>
				<div class="computer-contributor">© 2013-2022 Lionel Laské, Sugar Labs Inc and </div>
				<div class="computer-contributor-link" :href="this.contributorsUrl">contributors</div>
				<div class="computer-licence">Sugarizer is an open source software licensed under the Apache 2.0 license.</div>
				<div class="computer-licence">Most activities use this license too but some could use a different license, check the README file for more information.</div>
			</div>
		</div>
	`,
	components: {
		'icon': Icon
	},
	data() {
		return {
			computerData: {},
			contributorsUrl: "https://github.com/llaske/sugarizer/blob/dev/docs/credits.md"
		}
	},
	mounted() {
		this.computerData= this.getComputerData();
	},
	methods: {
		getComputerData() {
			let computerDetails={};
			// code to get computer details and return as object

			// setting dummy data
			computerDetails= {
				sugarizerVersion: "0.0.1",
				clientName: "User Name",
				browser: "Firefox",
				browserVersion: "107.0",
				useragent: "xxx",
				storage: "27994 bytes - 27 Kb"
			}
			return computerDetails;
		},
		cancelClicked() {
			this.$root.$refs.dialogModal.activeBox= 'dialog'
			// this.show= false;
		},
		okClicked() {
			this.$root.$refs.dialogModal.activeBox= 'dialog'
		}
	}
}

 const Dialog ={
	name: 'Dialog',
	template: `
		<div v-if="showDialog" class="modal-overlay" @click="closeModal">
			<div class="modal" @click.stop>
				<div class="settings-dialog" v-if="activeBox=='dialog'">
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
							<div class="dialog-icon" @click="moduleClicked('aboutmycomputer')">
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
				<about-my-computer v-if="activeBox=='aboutmycomputer'"></about-my-computer>
			</div>
		</div>
	`,
	components: {
		'icon': Icon, 
		'icon-button': IconButton,
		'search-field': SearchField,
		'select-box': SelectBox,
		'password': Password,
		'about-my-computer': AboutMyComputer
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