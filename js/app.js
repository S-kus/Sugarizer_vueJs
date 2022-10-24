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
		"icon": Icon,
		"icon-button": IconButton,
		"search-field": SearchField,
		"popup": Popup,
		"select-box": SelectBox,
		"Palette": Palette
	},
	data() {
		return {
			message: "Sugarizer in Vue",
			// SearchField data
			products: [
				{ name: "Keyboard", price: 44, category: 'Accessories'},
				{ name: "Mouse", price: 20, category: 'Accessories'},
				{ name: "Monitor", price: 399, category: 'Accessories'},
				{ name: "Dell XPS", price: 599, category: 'Laptop'},
				{ name: "MacBook Pro", price: 899, category: 'Laptop'},
				{ name: "Pencil Box", price: 6, category: 'Stationary'},
				{ name: "Pen", price: 2, category: 'Stationary'},
				{ name: "USB Cable", price: 7, category: 'Accessories'},
				{ name: "Eraser", price: 2, category: 'Stationary'},
				{ name: "Highlighter", price: 5, category: 'Stationary'}
			],
			filterProducts: null,
			// Popup data
			popupData: null,
			popupDummyData: {
				4: {
					id: "4",
					icon: { id: "6", iconData: "icons/star.svg", color: "65", size: "30" },
					name: "Star",
					title: "Star Activity",
					itemList: [
						{ icon: { id: "7", iconData: "icons/star.svg", color: "65", size: "20" }, name: "item1" },
						{ icon: { id: "8", iconData: "icons/star.svg", color: "65", size: "20" }, name: "item2" }
					],
					footerList: [
						{ icon: { id: "9", iconData: "icons/star.svg", color: "1024", size: "20" }, name: "footer1" },
					],
				},
				5: {
					id: "5",
					icon: { id: "11", iconData: "icons/write.svg", color: "95", size: "30"},
					name: "Write",
					title: "Write Activity",
					itemList: [
						{ icon: { id: "12", iconData: "icons/write.svg", color: "95", size: "20" }, name: "item1" },
						{ icon: { id: "13", iconData: "icons/write.svg", color: "95", size: "20" }, name: "item2" }
					],
					footerList: [
						{ icon: { id: "14", iconData: "icons/write.svg", color: "1024", size: "20" }, name: "footer1" },
					],
				}
			},
			// SelectBox data
			selectBoxDummyData: {
				id: "15",
				icon: { id: "16", iconData: "icons/star.svg", color: "65", size: "20" },
				name: "Star",
				itemList: [
					{ icon: { id: "17", iconData: "icons/owner-icon.svg", color: "65", size: "20" }, name: "item1" },
					{ icon: { id: "18", iconData: "icons/abcd.svg", color: "65", size: "20" }, name: "item2" },
					{ icon: { id: "19", iconData: "icons/write.svg", color: "65", size: "20" }, name: "item3" },
					{ icon: { id: "20", iconData: "icons/star.svg", color: "65", size: "20" }, name: "item4" },
					{ icon: { id: "21", iconData: "icons/abcd.svg", color: "65", size: "20" }, name: "item5" }
				]
			},
			// Palette data
			Palette1Data: {
				icon: { id: "22", iconData: "icons/abcd.svg", color: "1024", size: "18" },
				name: "abcd",
				header: "Select Filter",
				filterList: [
					{ icon: { id: "23", iconData: "icons/owner-icon.svg", color: "1024", size: "20" }, name: "item1" },
					{ icon: { id: "24", iconData: "icons/write.svg", color: "1024", size: "18" }, name: "item2" },
					{ icon: { id: "25", iconData: "icons/abcd.svg", color: "1024", size: "18" }, name: "item3" },
					{ icon: { id: "26", iconData: "icons/star.svg", color: "1024", size: "18" }, name: "item4" },
					{ icon: { id: "27", iconData: "icons/write.svg", color: "1024", size: "18" }, name: "item5" }
				]
			},
			Palette2Data: {
				icon: { id: "28", iconData: "icons/star.svg", color: "1024", size: "18" },
				name: "Star",
				header: "Select Display",
				filterList: [
					{ name: "item1" },
					{ name: "item2" },
					{ name: "item3" },
					{ name: "item4" },
					{ name: "item5" }
				]
			}
		}
	},
	mounted() {
		this.filterProducts=this.products
	},
	watch: {
		filterProducts: function(newData, oldData) {
			this.filterProducts= newData
		}, 
	},
	methods: {
		// Icon component
		changeColor() {
			this.$refs.icon1.colorData=Math.floor(Math.random() * 179);
			this.$refs.icon2.colorData=Math.floor(Math.random() * 179);
		},
		changePosition() {
			this.$refs.icon1.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon1.yData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.yData=Math.floor(Math.random() * 100) + 1;
		},
		changeSize() {
			this.$refs.icon1.sizeData=Math.floor(Math.random() * 80) + 20;
			this.$refs.icon2.sizeData=Math.floor(Math.random() * 80) + 20;
		},
		// IconButton component
		testFunction: function (event) {
			// this.$refs.icon1.iconData= "icons/star.svg"
			this.$refs.buttonIcon1.iconData="icons/owner-icon.svg"
			// this.$refs.buttonIcon1.disabledData= "text changed"
			this.$refs.buttonIcon1.textData= "text changed"
		},
		// SearchField component
		searchFunction(searchInput) {
			this.filterProducts = this.products.filter((product) => {
				return product.name.toUpperCase().includes(searchInput.toUpperCase())
			})
		},
		// Popup component
		showPopupFunction(e) {
			var itemId, x, y;
			if(e.target.tagName=='svg') {
				itemId= e.target.parentElement.id
				x= e.clientX-4;
				y= e.clientY-4;
			}
			else if(e.target.tagName=='use') {
				itemId= e.target.parentElement.parentElement.id
				x= e.clientX;
				y= e.clientY;
			}
			else {
				itemId= e.target.id;
				x= e.clientX-12;
				y= e.clientY-12;
			}
			var obj= JSON.parse(JSON.stringify(this.popupDummyData))
			this.popupData= obj[itemId];
			this.$refs.popup.show(x,y);
		},
		removePopupFunction(e) {
			if(!this.$refs.popup.isCursorInside(e.clientX, e.clientY)){
				this.$refs.popup.hide();
			}
		},
		itemisClicked(item) {
			console.log(item);
		},
		// SelectBox component
		optionSelected(e) {
			var obj= JSON.parse(JSON.stringify(e))
			console.log(obj);
		},
		// Palette component
		filterSelected(e) {
			var obj= JSON.parse(JSON.stringify(e))
			console.log(obj);
		},
	},
});

app.mount('#app');