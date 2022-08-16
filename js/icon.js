const Icon ={
    name: 'Icon',
    template: `<div class="icon" :id="this.id"></div>`,
	props: ['id','svgfile','color','size'],
    data() {
        return {
            isSugarNative : false,
            x: -1,
            y: -1,
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
        }
    }
};