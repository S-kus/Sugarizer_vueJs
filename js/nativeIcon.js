const NativeIcon ={
    name: 'NativeIcon.js',
    template: `
        <div v-html="gensvg" v-bind:id="this.idData">
        </div>
    `,
    props: ['id','svgfile','color','size','x','y'],
    data() {
        return {
            svg: null,
            idData: this.id,
            iconData: this.svgfile,
            colorData: this.color,
            xData: this.x ? this.x: 0,
            yData: this.y ? this.y: 0,
        }
    },
    async created() {
        var vm = this;
        await this._loadIcon(this.svgfile).then(function(svg) {
            vm.svg=svg;
        });
    },
    computed: {
        gensvg: function() {
            if (this.svg == null) return "";
            return this._convertSVG(this.svg, this.genid);
        },
        genid: function() {
            return this.idData ? this.idData : this._uid;
        }
    },
    mounted: function() {
        if (this.svg == null) return;
        this._setColor(this, this.colorData);
        if (this.size) {
            this._setSize(this, this.size);
        }
    },
    updated: function() {
        this._setColor(this, this.colorData);
        if (this.size) {
            this._setSize(this, this.size);
        }
    },
    watch: {
        colorData: function(newColor, oldColor) {
            this._setColor(this, newColor);
        },
        size: function(newSize, oldSize) {
            _setSize(this, newSize);
        },
        xData: function(newX, oldCX) {
            const vm= this;
            setTimeout(function() { // HACK: Timeout need to wait for SVG to be build
                let element = vm._getSVGElement(document.getElementById(vm.genid));
                if (element) {
                    element.setAttribute("style", "margin: "+newX+"px "+vm.yData+"px");
                }
            },0);
        },
        yData: function(newY, oldY) {
            const vm= this;
            setTimeout(function() { // HACK: Timeout need to wait for SVG to be build
                let element = vm._getSVGElement(document.getElementById(vm.genid));
                if (element) {
                    element.setAttribute("style", "margin: "+vm.xData+"px "+newY+"px");
                }
            },0);
        },
    },
    methods: {
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
            var buf = read.replace(/<!DOCTYPE[\s\S.]*\]>/g,"");

            //if it's non-native SVG
            buf = buf.replace(/<symbol id="icon">/g,"");
            buf = buf.replace(/(<\/symbol>)/g,"");

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
            setTimeout(function() { // HACK: Timeout need to wait for SVG to be build
                let element = vm._getSVGElement(document.getElementById(vm.genid));
                if (element) {
                    if (color > 179 && color != 256 && color != 512) {
                        color = color % 180;
                    }
                    element.setAttribute("class", "xo-color"+color);
                }
            }, 0);
        },
        // Change CSS size
        _setSize(vm, size) {
            setTimeout(function() { // HACK: Timeout need to wait for SVG to be build
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
            }, 0);
        },
    }
};