// global variable which stores active ref value of filterBox instance (whose subPopup is visible)
var currentFilterBoxRef= null;

const FilterBox ={
	name: 'FilterBox',
	template: ` <div 
					ref="filterBox"
					v-if="optionsData && (optionsData.icon || optionsData.name)"
					v-bind:class="showSubpopup? 'filterBox-sugarizer filterBox-up': 'filterBox-sugarizer filterBox-down'"
				>
					<div class="filterBox" v-on:click="showFilterBox()">
						<icon class="filterBox-icon"
							v-if="selectedData.icon"
							:key="this.iconKey"
							:id="'optionsData.id'+selectedData.icon.id"
							:svgfile=selectedData.icon.iconData
							:color=selectedData.icon.color
							:size=selectedData.icon.size
							:x=selectedData.icon.iconx
							:y=selectedData.icon.icony
						></icon>
						<div v-if="selectedData.name" class="filterBox-text">{{ selectedData.name }}</div>
					</div>
					<div ref="filterBoxPopup">
						<div v-if="showSubpopup" class="filterBox-content">
							<div v-if="optionsData.header" class="filterBox-header">{{ optionsData.header }}</div>
							<div class="filterBox-hr"></div>
							<div class="filterBox-items">
								<div class="filterBox-items-item" 
									v-for="item in optionsData.filterBoxList" key="item.index"
									v-on:click=optionisSelected(item)
								>
									<icon class="filterBox-icon"
										v-if="item.icon"
										:key="iconKey"
										:id=item.icon.id
										:svgfile=item.icon.iconData
										:color=item.icon.color
										:size=item.icon.size
										:x=item.icon.iconx
										:y=item.icon.icony
									></icon>
									<div class="filterBox-text">{{ item.name }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>`,
	// for different icons
	components: {
		'icon': Icon,
	},
	// filterBox options object data with default value in filterBox-bar
	props: ['options'],
	data() {
		return {
			// options prop 
			optionsData: this.options? this.options: null,
			// current selected filterBox option data
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
		removeFilterBox() {
			this.showSubpopup= false;
			currentFilterBoxRef= null;
		},
		// to show the subPopup
		showFilterBox() {
			// retrieve current instance name attribute
			const currRef= this.$refs.filterBox.getAttribute('name');
			// if currentFilterBoxRef is not null and active ref name is current ref then 
			// hide subPopup, it will works as toggling subPopup
			if(currentFilterBoxRef && currentFilterBoxRef ==currRef) {
				this.removeFilterBox();
				return;
			}
			// if currentFilterBoxRef is not null and active ref name is not current ref then 
			// hide the active ref's subPopup so that we can open current one
			if(currentFilterBoxRef && currentFilterBoxRef!=currRef) {
				this.$root.$refs[currentFilterBoxRef].removeFilterBox();
				currentFilterBoxRef= null;
			}
			// if there is no active subPopup and current subPopup is also false
			// we have filterBoxList length to show some values in the subPopup then show subPopup
			if(!currentFilterBoxRef && !this.showSubpopup && this.optionsData.filterBoxList && this.optionsData.filterBoxList.length >0) {
				this.showSubpopup= true;
				this.iconKey= !this.iconKey;
				currentFilterBoxRef= currRef;
			}
		},
		// if option is selected, the update the filterBox-bar with this,
		// emit filterBoxSelected with selected option and close the subPopup
		optionisSelected(item) {
			var data= JSON.parse(JSON.stringify(item))
			if(data.icon) {
				this.selectedData.icon= data.icon;
				this.iconKey= !this.iconKey;
			}
			this.selectedData.name= data.name;
			this.removeFilterBox();
			this.$emit('filterSelected', data);
		},
	}
};

if (typeof module !== 'undefined') module.exports = { FilterBox }