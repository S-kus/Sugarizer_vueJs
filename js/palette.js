const Palette ={
	name: 'Palette',
	template: ` <div 
					v-if="optionsData && (optionsData.icon || optionsData.name)"
					v-bind:class="showSubpopup? 'palette-sugarizer palette-up': 'palette-sugarizer palette-down'"
					v-on:click="showPalette($el)"
				>
					<div class="paletteBox">
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
	components: {
		'icon': Icon,
	},
	props: ['options'],
	data() {
		return {
			optionsData: this.options? this.options: null,
			selectedData: {
				icon: this.options? this.options.icon: null,
				name: this.options? this.options.name: null,
			},
			showSubpopup: false,
			iconKey: 0
		}
	},
	methods: {
		removePalette() {
			this.showSubpopup= false;
			this.iconKey= !this.iconKey;
		},
		showPalette(e) {
			const currRef= e.getAttribute('name');
			if(currentPaletteRef && currentPaletteRef ==currRef) {
				this.removePalette();
				currentPaletteRef= null;
				return;
			}
			if(currentPaletteRef && currentPaletteRef!=currRef) {
				this.$root.$refs[currentPaletteRef].removePalette();
				currentPaletteRef= null;
			}
			if(this.optionsData.filterList && this.optionsData.filterList.length >0) {
				this.showSubpopup= true;
				this.iconKey= !this.iconKey;
				currentPaletteRef= currRef;
			}
		},
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