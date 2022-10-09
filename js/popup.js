const Popup ={
	name: 'Popup',
	template: `<div>
					<p v-if="this.eventData">Current Activity: {{this.activityId}}</p>
				</div>`,
	props: ['event'],
	data() {
		return {
			eventData: this.event? this.event: null,
			activityId: this.event? this.event.target.id: null,
			x: this.event? this.event.clientX: null,
			y: this.event? this.event.clientY: null,
			timer: false
		}
	},
	mounted() {
		
	},
	watch: {
		event: function(newEvent, oldEvent){
			if(!this.timer)
				this.eventData= newEvent;
			if(newEvent && !this.timer) {
				var vm=this;
				this.timer= true;
				if(newEvent.target.tagName=='svg')
					this.activityId= newEvent.target.parentElement.id
				else if(newEvent.target.tagName=='use')
					this.activityId= newEvent.target.parentElement.parentElement.id
				else
					this.activityId= newEvent.target.id;
				this.x= newEvent.clientX;
				this.y= newEvent.clientY;
				setInterval(() => {
					vm.timer= false;
				}, 3000);
			}
		}
	}
};

if (typeof module !== 'undefined') module.exports = { Popup }