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
		"select-box": SelectBox
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
			selectBoxDummyData: {
				id: "15",
				icon: { id: "16", iconData: "icons/star.svg", color: "65", size: "30" },
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
		testFunction: function (event) {
			// this.$refs.icon1.iconData= "icons/star.svg"
			this.$refs.buttonIcon1.iconData="icons/owner-icon.svg"
			// this.$refs.buttonIcon1.disabledData= "text changed"
			this.$refs.buttonIcon1.textData= "text changed"
		},
		searchFunction(searchInput) {
			this.filterProducts = this.products.filter((product) => {
				return product.name.toUpperCase().includes(searchInput.toUpperCase())
			})
		}
	},
});

app.mount('#app');