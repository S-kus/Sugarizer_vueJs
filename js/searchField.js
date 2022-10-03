const SearchField ={
    name: 'SearchField',
    template: `
        <div id="searchField" class="search-field-border search-field-border-nofocus">
            <div class="search-field-iconsearch"></div>
            <input 
                class="search-field-input" id="text"
                type="text" v-model="searchQuery" 
                :placeholder="this.placeholderData" 
                @focus="onFocus" @blur="onBlur"
            />
            <button-icon v-if="showCancel"
                class="search-field-iconcancel"
                :svgfile=this.iconData 
                v-on:click="cancelClicked"
            ></button-icon>
        </div>
    `,
    props: ['placeholder'],
    components: {
        'button-icon': Icon, 
    },
    data() {
        return {
            placeholderData: this.placeholder? this.placeholder: '',
            showCancel: false,
            iconData: "icons/entry-cancel.svg",
            searchQuery: ''
        }
    },
    watch: {
        placeholderData: function(newData, oldData) {
            this.placeholderData= newData
        }, 
        searchQuery: function(value) {
            this.$emit('input-changed',value)
            if(value.length>0)
                this.showCancel= true
            else
                this.showCancel= false
        }
    },
    methods: {
        onFocus() {
            var element = document.getElementById("searchField");
            element.classList.remove("search-field-border-nofocus");
            element.classList.add("search-field-border-focus");
        },
        onBlur() {
            var element = document.getElementById("searchField");
            element.classList.remove("search-field-border-focus");
            element.classList.add("search-field-border-nofocus");
        },
        cancelClicked() {
            this.searchQuery=''
        }
    }
};