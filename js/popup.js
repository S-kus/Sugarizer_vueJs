const Popup ={
	name: 'Popup',
	template: ` <div class="home-activity-popup" v-if="this.itemData && this.isShown">
					<div class="popup-title" @click="itemClicked(itemData.id+'_'+itemData.name)">
						<icon 
							:key="iconKey"
							class="item-icon-title"
							:id=itemData.icon.id
							:svgfile=itemData.icon.iconData
							:color=itemData.icon.color
							:size=itemData.icon.size
							:x=itemData.icon.iconx
							:y=itemData.icon.icony
						>
						</icon>
						<div>
							<div class="popup-name-text">{{ itemData.name }}</div>
							<div class="popup-title-text">{{ itemData.title }}</div>
						</div>
					</div>
					<div id="items" class="popup-items" v-if="itemData.itemList">
						<div class="popup-item-listview">
							<div class="item-list">
								<div class="item-list-item" 
									v-for="ele in itemData.itemList" key="ele.index"
									@click="itemClicked(itemData.id+'_'+ele.name)"
								>
									<icon class="item-icon"
										:key="iconKey"
										:id=ele.icon.id
										:svgfile=ele.icon.iconData
										:color=ele.icon.color
										:size=ele.icon.size
										:x=ele.icon.iconx
										:y=ele.icon.icony
									></icon>
									<div class="item-name">{{ ele.name }}</div>
								</div>
							</div>
						</div>
					</div>
					<div id="footer" class="popup-items" v-if="itemData.footerList">
						<div class="popup-item-listview">
							<div class="item-list">
								<div class="item-list-item" 
									v-for="ele in itemData.footerList" key="ele.index"
									@click="itemClicked(itemData.id+'_'+ele.name)"
								>
									<icon class="item-icon"
										:key="iconKey"
										:id=ele.icon.id
										:svgfile=ele.icon.iconData
										:color=ele.icon.color
										:size=ele.icon.size
										:x=ele.icon.iconx
										:y=ele.icon.icony
									></icon>
									<div class="item-name">{{ ele.name }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>`,
	components: {
		'icon': Icon, 
	},
	props: ['item'],
	data() {
		return {
			itemData: this.item? this.item: null,
			xData: null,
			yData: null,
			isShown: false,
			iconKey: 0
		}
	},
	watch: {
		item: async function(newItem, oldItem){
			this.itemData= newItem;
			this.iconKey= !this.iconKey;
		}
	},
	updated: function() {
		var ele= document.querySelector('.home-activity-popup')
		if(ele) {
			var deltaX= this.xData + ele.clientWidth - window.innerWidth;
			if (deltaX >= 1) {
				ele.setAttribute("style", "left: "+(this.xData - deltaX)+"px; top: "+this.yData+"px;");
			} else {
				ele.setAttribute("style", "left: "+this.xData+"px; top: "+this.yData+"px;");
			}
		}
	},
	methods: {
		itemClicked(event) {
			this.$emit('itemisClicked',event)
		},
		show(x, y) {
			if(this.isShown) return;
			this.xData= x;
			this.yData= y;
			this.isShown= true;
		},
		isCursorInside(x, y) {
			var ele= document.querySelector('.home-activity-popup')
			if(ele) {
				var popupXmin= this.xData;
				var popupXmax= this.xData + ele.clientWidth;
				var popupYmin= this.yData+15;
				var popupYmax= this.yData + ele.clientHeight;
				if((x>= popupXmin && x<=popupXmax && y>=popupYmin && y<=popupYmax))
					return true;
				else
					return false;
			} else 
				return false;
		},
		hide() {
			this.isShown= false;
			this.itemData= null;
			this.xData= null;
			this.yData= null;
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Popup }