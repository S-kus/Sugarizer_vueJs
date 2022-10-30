const Password ={
	name: 'Password',
	template: `<div class="password-class">
				<div class="password-line">
					<div class="password-label"></div>
					<div class="password-input">
						<input 
							class="password-value" id="text" ref="password"
							type="text" v-model="passwordValue"
						/>
						<div v-if="showCancel"
							class="password-iconcancel"
							v-on:click="cancelClicked"
						></div>
					</div>
					<div>
						<div class="password-emojis" v-if="this.currentEmojis.length==10">
							<div class="emojiset1">
								<div class="emoji"
									v-for='index in 5' :key='index'
									v-on:click="emojiClicked($event, key)"
								>
									<div class="emoji-icon" v-html="'&#x'+this.currentEmojis[index-1].value"></div>
									<div class="emoji-letter">{{this.currentEmojis[index-1].letter}}</div>
								</div>
							</div>
							<div class="emojiset2">
								<div class="emoji"
									v-for='index in 5' :key='index'
									v-on:click="emojiClicked($event, key)"
								>
									<div class="emoji-icon" v-html="'&#x'+this.currentEmojis[index+4].value"></div>
									<div class="emoji-letter">{{this.currentEmojis[index+4].letter}}</div>
								</div>
							</div>
						</div>
						<div class="password-emojis-category">
							<div ref="category0" class="emoji-category emoji-selected" v-on:click="category0Clicked">
								<div class="emoji-category-icon" v-html="'&#x'+this.emojisData[category0Index].value"></div>
							</div>
							<div ref="category1" class="emoji-category emoji-unselected" v-on:click="category1Clicked">
								<div class="emoji-category-icon" v-html="'&#x'+this.emojisData[category1Index].value"></div>
							</div>
							<div ref="category2" class="emoji-category emoji-unselected" v-on:click="category2Clicked">
								<div class="emoji-category-icon" v-html="'&#x'+this.emojisData[category2Index].value"></div>
							</div>
						</div>
					</div>
				</div>
			</div>`,
	props: ['emojis'],
	data() {
		return {
			showCancel: false,
			passwordValue: '',
			emojisData: this.emojis,
			currentEmojis: [],
			currentIndex: null,
			category0Index: 0,
			category1Index: 10,
			category2Index: 20
		}
	},
	mounted() {
		this.currentIndex= 0;
	},
	watch: {
		passwordValue: function(newVal, oldVal) {
			console.log(this.emojisData)
			console.log(newVal)
			if(newVal.length>0)
				this.showCancel= true
			else
				this.showCancel= false
		},
		currentIndex: function(newVal) {
			var j=0;
			this.currentIndex= newVal;
			for (var i = newVal ; i <= newVal+9 ; i++,j++) {
				this.currentEmojis[j]= this.emojisData[i];
			}
			console.log(this.currentEmojis)
		}
	},
	methods: {
		cancelClicked() {
			this.passwordValue=''
		},
		emojiClicked(e, index) {
			console.log(e)
			var parentElement= e.explicitOriginalTarget.parentElement;
			parentElement.classList.add("emoji-flash");
			setTimeout(() => {
				parentElement.classList.remove("emoji-flash");
			}, 500);
		},
		category0Clicked() {
			if(this.currentIndex==0)
				return;
			if(this.currentIndex==10) {
				this.currentIndex=0;
				this.$refs.category1.classList.add("emoji-unselected");
				this.$refs.category1.classList.remove("emoji-selected");

				this.$refs.category0.classList.add("emoji-selected");
				this.$refs.category0.classList.remove("emoji-unselected");
			}
			else {
				this.currentIndex= this.category1Index-10;

				this.$refs.category0.classList.add("emoji-unselected");
				this.$refs.category0.classList.remove("emoji-selected");
				this.$refs.category2.classList.add("emoji-unselected");
				this.$refs.category2.classList.remove("emoji-selected");

				this.$refs.category1.classList.add("emoji-selected");
				this.$refs.category1.classList.remove("emoji-unselected");
				this.category0Index= this.category0Index-10;
				this.category1Index= this.category1Index-10;
				this.category2Index= this.category2Index-10;
			}
		},
		category1Clicked() {
			if(this.currentIndex==this.category1Index)
				return;
			if(this.currentIndex==0) {
				this.currentIndex=10;
				this.$refs.category0.classList.add("emoji-unselected");
				this.$refs.category0.classList.remove("emoji-selected");

				this.$refs.category1.classList.add("emoji-selected");
				this.$refs.category1.classList.remove("emoji-unselected");
			}
			else if(this.currentIndex==50) {
				this.currentIndex=40;
				this.$refs.category2.classList.add("emoji-unselected");
				this.$refs.category2.classList.remove("emoji-selected");

				this.$refs.category1.classList.add("emoji-selected");
				this.$refs.category1.classList.remove("emoji-unselected");
			}
		},
		category2Clicked() {
			if(this.currentIndex==50)
				return;
			else if(this.currentIndex==40) {
				this.currentIndex=50;
				this.$refs.category1.classList.add("emoji-unselected");
				this.$refs.category1.classList.remove("emoji-selected");

				this.$refs.category2.classList.add("emoji-selected");
				this.$refs.category2.classList.remove("emoji-unselected");
			}
			else {
				this.currentIndex= this.category1Index+10;

				this.$refs.category0.classList.add("emoji-unselected");
				this.$refs.category0.classList.remove("emoji-selected");
				this.$refs.category2.classList.add("emoji-unselected");
				this.$refs.category2.classList.remove("emoji-selected");

				this.$refs.category1.classList.add("emoji-selected");
				this.$refs.category1.classList.remove("emoji-unselected");
				this.category0Index= this.category1Index;
				this.category1Index= this.category1Index+10;
				this.category2Index= this.category1Index+10;
			}
		},
		// Convert a char to an emoji code and reversly
		convertToEmoji(char) {
			for (var i = 0 ; i < this.emojisData.length ; i++) {
				var item = this.emojisData[i];
				if (item.letter == char) {
					return "0x"+item.value;
				}
			}
			return "";
		},
		convertToChar(emoji) {
			for (var i = 0 ; i < this.emojisData.length ; i++) {
				var item = this.emojisData.emojis[i];
				if (String.fromCodePoint("0x"+item.value) == emoji) {
					return item.letter;
				}
			}
			return "";
		},
	}
};

if (typeof module !== 'undefined') module.exports = { Password }