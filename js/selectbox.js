const SelectBox ={
	name: 'SelectBox',
	template: `
		<div ref="selectBox" class="selectbox-border" v-if="optionsData">
			<div class="selectbox-bar" v-on:click="showPopup($event)" v-if="this.selectedData">
				<icon class="selectbox-icon"
					:key="this.iconKey"
					:id="'optionsData.id'+selectedData.icon.id"
					:svgfile=selectedData.icon.iconData
					:color=selectedData.icon.color
					:size=selectedData.icon.size
					:x=selectedData.icon.iconx
					:y=selectedData.icon.icony
				></icon>
				<div class="selectbox-text">{{ selectedData.name }}</div>
				<div class="selectbox-arrow"></div>
			</div>
			<popup ref="selectboxPopup" 
				class="selectbox-popup"
				:key="this.popupKey" 
				v-show="this.showselectBox"
				:item="this.optionsData"
				v-on:mouseleave="removePopup($event)"
				v-on:itemis-clicked="optionisSelected($event)"
			></popup>
		</div>
	`,
	// stores data ([object]) of options to be displayed in popup and 
	// the default data value to shown in select-bar
	props: ['options'],
	components: {
		// for displaying options data
		'popup': Popup, 
		// for diffrenet icons
		'icon': Icon
	},
	data() {
		return {
			// stores options prop
			optionsData: this.options? this.options: null,
			// stores select-bar data object value
			selectedData: {
				icon: this.options? this.options.icon: null,
				name: this.options? this.options.name: null,
			},
			// condition to display popup
			showselectBox: false,
			// left position of popup
			xData: null,
			// top position of popup
			yData: null,
			// key for the popup component
			popupKey: 0,
			// key for the icon component
			iconKey: 0
		}
	},
	watch: {
		optionsData: function(newData, oldData) {
			this.optionsData = newData
		},
	},
	methods: {
		// check for the cursor position and call hide() of popup component 
		removePopup(e) {
			if(!this.$refs.selectboxPopup.isCursorInside(e.clientX, e.clientY)){
				this.$refs.selectboxPopup.hide();
				this.showselectBox= false;
				// re-render popup component with updated value
				this.popupKey= !this.popupKey;
			}
		},
		// set the select-bar data and emit optionSelected with the selected option
		// it's excuted on the emit "itemis-clicked" from popup component
		optionisSelected(str) {
			const selectedDataName = str.split('_').pop();
			if(this.optionsData.name==selectedDataName) {
				this.selectedData= {
					icon: this.optionsData.icon,
					name: this.optionsData.name
				}
			} else {
				var item = this.optionsData.itemList.filter((item) => {
					return item.name==selectedDataName;
				})
				this.selectedData= {
					icon: item[0].icon,
					name: item[0].name
				}
			}
			this.showselectBox= false;
			this.iconKey= !this.iconKey;
			this.popupKey= !this.popupKey;
			this.$emit('optionSelected',this.selectedData);
		},
		// get the top and left offset of select-box and 
		// call show(x,y) of popup component with positions as parameter of popup
		showPopup(e) {
			if(this.showselectBox) {
				this.showselectBox= false;
				return;
			}
			var offsets = this.$refs.selectBox.getBoundingClientRect();
			var top = offsets.top;
			var left = offsets.left;
			var x, y;
			y= top- 18;
			x= left+ 8;
			this.$refs.selectboxPopup.show(x,y);
			this.showselectBox= true;
		}
	}
};

if (typeof module !== 'undefined') module.exports = { SelectBox }