// Rebase require directory
requirejs.config({
	baseUrl: "lib",
	paths: {
		activity: "../js"
	}
});

/**
 * @module App
 * @desc This is main app component
 * @vue-data {Array.<Object>} products - dummy data of searchField component
 * @vue-data {Array.<Object>} [filterProducts=null] - products filtered array based on input in searchBox
 * @vue-data {Object.<Object>} popupDummyData - dummy data of popup component
 * @vue-data {Object.<Object>} [popupData=null] - popup div data based on selected icon
 * @vue-data {Object.<Object>} selectBoxDummyData - dummy data of selectBox component
 * @vue-data {Object.<Object>} FilterBoxData - dummy data of filter component
 */
const app = Vue.createApp({
	components: {
		"icon": Icon,
		"icon-button": IconButton,
		"search-field": SearchField,
		"popup": Popup,
		"select-box": SelectBox,
		"filter-box": FilterBox,
		"password": Password
	},
	data() {
		return {
			message: "Sugarizer in Vue",
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
			FilterBox1Data: {
				icon: { id: "22", iconData: "icons/abcd.svg", color: "1024", size: "18" },
				name: "abcd",
				header: "Select Filter",
				filterBoxList: [
					{ icon: { id: "23", iconData: "icons/owner-icon.svg", color: "1024", size: "20" }, name: "item1" },
					{ icon: { id: "24", iconData: "icons/write.svg", color: "1024", size: "18" }, name: "item2" },
					{ icon: { id: "25", iconData: "icons/abcd.svg", color: "1024", size: "18" }, name: "item3" },
					{ icon: { id: "26", iconData: "icons/star.svg", color: "1024", size: "18" }, name: "item4" },
					{ icon: { id: "27", iconData: "icons/write.svg", color: "1024", size: "18" }, name: "item5" }
				]
			},
			FilterBox2Data: {
				icon: { id: "28", iconData: "icons/star.svg", color: "1024", size: "18" },
				name: "Star",
				header: "Select Display",
				filterBoxList: [
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
		/** 
		 * @memberOf module:App.methods
		 * @method changeColor
		 * @desc changes color of icon
		 */ 
		changeColor() {
			this.$refs.icon1.colorData=Math.floor(Math.random() * 179);
			this.$refs.icon2.colorData=Math.floor(Math.random() * 179);
		},
		/** 
		 * @memberOf module:App.methods
		 * @method changePosition
		 * @desc changes position of icon
		 */ 
		changePosition() {
			this.$refs.icon1.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon1.yData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.xData=Math.floor(Math.random() * 100) + 1;
			this.$refs.icon2.yData=Math.floor(Math.random() * 100) + 1;
		},
		/** 
		 * @memberOf module:App.methods
		 * @method changeSize
		 * @desc changes size of icon
		 */ 
		changeSize() {
			this.$refs.icon1.sizeData=Math.floor(Math.random() * 80) + 20;
			this.$refs.icon2.sizeData=Math.floor(Math.random() * 80) + 20;
		},
		/** 
		 * @memberOf module:App.methods
		 * @method testFunction
		 * @desc updates data of text, icon and disablity of buttonIcon
		 */ 
		testFunction: function (event) {
			// this.$refs.icon1.iconData= "icons/star.svg"
			this.$refs.buttonIcon1.iconData="icons/owner-icon.svg"
			// this.$refs.buttonIcon1.disabledData= "text changed"
			this.$refs.buttonIcon1.textData= "text changed"
		},
		/** 
		 * @memberOf module:App.methods
		 * @method searchFunction
		 * @desc updates products array based on input in searchBox
		 */ 
		searchFunction(searchInput) {
			this.filterProducts = this.products.filter((product) => {
				return product.name.toUpperCase().includes(searchInput.toUpperCase())
			})
		},
		/** 
		 * @memberOf module:App.methods
		 * @method showPopupFunction
		 * @desc call show() of Popup component with position as parameter and set data to be displayed as prop
		 */ 
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
		/** 
		 * @memberOf module:App.methods
		 * @method removePopupFunction
		 * @desc check for cursor position and call hide() of popup component to hide the popup
		 */ 
		removePopupFunction(e) {
			if(!this.$refs.popup.isCursorInside(e.clientX, e.clientY)){
				this.$refs.popup.hide();
			}
		},
		/** 
		 * @memberOf module:App.methods
		 * @method itemisClicked
		 * @desc display clicked item of popup on emit itemis-clicked
		 */
		itemisClicked(item) {
			console.log(item);
		},
		/** 
		 * @memberOf module:App.methods
		 * @method optionSelected
		 * @desc display clicked item of selectBox popup on emit option-selected
		 */
		optionSelected(e) {
			var obj= JSON.parse(JSON.stringify(e))
			console.log(obj);
		},
		/** 
		 * @memberOf module:App.methods
		 * @method filterSelected
		 * @desc display clicked option of filterBox on emit filter-selected
		 */
		filterSelected(e) {
			var obj= JSON.parse(JSON.stringify(e))
			console.log(obj);
		},
		/** 
		 * @memberOf module:App.methods
		 * @method passwordSet
		 * @desc display set password string value on emit password-set
		 */
		passwordSet(e) {
			console.log("Password: "+e);
		}
	},
});

app.mount('#app');