const IconButton ={
    name: 'IconButton',
    template: `<div :class="this.isDisabled? 'web-activity-disable icon-button': 'icon-button'">
                <button-icon v-if="this.iconData"
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
            isDisabled: this.disabled,
        }
    },
    watch: {
        textData: function(newText, oldText) {
            this.textData = newText
        },
        isDisabled: function(newVal, oldVal) {
            this.isDisabled = newVal
        },
    },
};
