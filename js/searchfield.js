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
	// placeholder value for search-box
	props: ['placeholder'],
	data() {
		return {
			// placeholder prop data
			placeholderData: this.placeholder? this.placeholder: '',
			// conditional data to show the cancel.svg
			showCancel: false,
			// input value string
			searchQuery: ''
		}
	},
	watch: {
		// updates palceholder value
		placeholderData: function(newData, oldData) {
			this.placeholderData= newData
		}, 
		// if input string is updated ,it will update the showCancel and also emit the search newValue
		searchQuery: function(value) {
			this.$emit('inputChanged',value)
			if(value.length>0)
				this.showCancel= true
			else
				this.showCancel= false
		}
	},
	methods: {
		// updates classes if input box is active
		onFocus() {
			var element = this.$refs.searchField;
			element.classList.remove("search-field-border-nofocus");
			element.classList.add("search-field-border-focus");
		},
		// updates classes if input box is not active
		onBlur() {
			var element = this.$refs.searchField;
			element.classList.remove("search-field-border-focus");
			element.classList.add("search-field-border-nofocus");
		},
		// empty the input string if cancel svg clicked
		cancelClicked() {
			this.searchQuery=''
		}
	}
};

if (typeof module !== 'undefined') module.exports = { SearchField }