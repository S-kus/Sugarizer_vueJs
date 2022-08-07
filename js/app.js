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
        getIconColor(icon) {
            if (!icon) {
                return -1; // Error bad element
            }
            var element = null;
            for (var i = 0 ; i < icon.children.length && !element ; i++) {
                if (icon.children[i].tagName == "svg") {
                    element = icon.children[i];
                }
            }
            if (element == null) {
                return -1; // Error no SVG included
            }
            var xocolor = element.getAttribute("class");
            var index;
            if (!xocolor || (index = xocolor.indexOf("xo-color")) == -1) {
                return -1; // Error no XO color
            }
            return parseInt(xocolor.substr(index+8));
        },
        setIconColor(icon,color) {
            if (!icon) {
                return -1; // Error bad element
            }
            var element = null;
            for (var i = 0 ; i < icon.children.length && !element ; i++) {
                if (icon.children[i].tagName == "svg") {
                    element = icon.children[i];
                }
            }
            if (element == null) {
                return -1; // Error no SVG included
            }
            element.setAttribute("class", "xo-color"+color);
            return 0;
        },
        prev() {
            var index = this.getIconColor(document.getElementById("owner"));
            if (--index==-1) { index=179; }
            this.setIconColor(document.getElementById("owner"), index);
        },
        next() {
            var index = this.getIconColor(document.getElementById("owner"));
            if (++index==180) { index=0; }
            this.setIconColor(document.getElementById("owner"), index);
        }
    }
});

app.mount('#app');