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
        "icon": Icon
    },
    data() {
        return {
            message: "Sugarizer in Vue",
        }
    },
    methods: {
        changeColor() {
            this.$refs.icon1.iconData=document.getElementById("1");
            this.$refs.icon1.colorData=Math.floor(Math.random() * 179);

            this.$refs.icon2.iconData=document.getElementById("2");
            this.$refs.icon2.colorData=Math.floor(Math.random() * 179);

            this.$refs.icon3.iconData=document.getElementById("3");
            this.$refs.icon3.colorData=Math.floor(Math.random() * 179);

            this.$refs.icon4.iconData=document.getElementById("4");
            this.$refs.icon4.colorData=Math.floor(Math.random() * 179);
        },
        changePosition() {
            this.$refs.icon1.iconData=document.getElementById("1");
            this.$refs.icon1.x=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon1.y=Math.floor(Math.random() * 100) + 1;

            this.$refs.icon2.iconData=document.getElementById("2");
            this.$refs.icon2.x=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon2.y=Math.floor(Math.random() * 100) + 1;

            this.$refs.icon3.iconData=document.getElementById("3");
            this.$refs.icon3.x=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon3.y=Math.floor(Math.random() * 100) + 1;

            this.$refs.icon4.iconData=document.getElementById("4");
            this.$refs.icon4.x=Math.floor(Math.random() * 100) + 1;
            this.$refs.icon4.y=Math.floor(Math.random() * 100) + 1;
        }
    },
});

app.mount('#app');