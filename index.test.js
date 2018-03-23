var QRCode = require('qrcode');

describe("test", function () {
    it('should test', function () {
        QRCode.toDataURL('I am a pony!', function (err, url) {
            console.log(url)
        });
    });
});