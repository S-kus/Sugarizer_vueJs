const { mount } = require('@vue/test-utils');
if (typeof Icon == 'undefined') Icon = require('../js/icon.js').Icon;
const { SearchField } = require('../js/searchField.js');

const path = require('path');
const filename = path.dirname(__filename);

// Promise to wait a delay
const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('SearchField.vue', () => {
	let wrapper;
	const placeholder="placeHolder for testing";
	beforeEach(() => {
		// Mount object
		wrapper = mount(SearchField, {
			props: { 
				placeholder: placeholder
			},
		})
	});

	it('renders props when passed', () => {
		expect(wrapper.props('placeholder')).toBe(placeholder);
	});
	
	// TODO: tests
})