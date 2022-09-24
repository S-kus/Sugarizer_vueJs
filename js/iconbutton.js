const IconButton ={
    name: 'IconButton',
    template: `<div class="iconButton">
                <button-icon
                    :id=this.id
                    :svgfile=this.svgfile 
                    :color=this.color 
                    :size=this.size
                    :x=this.x
                    :y=this.y
                ></button-icon>
                <p class="icon-button-text">{{ this.text }}</p>
            </div>`,
	props: ['text','id','svgfile','color','size','x','y'],
    components: {
        'button-icon': Icon, 
    },
    data() {
        return {
            
        }
    },
};
