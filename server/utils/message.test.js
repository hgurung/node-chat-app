var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('Returns message data', () => {
    it('it should return message data', () => {
        var from  = 'Harris';
        var text = 'This is text';
        var response = generateMessage(from, text);
        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({from ,text});
    });
});

describe('Generate location message', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = '27.685114';
        var longitude = '85.3203229';
        var response = generateLocationMessage(from, latitude, longitude);
        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({from ,url:  `https://www.google.com/maps?q=${latitude},${longitude}`});
    });
});