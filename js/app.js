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
        "xocolor": xocolor,
        "sugar-icon": SugarIcon
    },
    data() {
        return {
            message: "Sugarizer in Vue"
        }
    }
});

app.mount('#app');