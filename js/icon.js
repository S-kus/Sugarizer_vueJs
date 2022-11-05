
/**
 * @module Icon
 * @desc This is an icon
 * @vue-prop {Number} initialCounter
 * @vue-prop {Number} [step=1] Step
 * @vue-data {Number} counter - Current counter's value
 * @vue-computed {Array.<String>} fooList - A list of foo
 * @vue-computed {Array.<String>} barList - A list of bar
 * @vue-computed {String} message A message
 */
const Icon ={
	name: 'Icon',
	template: `<div class="icon" v-html="gensvg" :id="this.idData"></div>`,
	// id, fileUrl, color, size, left and top margin, native property of icon
	props: ['id','svgfile','color','size','x','y','isNative'],
	data() {
		return {
			// stores svg text in raw form after native icon loaded
			svg: null,
			// id prop data of icon
			idData: this.id,
			// native property of icon, false by default
			isSugarNative : this.isNative=="true"? true: false,
			// fileUrl prop data of icon
			iconData: this.svgfile,
			// size prop data of icon
			sizeData: this.size? this.size: 55,
			// color prop data of icon
			colorData: this.color? this.color: 512,
			// positions(margin) prop (x,y) data of icon
			xData: this.x ? this.x: 0,
			yData: this.y ? this.y: 0,
			// stores current svg element of the icon
			_element: null
		}
	},
	async created() {
		var vm = this;
		// ready the raw svg data of the Native icons
		if(this.isSugarNative) {
			await this._loadIcon(this.svgfile).then(function(svg) {
				vm.svg=svg;
			});
		}
	},
	mounted() {
		// to render the newformat icon
		if(!this.isSugarNative) {
			this.createIcon(this.svgfile, this.colorData, this.sizeData);
		}
	},
	computed: {
		// genrating final svg of oldSvg format
		// takes input raw data form of svgfile and return pure SVG (remove Sugar stuff)
		gensvg: function() {
			if (this.svg == null) return "";
			return this._convertSVG(this.svg, this.genid);
		},
		// set id of the icon
		genid: function() {
			return this.idData ? this.idData : this._uid;
		}
	},
	updated: function() {
		// set the _element value by retrieving svgElement from Native icon
		if(this.isSugarNative) {
			let vm=this, element = null;
			let icon= document.getElementById(vm.genid);
			if (!icon) {
				return null;
			}
			for (let i = 0 ; i < icon.children.length && !element ; i++) {
				if (icon.children[i].tagName == "svg") {
					element = icon.children[i];
				}
			}
			vm._element=element;
			vm._setColor(vm, vm.colorData);
			if (vm.size) {
				vm._setSize(vm, vm.size);
			}
		}
	},
	watch: {
		// updates color, position and size of the icon
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
		sizeData: function(newSize, oldSize) {
			var element = this._element;
			element.setAttribute("width", newSize+"px");
			element.setAttribute("height", newSize+"px");
		}
	},
	methods: {
		/** 
		 * @memberOf module:Icon.methods
		 * @method createIcon
		 * @desc create function to set newSvg format icons, append the final svgElement inside the assign parent
		 * @param {String} svgfile - file name
		 * @param {Number} color - color index
		 * @param {Number} size - size value
		 * @param {callback} callback - callback called
		 * @returns {number}
		 */ 
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
		// Load icon url and return raw data of file
		async _loadIcon(url) {
			return new Promise(function(resolve, reject) {
			   axios.get(url).then(function(response) {
					resolve(response.data);
				}).catch(function(error) {
					reject(error);
				});
			});
		},
		// Convert SVG to a pure SVG (remove Sugar stuff) by removing <!DOCTYPE..> tag
		// replacing stroke and fill color variable in new format and adding symbol tag inside the svgElement
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

		// Change CSS color to given color number class
		_setColor(vm, color) {
			let element = vm._element;
			if (element) {
				if (color > 179 && color != 256 && color != 512) {
					color = color % 180;
				}
				element.setAttribute("class", "xo-color"+color);
			}
		},
		// Change CSS size
		_setSize(vm, size) {
			let element = vm._element;
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