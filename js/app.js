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
        "old": Old
    },
    data() {
        return {
            message: "Sugarizer in Vue",
        }
    },
    methods: {
        changeColor() {
            this.$refs.icon1.colorData=Math.floor(Math.random() * 179);

            this.$refs.icon2.colorData=Math.floor(Math.random() * 179);

            this.$refs.icon3.colorData=Math.floor(Math.random() * 179);

            this.$refs.icon4.colorData=Math.floor(Math.random() * 179);
        },
        changePosition() {
            this.$refs.icon1.xData=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon1.yData=Math.floor(Math.random() * 100) + 1;

            this.$refs.icon2.xData=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon2.yData=Math.floor(Math.random() * 100) + 1;

            this.$refs.icon3.xData=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon3.yData=Math.floor(Math.random() * 100) + 1;

            this.$refs.icon4.xData=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon4.yData=Math.floor(Math.random() * 100) + 1;
        }
    },
});

app.mount('#app');