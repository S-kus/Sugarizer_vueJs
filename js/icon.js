const Icon ={
    name: 'Icon',
    template: `<div>
            <input type="button" value="Change Color" v-on:click="changeColor()"/>
            <input type="button" value="Change Position" v-on:click="changePosition()"/>
            <div class="icon" :id="this.id"></div>
        </div>`,
	props: ['id','svgfile','color','size'],
    data() {
        return {
            isSugarNative : false,
            x: -1,
            y: -1,
            icon: null,
        }
    },
    mounted() {
        this.createIcon(this.svgfile, this.color, this.size);
    },
    methods: {
        createIcon(svgfile, color, size, callback) {
            var parent =document.getElementById(this.id);
            if (!parent) {
                return null;
            }
            var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElement.setAttribute("class", "xo-color"+color);
            if (size) {
                svgElement.setAttribute("width", size+"px");
                svgElement.setAttribute("height", size+"px");
                // svgElement.setAttribute("position", fixed);
                svgElement.setAttribute("style", "margin: -2px -4px");
                svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
                var img = new Image();
                img.onload = function() {
                    if(this.width!=size) {
                        let intersectsize=this.width;
                        svgElement.setAttribute("viewBox", "0 0 "+intersectsize+" "+intersectsize);
                    }
                    else {
                        svgElement.setAttribute("viewBox", "0 0 55 55");
                    }
                }
                img.src = svgfile;
            }
            var useElement = document.createElementNS(svgElement.namespaceURI,"use");
            useElement.addEventListener('load', function() {
                if (callback) {
                    callback(svgElement);
                }
            })
            useElement.addEventListener('error', function() {
                console.log(svgfile+' error');
                if (callback) {
                    callback(null);
                }
            }) // Error loading SVG file
            var xref = svgfile+"#icon";
            useElement.setAttribute("xlink:href",xref);
            useElement.setAttribute("href",xref);
            // Detection of error no symbol #icon is not possible due to closed ShadowDOM
            svgElement.appendChild(useElement);
            parent.appendChild(svgElement);
            this.icon=svgElement;
        },
        changePosition() {
            this.x=Math.floor(Math.random() * 100) + 1;
            this.y=Math.floor(Math.random() * 100) + 1;
            this.icon.setAttribute("style", "margin-left: "+this.x+"px; margin-top: "+this.y+"px");
        },

        changeColor() {
            this.newColor = Math.floor(Math.random() * 179);
        },
    },
    computed: {
        newColor: {
          get: function() {
            let icon=document.getElementById(this.id);
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
            let icon=document.getElementById(this.id);
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
};