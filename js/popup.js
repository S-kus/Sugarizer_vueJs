const delay = time => new Promise(resolve => setTimeout(resolve, time));
const Popup ={
	name: 'Popup',
	template: ` <div class="home-activity-popup" v-if="this.itemData">
					<div class="popup-title">
						<icon 
							class="item-icon"
							:id=itemData.icon.id
							:svgfile=itemData.icon.iconData
							:color=itemData.icon.color
							:size=itemData.icon.size
							:x=itemData.icon.iconx
							:y=itemData.icon.icony
							@click="itemClicked(itemData.id+'_'+itemData.name)"
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
	props: ['item','x','y'],
	components: {
		'icon': Icon, 
	},
	data() {
		return {
			itemData: this.item? this.item: null,
			xData: this.x? this.x: null,
			yData: this.y? this.y: null,
			hide: true,
			cursorX: null,
			cursorY: null
		}
	},
	watch: {
		item: async function(newItem, oldItem){
			if(newItem!=oldItem) {
				await delay(1500);
			}
			this.itemData= newItem;
			this.xData= this.x;
			this.yData= this.y;
		},
		cursorX: function(newVal) {
			this.cursorX= newVal
		},
		cursorY: function(newVal) {
			this.cursorY= newVal
		},
		hide: function(newVal) {
			this.hide= newVal
		},
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
			if(this.isCursorIosition()) {
				this.hide= false;
			} else {
				this.hide= true
			}
		}
	},
	methods: {
		itemClicked(event) {
			this.$emit('itemisClicked',event)
		},
		isCursorIosition() {
			var ele= document.querySelector('.home-activity-popup')
			if(ele) {
				var popupXmin= this.xData;
				var popupXmax= this.xData + ele.clientWidth;
				var popupYmin= this.yData;
				var popupYmax= this.yData + ele.clientHeight;
				if(this.cursorX>= popupXmin && this.cursorX<=popupXmax && this.cursorY>=popupYmin && this.cursorY<=popupYmax)
					return true;
				else
					return false;
			} else {
				return false;
			}
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Popup }