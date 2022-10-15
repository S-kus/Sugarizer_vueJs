const SelectBox ={
	name: 'SelectBox',
	template: `
		<div class="selectbox-border">
            <div v-if="slectedData" v-on:click="showPopup($event)">
                <icon class="selectbox-icon"
                    :id=slectedData.icon.id
                    :svgfile=slectedData.icon.iconData
                    :color=slectedData.icon.color
                    :size=slectedData.icon.size
                    :x=slectedData.icon.iconx
                    :y=slectedData.icon.icony
                ></icon>
                <div class="selectbox-text">{{ slectedData.name }}</div>
            </div>
            <popup ref="selectboxPopup" 
                class="selectbox-popup"
                v-show="showselectBox" 
                :item="optionsData"
                :x=xData
                :y=yData
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
			optionsData: this.options,
            slectedData: {
                icon: this.options? this.options.icon: null,
                name: this.options? this.options.name: null,
            },
            showselectBox: false,
            xData: null,
            yData: null
		}
	},
    watch: {
		optionsData: function(newData, oldData) {
			this.optionsData = newData
		},
	},
    methods: {
        removePopup(e) {
            if(!this.$refs.selectboxPopup.show(e.clientX, e.clientY)){
				this.showselectBox= false;
			}
        },
        optionisSelected(e) {
            this.slectedData= e;
            this.showselectBox= false;
        },
        showPopup(e) {
            this.xData= e.clientX;
            this.yData= e.clientY;
            this.slectedData= {
                icon: this.options? this.options.icon: null,
                name: this.options? this.options.name: null,
            }
            this.showselectBox!=this.showselectBox;
        }
    }
};

if (typeof module !== 'undefined') module.exports = { SelectBox }