
var PageKite = require('../');

var pagekite = new PageKite('email', 'password');

pagekite.login(function(err, result) {
  
  pagekite.getAvailableDomains(function(err, result){
    
    pagekite.logout(function(err, result) {
    })

  })

});
