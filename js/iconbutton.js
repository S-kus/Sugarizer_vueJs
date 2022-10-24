const IconButton ={
	name: 'IconButton',
	template: `<div :class="this.disabledData? 'web-activity-disable icon-button': 'icon-button'"
				v-on:click="this.buttonClicked">
				<button-icon v-if="this.iconData"
					class="icon-button-icon"
					:key="componentKey"
					:id=this.id
					:svgfile=this.iconData
					:color=this.color
					:size=this.size
					:x=this.x
					:y=this.y
				></button-icon>
				<p class="icon-button-text">{{ this.textData }}</p>
			</div>`,
	props: {
		// button label
		text: String,
		// input for icon
		id: String,
		svgfile: String,
		color: String,
		size: String,
		x: String,
		y: String,
		// button's disablity condition
		disabled: Boolean,
		// function needed to performed when this button is clicked
		clickFunction: { type: Function },
	},
	// for icons
	components: {
		'button-icon': Icon, 
	},
	data() {
		return {
			// icon file url
			iconData: this.svgfile,
			// button label prop data
			textData: this.text? this.text: '',
			// conditional data of "disabled" prop
			disabledData: this.disabled? this.disabled: false,
			// key for icon component
			componentKey: 0,
		}
	},
	// updates data values
	watch: {
		textData: function(newText, oldText) {
			this.textData = newText
		},
		disabledData: function(newVal, oldVal) {
			this.disabledData = newVal
		},
		iconData: function(newIcon, oldIcon) {
			this.iconData= newIcon
			this.componentKey=! this.componentKey;
		}
	},
	methods: {
		// excute prop function if button clicked
		buttonClicked() {
			this.clickFunction();
		}
	}
};

if (typeof module !== 'undefined') module.exports = { IconButton }