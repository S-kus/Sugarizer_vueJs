const Popup ={
	name: 'Popup',
	template: `<div v-if="this.itemData">
				<p>{{this.xData}} {{this.yData}}</p>
				<p>{{this.itemData.name}}</p>
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