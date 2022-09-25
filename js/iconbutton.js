const IconButton ={
    name: 'IconButton',
    template: `<div :class="this.disabled? 'web-activity-disable icon-button': 'icon-button'">
                <button-icon
                    class="icon-button-icon"
                    :id=this.id
                    :svgfile=this.iconData 
                    :color=this.color 
                    :size=this.size
                    :x=this.x
                    :y=this.y
                ></button-icon>
                <p class="icon-button-text">{{ this.textData }}</p>
            </div>`,
	props: ['text','id','svgfile','color','size','x','y'],
    components: {
        'button-icon': Icon, 
    },
    data() {
        return {
            iconData: this.svgfile,
            textData: this.text,
            disabled: false,
        }
    },
    watch: {
        textData: function(newText, oldText) {
            this.textData = newText
        }
    },
};
