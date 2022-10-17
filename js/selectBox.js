const SelectBox ={
	name: 'SelectBox',
	template: `
		<div class="selectbox-border" v-if="optionsData">
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
	props: ['options'],
	components: {
		'popup': Popup, 
		'icon': Icon
	},
	data() {
		return {
			optionsData: this.options? this.options: null,
			selectedData: {
				icon: this.options? this.options.icon: null,
				name: this.options? this.options.name: null,
			},
			showselectBox: false,
			xData: null,
			yData: null,
			popupKey: 0,
			iconKey: 0
		}
	},
	watch: {
		optionsData: function(newData, oldData) {
			this.optionsData = newData
		},
	},
	methods: {
		removePopup(e) {
			if(!this.$refs.selectboxPopup.isCursorInside(e.clientX, e.clientY)){
				this.$refs.selectboxPopup.hide();
				this.showselectBox= false;
				this.popupKey= !this.popupKey;
			}
		},
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
		},
		showPopup(e) {
			if(this.showselectBox) {
				this.showselectBox= false;
				return;
			}
			var offsets = document.querySelector('.selectbox-border').getBoundingClientRect();
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