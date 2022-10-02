const SearchField ={
    name: 'SearchField',
    template: `
        <div id="searchField" class="search-field-border search-field-border-nofocus">
            <div class="search-field-iconsearch"></div>
            <input 
                class="search-field-input" id="text"
                type="text" v-model="input" 
                :placeholder="this.placeholderData" 
                @focus="onFocus" @blur="onBlur"
                v-model="searchQuery"
            />
            <button-icon v-if="showCancel"
                class="search-field-iconcancel"
                :svgfile=this.iconData 
                v-on:click="cancelClicked"
            ></button-icon>
        </div>
    `,
    props: ['placeholder', 'icons'],
    components: {
        'button-icon': Icon, 
    },
    data() {
        return {
            placeholderData: this.placeholder? this.placeholder: '',
            showCancel: true,
            iconData: "icons/entry-cancel.svg"
        }
    },
    watch: {
        placeholderData: function(newData, oldData) {
            this.placeholderData= newData
        }, 
    },
    computed: {
        vm: this,
        searchResults: function(){
            return this.IconArray.filter((icon) => {
                return IconArray.name.match(this.search);
            });
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
            console.log("cancelClicked")
        }
    }
};