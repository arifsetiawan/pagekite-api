
var PageKite = require('../');

var pagekite = new PageKite('account-identifier (email)', 'access-credentials (password)');

pagekite.login(function(err, result) {
  
  pagekite.getAvailableDomains(function(err, result){
    
    pagekite.logout(function(err, result) {
    })

  })

});
