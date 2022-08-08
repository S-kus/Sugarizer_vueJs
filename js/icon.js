const Icon ={
    name: 'Icon',
    template: `<div id="icon"></div>`,
	props: ['svgfile','color','size', 'intersectsize'],
    data() {
        return {
            isSugarNative : false,
            x: -1,
            y: -1,
            icon: null,
        }
    },
    mounted() {
        this.createIcon(this.svgfile, this.color, this.size, this.intersectsize);
    },
    methods: {
        createIcon(svgfile, color, size, intersectsize, callback) {
            var parent =document.getElementById("icon");
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
                if (intersectsize) {
                    svgElement.setAttribute("viewBox", "0 0 "+intersectsize+" "+intersectsize);
                }
                else {
                    svgElement.setAttribute("viewBox", "0 0 55 55");
                }
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
            // this.x=50;
            // this.xChanged();
        },
        
        // Property changed
        xChanged() {
            if (this.x != -1) {
                this.icon.setAttribute("style", "margin-left: "+this.x+"px");
            }
        },

        yChanged() {
            if (this.y != -1) {
                this.icon.setAttribute("style", "margin-top: "+this.y+"px");
            }
        },
    },
};