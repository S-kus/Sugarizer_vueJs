const Button ={
    name: 'Button',
    template: `<div :id="this.idData">{{ this.textData }}</div>`,
	props: ['id','text'],
    data() {
        return {
            textData: this.text,
            idData: this.id
        }
    }
};

module.exports = { Button }