/**
 * @module Dialog
 * @desc This is an modal component for different settings
 */

 const Dialog ={
	name: 'Dialog',
	template: `
		<div v-if="showDialog" class="modal-overlay" @click="cancelClicked">
			<div class="modal" @click.stop>
				<div class="dialog-content">
					<div class="toolbar">
						<div v-if="iconData" class="module-icon">
							<icon id="37" :svgfile="this.iconData" color="256" x="4" y="4" size="40"
						></icon></div>
						<div v-if="titleData" class="module-text">{{titleData}}</div>
						<search-field class="settings-filter-text"
							v-if="searchField=='true'"
							placeholder="Search in settings"
							v-on:input-changed="searchSettings($event)"
						></search-field>
						<div v-if="cancelButton=='true'" class="toolbutton module-cancel-button" @click="cancelClicked"></div>
						<div v-if="okButton=='true'" class="toolbutton module-ok-button" @click="okClicked"></div>
					</div>
					<slot></slot>
				</div>	
			</div>
		</div>
	`,
	props: ['searchField', 'okButton', 'cancelButton', 'iconData', 'titleData'],
	components: {
		'icon': Icon, 
		'search-field': SearchField,
	},
	data() {
		return {
			showDialog: false,
		}
	},
	methods: {
		cancelClicked() {
			this.$emit('onCancel');
		},
		okClicked() {
			this.$emit('onOk');
		},
		searchSettings(query) {
			this.$emit('searchInput',query)
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Dialog }