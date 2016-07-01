import assert from 'assert';
import serverNotifier from '../lib';

var emailConfig = require('./config/mail');
var smsConfig = require('./config/sms');

var path = require('path');

describe('server-notifier', function () {
  it('should fail to send sms!', function () {
    var catched = false;
    try {
      serverNotifier({}, {}, function (error) {
        assert(!error);
      });
    } catch (e) {
      catched = true;
    }
    assert(catched);
  });
  describe('email', function () {
    var options = {
      type: 'email',
      toUser: 'calidion@gmail.com',
      title: 'title',
      options: {
        captcha: 'eeodo'
      },
      path: path.resolve(__dirname, './data'),
      template: 'email.html'
    };
    it('should be able to send emails!', function (done) {
      serverNotifier(emailConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should fail to send emails!', function (done) {
      serverNotifier({}, options, function (error) {
        assert(error);
        done();
      });
    });

    it('should be able to send emails!', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      serverNotifier(emailConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should be able to send emails!', function (done) {
      options.toUser = 'sdfsfdf';
      serverNotifier(emailConfig, options, function (error) {
        assert(error);
        done();
      });
    });
  });


  describe('sms', function () {
    var phone = process.env.NN_SMS_PHONE;
    var options = {
      type: 'sms',
      toUser: phone,
      params: ['1388223'],
      id: 22340
    };
    it('should be able to send sms!', function (done) {
      serverNotifier(smsConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should be able to send sms!', function (done) {
      process.env.NOTIFIER_BYPASS = 0;
      serverNotifier(smsConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should be able to send sms!', function (done) {
      process.env.NOTIFIER_BYPASS = 0;
      options.toUser = 'sdfs9s';
      serverNotifier(smsConfig, options, function (error) {
        assert(error);
        done();
      });
    });

    it('should be able to send sms!', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      options.toUser = 'sdfs9s';
      serverNotifier({}, options, function (error) {
        assert(error);
        done();
      });
    });
  });
});
