const { mount } = require('@vue/test-utils');
if (typeof Icon == 'undefined') Icon = require('../js/icon.js').Icon;
const { Palette } = require('../js/palette.js');

const path = require('path');
const filename = path.dirname(__filename);

// Promise to wait a delay
const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('Palette.vue', () => {
	let wrapper;
	const id= 1;
	const ownerIcon="file://"+filename+"\\../icons/owner-icon.svg" ;
	const abcd="file://"+filename+"\\../icons/abcd.svg" ;
	const write="file://"+filename+"\\../icons/write.svg" ;
	const star="file://"+filename+"\\../icons/star.svg" ;
	const option1= {
        icon: { id: "2", iconData: abcd, color: "1024", size: "18" },
        name: "abcd",
        header: "Select Filter",
        filterList: [
            { icon: { id: "3", iconData: ownerIcon, color: "1024", size: "20" }, name: "item1" },
            { icon: { id: "4", iconData: write, color: "1024", size: "18" }, name: "item2" },
            { icon: { id: "5", iconData: abcd, color: "1024", size: "18" }, name: "item3" },
            { icon: { id: "6", iconData: star, color: "1024", size: "18" }, name: "item4" },
            { icon: { id: "7", iconData: write, color: "1024", size: "18" }, name: "item5" }
        ]
    };
    var option2= {
        icon: { id: "8", iconData: "icons/star.svg", color: "1024", size: "18" },
        name: "Star",
        header: "Select Display",
        filterList: [
            { name: "item1" },
            { name: "item2" },
            { name: "item3" },
            { name: "item4" },
            { name: "item5" }
        ]
    };
	beforeEach(() => {
		// HACK: Create parent in document since it's not created during mount
		let parent = document.createElement("div");
		parent.setAttribute("id", id);
		document.lastElementChild.appendChild(parent);

		// Mount object
		wrapper = mount(Palette, {
			props: { 
				options: option1
			},
		})
	});

	it('renders props when passed', () => {
		expect(wrapper.props('options')).toStrictEqual(option1);
	});

	it('update optionsData when passed', () => {
		expect(wrapper.find('.palette-text').text()).toBe('abcd');

		wrapper = mount(Palette, {
			props: { 
				options: option2
			},
		})
		expect(wrapper.find('.palette-text').text()).toBe('Star');
	});

	it('emits message, updated paletteBox and close subPopup on selecting option when passed', async () => {
		expect(wrapper.find('.palette-text').text()).toBe('abcd');

		await wrapper.vm.showPalette();
		const items= wrapper.findAll('.palette-items-item')
		expect(wrapper.findAll('.palette-items-item').length).toBe(5)

		await items.at(1).trigger('click')
		expect(wrapper.emitted('filterSelected')).toBeTruthy()
		expect(wrapper.emitted('filterSelected')[0]).toEqual([option1.filterList[1]])

		expect(wrapper.find('.palette-text').text()).toBe(option1.filterList[1].name);
		expect(wrapper.findAll('.palette-items-item').length).toBe(0)
	});

	it('show and hide subPopup when passed', async () => {
		expect(wrapper.find('.palette-content').exists()).toBe(false);

		await wrapper.vm.showPalette();
		expect(wrapper.find('.palette-content').exists()).toBe(true);

		await wrapper.vm.removePalette();
		expect(wrapper.find('.palette-content').exists()).toBe(false);
	});

	it('show and hide subPopup when passed', async () => {
		expect(wrapper.find('.palette-content').exists()).toBe(false);

		await wrapper.vm.showPalette();
		expect(wrapper.find('.palette-content').exists()).toBe(true);

		await wrapper.vm.removePalette();
		expect(wrapper.find('.palette-content').exists()).toBe(false);
	});

	it('should render prroperly with different values of filterList and header when passed', async () => {
		await wrapper.vm.showPalette();
		expect(wrapper.find('.palette-content').exists()).toBe(true);
		// filterList is null
		option2= {
			icon: { id: "8", iconData: "icons/star.svg", color: "1024", size: "18" },
			name: "Star",
			header: "Select Display"
		};
		wrapper = mount(Palette, {
			props: { 
				options: option2
			},
		})
		await wrapper.vm.showPalette();
		expect(wrapper.find('.paletteBox').exists()).toBe(true);
		expect(wrapper.find('.palette-content').exists()).toBe(false);
		// filterList with length 0
		option2= {
			icon: { id: "8", iconData: "icons/star.svg", color: "1024", size: "18" },
			name: "Star",
			header: "Select Display",
			filterList: []
		};
		wrapper = mount(Palette, {
			props: { 
				options: option2
			},
		})
		await wrapper.vm.showPalette();
		expect(wrapper.find('.paletteBox').exists()).toBe(true);
		expect(wrapper.find('.palette-content').exists()).toBe(false);
		// paletteBox with name only
		option2= {
			name: "Star",
			header: "Select Display",
			filterList: [
				{ name: "item1" },
				{ name: "item2" },
				{ name: "item3" },
				{ name: "item4" },
				{ name: "item5" }
			]
		};
		wrapper = mount(Palette, {
			props: { 
				options: option2
			},
		})
		expect(wrapper.find('.paletteBox').exists()).toBe(true);
		// paletteBox with icon only
		option2= {
			icon: { id: "8", iconData: "icons/star.svg", color: "1024", size: "18" },
			header: "Select Display",
			filterList: [
				{ name: "item1" },
				{ name: "item2" },
				{ name: "item3" },
				{ name: "item4" },
				{ name: "item5" }
			]
		};
		wrapper = mount(Palette, {
			props: { 
				options: option2
			},
		})
		expect(wrapper.find('.paletteBox').exists()).toBe(true);
		// paletteBox with no icon or name
		option2= {
			header: "Select Display",
			filterList: [
				{ name: "item1" },
				{ name: "item2" },
				{ name: "item3" },
				{ name: "item4" },
				{ name: "item5" }
			]
		};
		wrapper = mount(Palette, {
			props: { 
				options: option2
			},
		})
		expect(wrapper.find('.paletteBox').exists()).toBe(false);
	});
})