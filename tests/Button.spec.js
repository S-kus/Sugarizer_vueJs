
const { mount } = require('@vue/test-utils');
const Button = require('../js/Button.js').Button;

describe('Button.vue', () => {
	let wrapper;
	const id = '1';
	const text = 'Button 1';
	beforeEach(() => {
		wrapper = mount(Button, {
			props: { 
				id: id,
				text: text 
			},
		})
	});
	it('renders props.text when passed', () => {
		expect(wrapper.text()).toMatch(text);
		expect(wrapper.props('id')).toBe(id);
		expect(wrapper.props('text')).toBe(text);
	})

	it('changes label of button when passed', async () => {
		await wrapper.setData({textData: 'Button 2'});
		await wrapper.setData({idData: '2'});
		expect(wrapper.html()).toMatch('Button 2');
		expect(wrapper.attributes('id')).toBe('2');
	})
})