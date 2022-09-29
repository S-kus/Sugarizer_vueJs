const IconButton ={
    name: 'IconButton',
    template: `<div :class="this.disabledData? 'web-activity-disable icon-button': 'icon-button'">
                <button-icon v-if="this.iconData"
                    :key="componentKey"
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
	props: {
        text: String,
        id: String,
        svgfile: String,
        color: String,
        size: String,
        x: String,
        y: String,
        disabled: Boolean
    },
    components: {
        'button-icon': Icon, 
    },
    data() {
        return {
            iconData: this.svgfile,
            textData: this.text,
            disabledData: this.disabled,
            componentKey: 0,
        }
    },
    watch: {
        textData: function(newText, oldText) {
            this.textData = newText
        },
        disabledData: function(newVal, oldVal) {
            this.disabledData = newVal
        },
        iconData: function(newIcon, oldIcon) {
            this.iconData= newIcon
            this.componentKey=! this.componentKey;
        }
    },
};
