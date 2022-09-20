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
        "native-icon": NativeIcon
    },
    data() {
        return {
            message: "Sugarizer in Vue",
        }
    },
    methods: {
        changeColor() {
            this.$refs.icon1.colorData=Math.floor(Math.random() * 179);
            this.$refs.old1.colorData=Math.floor(Math.random() * 179);
        },
        changePosition() {
            this.$refs.icon1.xData=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon1.yData=Math.floor(Math.random() * 100) + 1;

            this.$refs.old1.xData=Math.floor(Math.random() * 100) + 1;
            this.$refs.old1.yData=Math.floor(Math.random() * 100) + 1;
        }
    },
});

app.mount('#app');