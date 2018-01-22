var expect = require('expect');

var {generateMessage} = require('./message');

describe('Returns message data', () => {
    it('it should return message data', () => {
        var from  = 'Harris';
        var text = 'This is text';
        var response = generateMessage(from, text);
        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({from ,text});
    });
});