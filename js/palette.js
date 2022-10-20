const Palette ={
	name: 'Palette',
	template: ` <div 
					v-bind:class="showSubpopup? 'palette-sugarizer palette-up': 'palette-sugarizer palette-down'"
				>
					<icon class="palette-icon"
						:key="this.iconKey"
						:id="'optionsData.id'+selectedData.icon.id"
						:svgfile=selectedData.icon.iconData
						:color=selectedData.icon.color
						:size=selectedData.icon.size
						:x=selectedData.icon.iconx
						:y=selectedData.icon.icony
					></icon>
					<div v-if="selectedData.name" class="palette-text">{{ selectedData.name }}</div>
					<div v-if="showSubpopup" class="palette-content">
						<div class="palette-header">{{ optionsData.header }}</div>
						<div class="palette-hr"></div>
						<div class="palette-items">
							<div class="palette-items-item" 
								v-for="item in optionsData.filterList" key="item.index"
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
			xData: null,
			yData: null,
			popupKey: 0,
			iconKey: 0
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Palette }