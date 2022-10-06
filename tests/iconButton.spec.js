const { mount } = require('@vue/test-utils');
if (typeof Icon == 'undefined') Icon = require('../js/icon.js').Icon;
const { IconButton } = require('../js/iconbutton.js');

const path = require('path');
const filename = path.dirname(__filename);

describe('IconButton.vue', () => {
	let wrapper;
	const id="1";
	const text="buttonText";
	const svgfile="file://"+filename+"\\../icons/owner-icon.svg" ;
	const color="5";
	const size="100";
	const x="-2";
	const y="-4";
	const disabled=false;
	beforeEach(() => {
		// Mount object
		wrapper = mount(IconButton, {
			props: { 
				id: id,
				svgfile: svgfile,
				color: color,
				size: size,
				x: x,
				y: y,
				text: text,
				disabled: disabled,
				clickFunction: jest.fn()
			},
		})
	});

	it('renders props when passed', () => {
		expect(wrapper.props('id')).toBe(id);
		expect(wrapper.props('svgfile')).toBe(svgfile);
		expect(wrapper.props('color')).toBe(color);
		expect(wrapper.props('size')).toBe(size);
		expect(wrapper.props('x')).toBe(x);
		expect(wrapper.props('y')).toBe(y);
		expect(wrapper.props('text')).toBe(text);
		expect(wrapper.props('disabled')).toBe(disabled);
	});

	it('renders no icon without error if no iconData is given when passed', () => {
		expect(wrapper.find('.icon').exists()).toBe(true);

		wrapper = mount(IconButton, {
			props: { 
				id: id,
				color: color,
				size: size,
				x: x,
				y: y,
				text: text,
				disabled: disabled
			},
		})

		expect(wrapper.find('icon').exists()).toBe(false);
	});

	it('updated textData when passed', async () => {
		expect(wrapper.find('.icon-button-text').text()).toBe('buttonText');

		await wrapper.setData({textData: 'buttonTextUpdated'});
		expect(wrapper.find('.icon-button-text').text()).toBe('buttonTextUpdated');
	});

	it('disabled the button when passed', async () => {
		expect(wrapper.find('.web-activity-disable').exists()).toBe(false);
		await wrapper.setData({disabledData: 'true'});
		expect(wrapper.find('.web-activity-disable').exists()).toBe(true);
	});

	it("clickFunction is called when button is clicked", () => {
		const iconButton = wrapper.find('.icon-button')
		const spy = jest.spyOn(wrapper.vm, 'clickFunction');
		iconButton.trigger('click')
		expect(spy).toHaveBeenCalled()
		jest.restoreAllMocks()
	});

	it('Icon component rendered correctly when passed', () => {
		expect(wrapper.findComponent(Icon).exists()).toBe(true)
	});
})