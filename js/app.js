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
		"select-box": SelectBox
	},
	data() {
		return {
			message: "Sugarizer in Vue",
			// SearchField Dummy data
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
			// SearchField array data based on input
			filterProducts: null,
			// Popup data based on selected icon
			popupData: null,
			// Popup Dummy data
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
			// SelectBox Dummy data
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
		// updates color of icons
		changeColor() {
			this.$refs.icon1.colorData=Math.floor(Math.random() * 179);
			this.$refs.icon2.colorData=Math.floor(Math.random() * 179);
		},
		// updates position of icons
		changePosition() {
			this.$refs.icon1.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon1.yData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.yData=Math.floor(Math.random() * 100) + 1;
		},
		// updates size of icons
		changeSize() {
			this.$refs.icon1.sizeData=Math.floor(Math.random() * 80) + 20;
			this.$refs.icon2.sizeData=Math.floor(Math.random() * 80) + 20;
		},
		// IconButton component
		// updates data of text, icon and disablity of buttonIcon
		testFunction: function (event) {
			// this.$refs.icon1.iconData= "icons/star.svg"
			this.$refs.buttonIcon1.iconData="icons/owner-icon.svg"
			// this.$refs.buttonIcon1.disabledData= "text changed"
			this.$refs.buttonIcon1.textData= "text changed"
		},
		// SearchField component
		// updates displayed products based on input in searchBox
		searchFunction(searchInput) {
			this.filterProducts = this.products.filter((product) => {
				return product.name.toUpperCase().includes(searchInput.toUpperCase())
			})
		},
		// Popup component
		// call show() of Popup component with position as parameter and data as prop
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
		// check for cursor position and call hide() to hide the popup
		removePopupFunction(e) {
			if(!this.$refs.popup.isCursorInside(e.clientX, e.clientY)){
				this.$refs.popup.hide();
			}
		},
		// display clicked item of popup after emit itemis-clicked
		itemisClicked(item) {
			console.log(item);
		},
		// SelectBox component
		// display clicked item of popup after emit option-selected
		optionSelected(e) {
			var obj= JSON.parse(JSON.stringify(e))
			console.log(obj);
		}
	},
});

app.mount('#app');