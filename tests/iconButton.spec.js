const { mount } = require('@vue/test-utils');
const { Icon } = require('../js/icon.js');
const { IconButton } = require('../js/iconbutton.js');

const path = require('path');
const filename = path.dirname(__filename);

// Promise to wait a delay
const delay = time => new Promise(resolve => setTimeout(resolve, time));

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
                text: buttonText,
                disabled: disabled
            },
        })
    });
    it('renders props when passed', async () => {
        await delay(1000);
        expect(wrapper.props('id')).toBe(id);
        expect(wrapper.props('svgfile')).toBe(svgfile);
        expect(wrapper.props('color')).toBe(color);
        expect(wrapper.props('size')).toBe(size);
        expect(wrapper.props('x')).toBe(x);
        expect(wrapper.props('y')).toBe(y);
        expect(wrapper.props('text')).toBe(text);
        expect(wrapper.props('disabled')).toBe(disabled);

    });
})