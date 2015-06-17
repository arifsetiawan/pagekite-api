var xmlrpc = require('xmlrpc');
var _ = require('lodash');

var options = {
  url : 'https://pagekite.net/xmlrpc/'
}

var client = xmlrpc.createSecureClient(options);

var defaults = {
  verbose: true,
}

var PageKite = function(username, password, options) {

  this.username = username;
  this.password = password;
  this.acct_id = null;
  this.credential = null;
  this.options = _.extend(defaults, options);
};

/**
 * Helper
 */
PageKite.prototype.methodCall = function(method, params, cb) {
  var self = this;
  
  if (!params) params = [];

  if (!this.acct_id) {
    return cb(new Error('Account Id is not set. Should login first'));
  }

  if (!this.credential) {
    return cb(new Error('Credential is not set. Should login first'));
  }

  params.unshift(this.credential);
  params.unshift(this.acct_id);
  client.methodCall(method, params, function (err, value) {
    self.responseHandler(err, value, cb);
  });
};

PageKite.prototype.responseHandler = function(err, value, cb) {
  if (err) {
    if (this.options.verbose) {
      console.log('error:', err);
      console.log('req headers:', err.req && err.req._header);
      console.log('res code:', err.res && err.res.statusCode);
      console.log('res body:', err.body);
    }
    return cb(err);
  } 
  else {

    if (this.options.verbose) {
      console.log('Response', err, value);
    }

    if (value[0] === 'ok') {
      // if ok, value[1] is the result payload
      return cb(null, value[1]);
    }
    else {
      return cb(new Error('Response ' + value[0] + ' with message ' + value[1]));
    }
  }
}

/**
 * Account
 */
PageKite.prototype.login = function(cb) {
  var self = this;
  client.methodCall('login', [this.username, this.password, ''], function (err, value) {
    self.responseHandler(err, value, function(err, value) {
      if (err) {
        return cb(err);
      }
      else {
        self.acct_id = value[0];
        self.credential = value[1];
        return cb(null, value);
      }
    })
  });
};

PageKite.prototype.logout = function(cb) {
  var self = this;
  this.methodCall('logout', [false], function (err, value) {
    if (err) {
      return cb(err);
    }
    else {
      self.acct_id = null;
      self.credential = null;
      return cb(null, value);
    }
  });
};

/**
 * Kite
 */
PageKite.prototype.getAvailableDomains = function(cb) {
  this.methodCall('get_available_domains', [], cb);
};

/**
 * Exports
 */
module.exports = PageKite;