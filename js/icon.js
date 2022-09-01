const Icon ={
    name: 'Icon',
    template: `<div class="icon" :id="this.idData"></div>`,
	props: ['id','svgfile','color','size'],
    data() {
        return {
            idData: this.id,
            isSugarNative : false,
            iconData: this.svgfile,
            colorData: this.color,
            x: -2,
            y: -4,
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
        },
        getIconElement() {
            let icon=this.iconData;
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
            return element;
        }
    },
    watch: {
        colorData: function(newColor, oldColor) {
            var element = this.getIconElement();
            element.setAttribute("class", "xo-color"+newColor);
		}, 
        x: function(newX, oldX) {
            var element = this.getIconElement();
            element.setAttribute("style", "margin: "+newX+"px "+this.y+"px");
        }, 
        y: function(newY, oldX) {
            var element = this.getIconElement();
            element.setAttribute("style", "margin: "+this.x+"px "+newY+"px");
        }, 
    },
};