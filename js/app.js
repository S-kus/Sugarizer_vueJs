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
            message: "Sugarizer in Vue"
        }
    },
    methods: {
        changeColor() {
            var allsvgs=document.getElementsByClassName("icon");
            for(var i=0; i<allsvgs.length; i++) {
                var newColor= Math.floor(Math.random() * 179);
                this.$root.$refs.Icon.changeColor(allsvgs[i],newColor);
            }
        },
        changePosition() {
            var allsvgs=document.getElementsByClassName("icon");
            for(var i=0; i<allsvgs.length; i++) {
                var x=Math.floor(Math.random() * 100) + 1;
                var y=Math.floor(Math.random() * 100) + 1;
                this.$root.$refs.Icon.changePosition(allsvgs[i],x,y);
            }
        }
    }
});

app.mount('#app');