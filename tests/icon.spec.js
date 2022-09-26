const { mount } = require('@vue/test-utils');
const { Icon } = require('../js/icon.js');

const path = require('path');
const filename = path.dirname(__filename);

// Promise to wait a delay
const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('Button.vue', () => {
    let wrapper;
    let id="1";
    let svgfile="file://"+filename+"\\../icons/owner-icon.svg" ;
    let color="5";
    let size="100";
    let x="-2";
    let y="-4";
    beforeEach(() => {
        // HACK: Create parent in document since it's not created during mount
        let parent = document.createElement("div");
        parent.setAttribute("id", id);
        document.lastElementChild.appendChild(parent);

        // Mount object
        wrapper = mount(Icon, {
            props: { 
                id: id,
                svgfile: svgfile,
                color: color,
                size: size,
                x: x,
                y: y
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

        expect(wrapper.vm._element.getAttribute("height")).toBe('100px');
        expect(wrapper.vm._element.getAttribute("width")).toBe('100px');
    });

    it('changes color and position data when passed', async () => {
        await delay(1000);

        expect(wrapper.vm._element.getAttribute("class")).toBe('xo-color5'); // HACK: get SVG directly in data _element 
        expect(wrapper.vm._element.getAttribute("style")).toBe('margin: -2px -4px');

        await wrapper.setData({colorData: '6'});
        expect(wrapper.vm._element.getAttribute("class")).toBe('xo-color6');

        await wrapper.setData({xData: 100, yData: 200});
        expect(wrapper.vm._element.getAttribute("style")).toBe('margin: 100px 200px');
    });

    it('renders icon with default color, position and size data when passed', async () => {
        color= "";
        size= "";
        x= "";
        y= "";

        wrapper = mount(Icon, {
            props: { 
                id: id,
                svgfile: svgfile,
                color: color,
                size: size,
                x: x,
                y: y
            },
        })

        await delay(1000);
        expect(wrapper.vm._element.getAttribute("class")).toBe('xo-color512');
        expect(wrapper.vm._element.getAttribute("height")).toBe('55px');
        expect(wrapper.vm._element.getAttribute("width")).toBe('55px');
        expect(wrapper.vm._element.getAttribute("style")).toBe('margin: 0px 0px');
    });

    it('should not render icon if svgfile data is empty when passed', async () => {
        svgfile= "";

        wrapper = mount(Icon, {
            props: { 
                id: id,
                svgfile: svgfile,
                color: color,
                size: size,
                x: x,
                y: y
            },
        })

        await delay(1000);
        expect(wrapper.vm._element).toBeNull();
    });
})