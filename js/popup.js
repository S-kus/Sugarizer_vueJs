const Popup ={
	name: 'Popup',
	template: ` <div class="home-activity-popup" v-if="this.itemData">
					<div class="popup-title">
						<icon
							:id=itemData.icon.id
							:svgfile=itemData.icon.iconData
							:color=itemData.icon.color
							:size=itemData.icon.size
							:x=itemData.icon.iconx
							:y=itemData.icon.icony
						>
						</icon>
						<div class="popup-name-text">{{ itemData.name }}</div>
						<div class="popup-title-text">{{ itemData.title }}</div>
					</div>
					<div id="items" class="popup-items" v-if="itemData.itemList">
						<ul class="item-list">
							<li class="item-list-item" v-for="ele in itemData.itemList" key="ele.index">
								<icon class="item-icon"
									:id=ele.icon.id
									:svgfile=ele.icon.iconData
									:color=ele.icon.color
									:size=ele.icon.size
									:x=ele.icon.iconx
									:y=ele.icon.icony
								></icon>
								<p class="item-name">{{ ele.name }}</p>
							</li>
						</ul>
					</div>
					<div id="footer" class="popup-items" v-if="itemData.footerList">
						<ul class="item-list">
							<li class="item-list-item" v-for="ele in itemData.footerList" key="ele.index">
								<icon class="item-icon"
									:id=ele.icon.id
									:svgfile=ele.icon.iconData
									:color=ele.icon.color
									:size=ele.icon.size
									:x=ele.icon.iconx
									:y=ele.icon.icony
								></icon>
								<p class="item-name">{{ ele.name }}</p>
							</li>
						</ul>
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
			timer: false
		}
	},
	mounted() {
		
	},
	watch: {
		item: function(newItem, oldItem){
			if(!this.timer)
				this.itemData= newItem;
			if(newItem && !this.timer) {
				var vm=this;
				console.log(newItem)
				this.timer= true;
				this.xData= this.x;
				this.yData= this.y;
				setInterval(() => {
					vm.timer= false;
				}, 3000);
			}
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Popup }