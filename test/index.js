import assert from 'assert';
import messager from '../lib';

var emailConfig = require('./config/mail');
var smsConfig = require('./config/sms');

var path = require('path');

describe('egg-messager', function () {
  it('should fail to send sms!', function () {
    var catched = false;
    try {
      messager({}, {}, function (error) {
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
      messager(emailConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should fail to send emails!', function (done) {
      messager({}, options, function (error) {
        assert(error);
        done();
      });
    });

    it('should be able to send emails!', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      messager(emailConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should be able to send emails!', function (done) {
      options.toUser = 'sdfsfdf';
      messager(emailConfig, options, function (error) {
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
      messager(smsConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should be able to send sms!', function (done) {
      process.env.NOTIFIER_BYPASS = 0;
      messager(smsConfig, options, function (error) {
        assert(!error);
        done();
      });
    });

    it('should be able to send sms!', function (done) {
      process.env.NOTIFIER_BYPASS = 0;
      options.toUser = 'sdfs9s';
      messager(smsConfig, options, function (error) {
        assert(error);
        done();
      });
    });

    it('should be able to send sms!', function (done) {
      process.env.NOTIFIER_BYPASS = 1;
      options.toUser = 'sdfs9s';
      messager({}, options, function (error) {
        assert(error);
        done();
      });
    });
  });
});
