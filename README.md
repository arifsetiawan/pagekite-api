# PageKite API

This is a Node.js wrapper for PageKite [XML-RPC API](http://pagekite.net/support/service_api_reference/). Supported API are listed below. 

**NOTE**
This is ongoing work, more API will be added.

## Installation
```
npm install pagekite-api
```

## Basic Usage

```javascript
var Pagekite = require('pagekite-api');

var pagekite = new PageKite('email', 'password');

pagekite.login(function(err, result) {
  
  pagekite.getAvailableDomains(function(err, result){
    
    pagekite.logout(function(err, result) {
    })

  })

});
```

## API

### Supported API Calls

* User Account
  * Login
  * Logout

* Kite Manipulation
  * Get available domains
