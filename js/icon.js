const Icon ={
    name: 'Icon',
    template: `<div class="icon" :id="this.idData"></div>`,
	props: ['id','svgfile','color','size','x','y'],
    data() {
        return {
            idData: this.id,
            isSugarNative : false,
            iconData: this.svgfile,
            colorData: this.color,
            xData: this.x ? this.x: 0,
            yData: this.y ? this.y: 0,
            _element: null
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
                svgElement.setAttribute("style", "margin: "+this.xData+"px "+this.yData+"px");
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
            this._element = svgElement;
            // Detection of error no symbol #icon is not possible due to closed ShadowDOM
            svgElement.appendChild(useElement);
            parent.appendChild(svgElement);
        }
    },
    watch: {
        colorData: function(newColor, oldColor) {
            var element = this._element;
            element.setAttribute("class", "xo-color"+newColor);
        }, 
        xData: function(newX, oldX) {
            var element = this._element;
            element.setAttribute("style", "margin: "+newX+"px "+this.yData+"px");
        }, 
        yData: function(newY, oldX) {
            var element = this._element;
            element.setAttribute("style", "margin: "+this.xData+"px "+newY+"px");
        }, 
    },
};

if (typeof module !== 'undefined') module.exports = { Icon }