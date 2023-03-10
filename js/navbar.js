
/**
 * @module Navbar
 * @desc This is an component which is used in every page 
*/
const Navbar ={
	name: 'Navbar',
	template: `<div class="navbar" ref="navbar">
                            <div class="navbar-left">
                                <div class="search-box">
                                    <img :src="svgfile" class="search-image" >
                                    <input type="text" placeholder="Search" class="search">
                                </div>
                             <img :src="queryimage" class="queryimage" >
                             <img :src="warningimage" class="warningimage" >
                            </div>


                          <div class="navbar-right">
                             <img :src="first" class="first-image" alt = "radial">
                             <img :src="second" class="second-image" alt = "neighborhood" >
                             <img :src="third" class="third-image" alt ="list" >
                          </div>

	          </div>`,
	props: ["svgfile","first","second","third","queryimage","warningimage"],
	data() {
		return {
            svgfile: this.svgfile,
            first: this.first,
            second: this.second,
            third: this.third,
            queryimage: this.queryimage,
            warningimage: this.warningimage,
		}
	},
	
};

if (typeof module !== 'undefined') module.exports = { Navbar }