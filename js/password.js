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
									v-on:click="emojiClicked(key)"
								>
									<div class="emoji-icon"></div>
									<div class="emoji-letter">{{this.currentEmojis[index-1].letter}}</div>
								</div>
							</div>
							<div class="emojiset2">
								<div class="emoji"
									v-for='index in 5' :key='index'
									v-on:click="emojiClicked(key)"
								>
									<div class="emoji-icon"></div>
									<div class="emoji-letter">{{this.currentEmojis[index+4].letter}}</div>
								</div>
							</div>
						</div>
						<div class="password-emojis-category">
							<div ref="category0" class="emoji-category" v-on:click="category0Clicked">
								<div class="emoji" index="0">
									<div class="emoji-icon"></div>
								</div>
							</div>
							<div ref="category1" class="emoji-category" v-on:click="category1Clicked">
								<div class="emoji" index="10">
									<div class="emoji-icon"></div>
								</div>
							</div>
							<div ref="category2" class="emoji-category" v-on:click="category2Clicked">
								<div class="emoji" index="20">
									<div class="emoji-icon"></div>
								</div>
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
		emojiClicked(index) {
			console.log("emogiClicked "+ index)
		},
		category0Clicked() {
			console.log("category0")
		},
		category1Clicked() {
			console.log("category1")
		},
		category2Clicked() {
			console.log("category2")
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