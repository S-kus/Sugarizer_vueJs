// Rebase require directory
requirejs.config({
	baseUrl: "lib",
	paths: {
		activity: "../js"
	}
});

// Vue main app
const app = Vue.createApp({
    components: {
        "icon": Icon,
        "icon-button": IconButton
    },
    data() {
        return {
            message: "Sugarizer in Vue",
        }
    },
    methods: {
        changeColor() {
            this.$refs.icon1.colorData=Math.floor(Math.random() * 179);
        },
        changePosition() {
            this.$refs.icon1.xData=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon1.yData=Math.floor(Math.random() * 100) + 1;
        },
        testFunction: function (event) {
            // this.$refs.icon1.iconData= "icons/star.svg"
            this.$refs.buttonIcon1.iconData="icons/owner-icon.svg"
            // this.$refs.buttonIcon1.disabledData= "text changed"
            this.$refs.buttonIcon1.textData= "text changed"
        }
    },
});

app.mount('#app');