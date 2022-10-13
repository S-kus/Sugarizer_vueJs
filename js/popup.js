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
						>
						</icon>
						<div>
							<div class="popup-name-text">{{ itemData.name }}</div>
							<div class="popup-title-text">{{ itemData.title }}</div>
						</div>
					</div>
					<div id="items" class="popup-items" v-if="itemData.itemList">
						<div class="item-list">
							<div class="item-list-item" v-for="ele in itemData.itemList" key="ele.index">
								<icon class="item-icon"
									:id=ele.icon.id
									:svgfile=ele.icon.iconData
									:color=ele.icon.color
									:size=ele.icon.size
									:x=ele.icon.iconx
									:y=ele.icon.icony
								></icon>
								<p class="item-name">{{ ele.name }}</p>
							</div>
						</div>
					</div>
					<div id="footer" class="popup-items" v-if="itemData.footerList">
						<div class="item-list">
							<div class="item-list-item" v-for="ele in itemData.footerList" key="ele.index">
								<icon class="item-icon"
									:id=ele.icon.id
									:svgfile=ele.icon.iconData
									:color=ele.icon.color
									:size=ele.icon.size
									:x=ele.icon.iconx
									:y=ele.icon.icony
								></icon>
								<p class="item-name">{{ ele.name }}</p>
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
			timer: false,
			hide: true
		}
	},
	watch: {
		item: function(newItem, oldItem){
			if(!this.timer)
				this.itemData= newItem;
			if(newItem && !this.timer && newItem!=oldItem) {
				var vm=this;
				this.timer= true;
				this.xData= this.x;
				this.yData= this.y;
				setInterval(() => {
					vm.timer= false;
				}, 3000);
			}
		}
	},
	updated: function() {
		var ele= document.querySelector('.home-activity-popup')
		if(ele) 
			ele.setAttribute("style", "left: "+this.xData+"px; top: "+this.yData+"px;");
	},
	methods: {

	}
};

if (typeof module !== 'undefined') module.exports = { Popup }