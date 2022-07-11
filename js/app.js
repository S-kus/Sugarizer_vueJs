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
        "activity-icon" : ActivityIcon,
        "xocolor": xocolor
    },
    data() {
        return {
            message: "Sugarizer in Vue"
        }
    }
});

app.mount('#app');