// global variable which stores active ref value of palette instance (whose subPopup is visible)
var currentPaletteRef= null;

const Palette ={
	name: 'Palette',
	template: ` <div 
					ref="palette"
					v-if="optionsData && (optionsData.icon || optionsData.name)"
					v-bind:class="showSubpopup? 'palette-sugarizer palette-up': 'palette-sugarizer palette-down'"
				>
					<div class="paletteBox" v-on:click="showPalette()">
						<icon class="palette-icon"
							v-if="selectedData.icon"
							:key="this.iconKey"
							:id="'optionsData.id'+selectedData.icon.id"
							:svgfile=selectedData.icon.iconData
							:color=selectedData.icon.color
							:size=selectedData.icon.size
							:x=selectedData.icon.iconx
							:y=selectedData.icon.icony
						></icon>
						<div v-if="selectedData.name" class="palette-text">{{ selectedData.name }}</div>
					</div>
					<div ref="palettePopup">
						<div v-if="showSubpopup" class="palette-content">
							<div v-if="optionsData.header" class="palette-header">{{ optionsData.header }}</div>
							<div class="palette-hr"></div>
							<div class="palette-items">
								<div class="palette-items-item" 
									v-for="item in optionsData.filterList" key="item.index"
									v-on:click=optionisSelected(item)
								>
									<icon class="palette-icon"
										v-if="item.icon"
										:key="iconKey"
										:id=item.icon.id
										:svgfile=item.icon.iconData
										:color=item.icon.color
										:size=item.icon.size
										:x=item.icon.iconx
										:y=item.icon.icony
									></icon>
									<div class="palette-text">{{ item.name }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>`,
	// for different icons
	components: {
		'icon': Icon,
	},
	// filter options object data with default value in palette-bar
	props: ['options'],
	data() {
		return {
			// options prop 
			optionsData: this.options? this.options: null,
			// current selected filter option data
			selectedData: {
				icon: this.options? this.options.icon: null,
				name: this.options? this.options.name: null,
			},
			// condition to show subPopup
			showSubpopup: false,
			// key of icon component
			iconKey: 0
		}
	},
	methods: {
		// hide the subPopup
		removePalette() {
			this.showSubpopup= false;
			currentPaletteRef= null;
		},
		// to show the subPopup
		showPalette() {
			// retrieve current instance name attribute
			const currRef= this.$refs.palette.getAttribute('name');
			// if currentPaletteRef is not null and active ref name is current ref then 
			// hide subPopup, it will works as toggling subPopup
			if(currentPaletteRef && currentPaletteRef ==currRef) {
				this.removePalette();
				return;
			}
			// if currentPaletteRef is not null and active ref name is not current ref then 
			// hide the active ref's subPopup so that we can open current one
			if(currentPaletteRef && currentPaletteRef!=currRef) {
				this.$root.$refs[currentPaletteRef].removePalette();
				currentPaletteRef= null;
			}
			// if there is no active subPopup and current subPopup is also false
			// we have filterList length to show some values in the subPopup then show subPopup
			if(!currentPaletteRef && !this.showSubpopup && this.optionsData.filterList && this.optionsData.filterList.length >0) {
				this.showSubpopup= true;
				this.iconKey= !this.iconKey;
				currentPaletteRef= currRef;
			}
		},
		// if option is selected, the update the palette-bar with this,
		// emit filterSelected with selected option and close the subPopup
		optionisSelected(item) {
			var data= JSON.parse(JSON.stringify(item))
			if(data.icon) {
				this.selectedData.icon= data.icon;
				this.iconKey= !this.iconKey;
			}
			this.selectedData.name= data.name;
			this.removePalette();
			this.$emit('filterSelected', data);
		},
	}
};

if (typeof module !== 'undefined') module.exports = { Palette }