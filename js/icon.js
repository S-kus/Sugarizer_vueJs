const Icon ={
    name: 'Icon',
    template: `<div class="icon" v-html="gensvg" :id="this.idData"></div>`,
	props: ['id','svgfile','color','size','x','y'],
    data() {
        return {
            svg: null,
            idData: this.id,
            isSugarNative : true,
            iconData: this.svgfile,
            sizeData: this.size? this.size: 55,
            colorData: this.color? this.color: 512,
            xData: this.x ? this.x: 0,
            yData: this.y ? this.y: 0,
            _element: null
        }
    },
    async created() {
        var vm = this;
        if(this.isSugarNative) {
            await this._loadIcon(this.svgfile).then(function(svg) {
                vm.svg=svg;
            });
        }
    },
    mounted() {
        if(!this.isSugarNative) {
            this.createIcon(this.svgfile, this.colorData, this.sizeData);
        }
    },
    computed: {
        gensvg: function() {
            if (this.svg == null) return "";
            console.log("working")
            return this._convertSVG(this.svg, this.genid);
        },
        genid: function() {
            return this.idData ? this.idData : this._uid;
        }
    },
    updated: function() {
        if(this.isSugarNative) {
            this._setColor(this, this.colorData);
            if (this.size) {
                this._setSize(this, this.size);
            }
        }
    },
    watch: {
        colorData: function(newColor, oldColor) {
            if(this.isSugarNative) {
                this._setColor(this, newColor);
            } else {
                var element = this._element;
                element.setAttribute("class", "xo-color"+newColor);    
            }
        }, 
        xData: function(newX, oldX) {
            if(this.isSugarNative) {
                const vm= this;
                let element = vm._getSVGElement(document.getElementById(vm.genid));
                if (element) {
                    element.setAttribute("style", "margin: "+newX+"px "+vm.yData+"px");
                }
            } else {
                var element = this._element;
                element.setAttribute("style", "margin: "+newX+"px "+this.yData+"px");    
            }
        }, 
        yData: function(newY, oldX) {
            if(this.isSugarNative) {
                const vm= this;
                let element = vm._getSVGElement(document.getElementById(vm.genid));
                // console.log(element)
                if (element) {
                    element.setAttribute("style", "margin: "+vm.xData+"px "+newY+"px");
                }
            } else {
                var element = this._element;
                element.setAttribute("style", "margin: "+this.xData+"px "+newY+"px");    
            }
        }, 
        gensvg: async function(newVal) {
            console.log(document.getElementById(this.genid))
            console.log("changed")
            const vm= this;
            setTimeout( async () => {
                let icon= document.getElementById(vm.genid);
                if (!icon) {
                    return null;
                }
                let element = null;
                for (let i = 0 ; i < icon.children.length && !element ; i++) {
                    if (icon.children[i].tagName == "svg") {
                        element = icon.children[i];
                    }
                }
                this._element= element;
                console.log(this._element)
            }, 0);
            console.log("hi")
        },
    },
    methods: {
        createIcon(svgfile, color, size, callback) {
            if(!svgfile)
                return null;
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
        },
        // Load icon
        async _loadIcon(url) {
            return new Promise(function(resolve, reject) {
               axios.get(url).then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                });
            });
        },
        // Convert SVG to a pure SVG (remove Sugar stuff)
        _convertSVG(svg, id) {
            // Remove ENTITY HEADER
            let read = svg;
            var buf= read;
            buf = read.replace(/<!DOCTYPE[\s\S.]*\]>/g,"");

            // Replace &fill_color; and &stroke_color;
            buf = buf.replace(/&stroke_color;/g,"var(--stroke-color)");
            buf = buf.replace(/&fill_color;/g,"var(--fill-color)");

            // Add symbol and /symbol
            buf = buf.replace(/(<svg[^>]*>)/g,'$1<symbol id="icon'+id+'">');
            buf = buf.replace(/(<\/svg>)/g,'</symbol><use xlink:href="#icon'+id+'" href="#icon'+id+'"/>$1');
            return buf;
        },
        // Get SVG element from an icon
        _getSVGElement(icon) {
            if (!icon) {
                return null;
            }
            let element = null;
            for (let i = 0 ; i < icon.children.length && !element ; i++) {
                if (icon.children[i].tagName == "svg") {
                    element = icon.children[i];
                }
            }
            return element;
        },
        // Change CSS color
        _setColor(vm, color) {
            element = vm._getSVGElement(document.getElementById(vm.genid));
            if (element) {
                if (color > 179 && color != 256 && color != 512) {
                    color = color % 180;
                }
                element.setAttribute("class", "xo-color"+color);
            }
        },
        // Change CSS size
        _setSize(vm, size) {
            let element = vm._getSVGElement(document.getElementById(vm.genid));
            if (element) {
                // Compute optimal viewBox size depending of previous width/height value and unity
                let iwidth = element.getAttribute("width").replace("px","");
                if (iwidth == "100%") {
                    iwidth = 55;
                } else if ((""+iwidth).indexOf("pt")!=-1) {
                    iwidth = Math.round(parseInt(iwidth.replace("pt",""),10)*96/72); // Convert pt to px
                }
                let iheight = element.getAttribute("height").replace("px","").replace("pt","");
                if (iheight == "100%") {
                    iheight = 55;
                } else if ((""+iheight).indexOf("pt")!=-1) {
                    iheight = Math.round(parseInt(iheight.replace("pt",""),10)*96/72); // Convert pt to px
                }
                // Set Position
                element.setAttribute("style", "margin: "+vm.xData+"px "+vm.yData+"px");
                // Set size
                element.setAttribute("width", size+"px");
                element.setAttribute("height", size+"px");
                element.setAttribute("preserveAspectRatio", "xMidYMid meet");
                if (!element.getAttribute("viewBox")) {
                    element.setAttribute("viewBox", "0 0 "+iwidth+" "+iheight);
                }
            }
        },
    }
};

if (typeof module !== 'undefined') module.exports = { Icon }