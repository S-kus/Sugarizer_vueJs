/**
 * @module SearchField
 * @desc This is an searchBox component to take input
 * @vue-prop {String} [text='empty String'] - placeholder value for search-box
 * @vue-prop {Boolean} [showCancel=false] - conditional data to show the cancel.svg
 * @vue-prop {String} [searchQuery='empty String'] - stores input value of searchBox
 * @vue-data {Number} [componentKey=0] - key of icon component
 */
const SearchField ={
	name: 'SearchField',
	template: `
		<div id="searchField" ref="searchField" class="search-field-border search-field-border-nofocus">
			<div class="search-field-iconsearch"></div>
			<input 
				class="search-field-input" id="text" ref="text"
				type="text" v-model="searchQuery" 
				:placeholder="this.placeholderData" 
				@focus="onFocus" @blur="onBlur"
			/>
			<div v-if="showCancel"
				class="search-field-iconcancel"
				v-on:click="cancelClicked"
			></div>
		</div>
	`,
	props: ['placeholder'],
	data() {
		return {
			placeholderData: this.placeholder? this.placeholder: '',
			showCancel: false,
			searchQuery: ''
		}
	},
	watch: {
		placeholderData: function(newData, oldData) {
			this.placeholderData= newData
		}, 
		searchQuery: function(value) {
			this.$emit('inputChanged',value)
			if(value.length>0)
				this.showCancel= true
			else
				this.showCancel= false
		}
	},
	methods: {
		/** 
		 * @memberOf module:SearchField.methods
		 * @method onFocus
		 * @desc updates classes of component if input box is active
		 */
		onFocus() {
			var element = this.$refs.searchField;
			element.classList.remove("search-field-border-nofocus");
			element.classList.add("search-field-border-focus");
		},
		/** 
		 * @memberOf module:SearchField.methods
		 * @method onBlur
		 * @desc updates classes if input box is not active
		 */
		onBlur() {
			var element = this.$refs.searchField;
			element.classList.remove("search-field-border-focus");
			element.classList.add("search-field-border-nofocus");
		},
		/** 
		 * @memberOf module:SearchField.methods
		 * @method cancelClicked
		 * @desc clear the searchBox input if cancel svg clicked
		 */
		cancelClicked() {
			this.searchQuery=''
		}
	}
};

if (typeof module !== 'undefined') module.exports = { SearchField }