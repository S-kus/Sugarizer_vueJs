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
            icon: null,
        }
    },
    methods: {
        changeColor() {
            var allsvgs=document.getElementsByClassName("icon");
            for(var i=0; i<allsvgs.length; i++) {
                this.icon=allsvgs[i];
                this.newColor= Math.floor(Math.random() * 179);
            }
        },
        changePosition() {
            var allsvgs=document.getElementsByClassName("icon");
            for(var i=0; i<allsvgs.length; i++) {
                var x=Math.floor(Math.random() * 100) + 1;
                var y=Math.floor(Math.random() * 100) + 1;
                allsvgs[i].setAttribute("style", "margin: "+x+"px "+y+"px");
            }
        }
    },
    computed: {
        newColor: {
          get: function() {
            let icon=this.icon;
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
            var color = element.getAttribute("class");
            var index;
            if (!color || (index = color.indexOf("xo-color")) == -1) {
                return -1; // Error no XO color
            }
            return parseInt(color.substr(index+8));
        },
        set: function(color) {
            let icon=this.icon;
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
        }
      }
    }
});

app.mount('#app');