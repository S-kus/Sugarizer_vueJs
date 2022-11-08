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
 * @vue-data {Array.<Object>} filterProducts - products filtered array based on input in searchBox
 * @vue-data {Object.<Object>} popupDummyData - dummy data of popup component
 * @vue-data {Object.<Object>} popupData - popup div data based on selected icon
 * @vue-data {Object.<Object>} selectBoxDummyData - dummy data of selectBox component
 * @vue-data {Object.<Object>} FilterBoxData - dummy data of filter component
 * @vue-data {Array.<Object>} passwordData - dummy data of password component
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
			},
			PasswordData: [
				{"name": "dog", "value": "1F436", "letter": "a", "category": "animal"},
				{"name": "cat", "value": "1F431", "letter": "b", "category": "animal"},
				{"name": "cow", "value": "1F42E", "letter": "c", "category": "animal"},
				{"name": "horse", "value": "1F434", "letter": "d", "category": "animal"},
				{"name": "pig", "value": "1F437", "letter": "e", "category": "animal"},
				{"name": "mouse", "value": "1F42D", "letter": "f", "category": "animal"},
				{"name": "rabbit", "value": "1F430", "letter": "g", "category": "animal"},
				{"name": "bear", "value": "1F43B", "letter": "h", "category": "animal"},
				{"name": "chicken", "value": "1F414", "letter": "i", "category": "animal"},
				{"name": "fish", "value": "1F41F", "letter": "j", "category": "animal"},
			
				{"name": "smiling", "value": "1F60A", "letter": "k", "category": "emoticon"},
				{"name": "winking", "value": "1F609", "letter": "l", "category": "emoticon"},
				{"name": "angry", "value": "1F620", "letter": "m", "category": "emoticon"},
				{"name": "grinning", "value": "1F600", "letter": "n", "category": "emoticon"},
				{"name": "heart-eyes", "value": "1F60D", "letter": "o", "category": "emoticon"},
				{"name": "sunglasses", "value": "1F60E", "letter": "p", "category": "emoticon"},
				{"name": "pensive", "value": "1F614", "letter": "q", "category": "emoticon"},
				{"name": "astonished", "value": "1F632", "letter": "r", "category": "emoticon"},
				{"name": "crying", "value": "1F622", "letter": "s", "category": "emoticon"},
				{"name": "screaming", "value": "1F631", "letter": "t", "category": "emoticon"},
			
				{"name": "apple", "value": "1F34E", "letter": "u", "category": "food"},
				{"name": "banana", "value": "1F34C", "letter": "v", "category": "food"},
				{"name": "grapes", "value": "1F347", "letter": "w", "category": "food"},
				{"name": "cherry", "value": "1F352", "letter": "x", "category": "food"},
				{"name": "strawberry", "value": "1F353", "letter": "y", "category": "food"},
				{"name": "hamburger", "value": "1F354", "letter": "z", "category": "food"},
				{"name": "pizza", "value": "1F355", "letter": "0", "category": "food"},
				{"name": "cake", "value": "1F382", "letter": "1", "category": "food"},
				{"name": "cocktail", "value": "1F378", "letter": "2", "category": "food"},
				{"name": "coffee", "value": "2615", "letter": "3", "category": "food"},
			
				{"name": "soccer", "value": "26BD", "letter": "4", "category": "sport"},
				{"name": "baseball", "value": "26BE", "letter": "5", "category": "sport"},
				{"name": "basket", "value": "1F3C0", "letter": "6", "category": "sport"},
				{"name": "football", "value": "1F3C8", "letter": "7", "category": "sport"},
				{"name": "tennis", "value": "1F3BE", "letter": "8", "category": "sport"},
				{"name": "bowling", "value": "1F3B3", "letter": "9", "category": "sport"},
				{"name": "golf", "value": "26F3", "letter": "A", "category": "sport"},
				{"name": "target", "value": "1F3AF", "letter": "B", "category": "sport"},
				{"name": "skying", "value": "1F3BF", "letter": "C", "category": "sport"},
				{"name": "video", "value": "1F3AE", "letter": "D", "category": "sport"},
			
				{"name": "car", "value": "1F697", "letter": "E", "category": "travel"},
				{"name": "bicycle", "value": "1F6B2", "letter": "F", "category": "travel"},
				{"name": "train", "value": "1F685", "letter": "G", "category": "travel"},
				{"name": "airplane", "value": "2708", "letter": "H", "category": "travel"},
				{"name": "helicopter", "value": "1F681", "letter": "I", "category": "travel"},
				{"name": "boat", "value": "1F6A2", "letter": "J", "category": "travel"},
				{"name": "sailboat", "value": "26F5", "letter": "K", "category": "travel"},
				{"name": "bus", "value": "1F68C", "letter": "L", "category": "travel"},
				{"name": "tractor", "value": "1F69C", "letter": "M", "category": "travel"},
				{"name": "rocket", "value": "1F680", "letter": "N", "category": "travel"},
			
				{"name": "watch", "value": "231A", "letter": "O", "category": "things"},
				{"name": "gift", "value": "1F381", "letter": "P", "category": "things"},
				{"name": "trophey", "value": "1F3C6", "letter": "Q", "category": "things"},
				{"name": "computer", "value": "1F4BB", "letter": "R", "category": "things"},
				{"name": "television", "value": "1F4FA", "letter": "S", "category": "things"},
				{"name": "guitar", "value": "1F3B8", "letter": "T", "category": "things"},
				{"name": "book", "value": "1F4D6", "letter": "U", "category": "things"},
				{"name": "wrench", "value": "1F527", "letter": "V", "category": "things"},
				{"name": "telephone", "value": "260E", "letter": "W", "category": "things"},
				{"name": "camera", "value": "1F4F7", "letter": "X", "category": "things"}
			]
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
		 * @desc call show() of Popup component with position as parameter and data to be displayed as prop
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