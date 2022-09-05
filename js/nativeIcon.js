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
            isSugarNative : false,
            iconData: this.svgfile,
            colorData: this.color,
            xData: this.x,
            yData: this.y,
        }
    },
	async created() {
		await this._loadIcon(this.svgfile).then(function(svg) {
			this.svg=svg;
			console.log("h1")
			console.log(this.svg)
		});
	},
	computed: {
		gensvg: function() {
			console.log("h2")
			console.log(this.svg)
			return _convertSVG(this.svg, this.genid);
		},
		genid: function() {
			return this.idData ? this.idData : this._uid;
		}
	},
	mounted: function() {
		console.log("h3")
		console.log(this.svg)
		_setColor(this, this.color);
		if (this.size) {
			_setSize(this, this.size);
		}
	},
	updated: function() {
		_setColor(this, this.color);
		if (this.size) {
			_setSize(this, this.size);
		}
	},
	watch: {
		color: function(newColor, oldColor) {
			_setColor(this, newColor);
		},
		size: function(newSize, oldSize) {
			_setSize(this, newSize);
		}
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
		}
	}
};

// Convert SVG to a pure SVG (remove Sugar stuff)
function _convertSVG(svg, id) {
	// Remove ENTITY HEADER
	console.log(svg);
	console.log(id);
	let read = svg;
	var buf = read.replace(/<!DOCTYPE[\s\S.]*\]>/g,"");

	// Replace &fill_color; and &stroke_color;
	buf = buf.replace(/&stroke_color;/g,"var(--stroke-color)");
	buf = buf.replace(/&fill_color;/g,"var(--fill-color)");

	// Add symbol and /symbol
	buf = buf.replace(/(<svg[^>]*>)/g,'$1<symbol id="icon'+id+'">');
	buf = buf.replace(/(<\/svg>)/g,'</symbol><use xlink:href="#icon'+id+'" href="#icon'+id+'"/>$1');
	return buf;
}

// Get SVG element from an icon
function _getSVGElement(icon) {
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
}

// Change CSS color
function _setColor(vm, color) {
	setTimeout(function() { // HACK: Timeout need to wait for SVG to be build
		let element = _getSVGElement(document.getElementById(vm.genid));
		if (element) {
			if (color > 179 && color != 256 && color != 512) {
				color = color % 180;
			}
			element.setAttribute("class", "xo-color"+color);
		}
	}, 0);
}

// Change CSS size
function _setSize(vm, size) {
	setTimeout(function() { // HACK: Timeout need to wait for SVG to be build
		let element = _getSVGElement(document.getElementById(vm.genid));
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

			// Set size
			element.setAttribute("width", size+"px");
			element.setAttribute("height", size+"px");
			element.setAttribute("preserveAspectRatio", "xMidYMid meet");
			if (!element.getAttribute("viewBox")) {
				element.setAttribute("viewBox", "0 0 "+iwidth+" "+iheight);
			}
		}
	}, 0);
}

