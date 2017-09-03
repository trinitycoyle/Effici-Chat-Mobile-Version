'use strict';

angular.module('efficiChat.services', ['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .factory('companyFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        	var companyfac = {};

            companyfac.getDepartments = function(){
                                        return $resource(baseURL+"departments/:id",null,  {'update':{method:'PUT' }});
                                    };



                companyfac.getProjects = function(){
                                        return $resource(baseURL+"projects/:id",null,  {'update':{method:'PUT' }});
                                    };
                    
                return companyfac;

        }])

        .factory('messageFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            return $resource(baseURL + "message/:id");
        }])

        //Factory for home chat messages
.factory('messages', function() {
  var messages = {};
  messages.list = [];
  messages.add = function(message){
  messages.list.push({id: messages.list.length, text: message});
  };
  return messages;
})

//Factory for department 1 messages
.factory('messagesOne', function() {
  var messagesOne = {};
  messagesOne.list = [];
  messagesOne.add = function(messageOne){
  messagesOne.list.push({id: messagesOne.list.length, text: messageOne});
  };
  return messagesOne;
})

//Factory for department 2 messages
.factory('messagesTwo', function() {
  var messagesTwo = {};
  messagesTwo.list = [];
  messagesTwo.add = function(messageTwo){
  messagesTwo.list.push({id: messagesTwo.list.length, text: messageTwo});
  };
  return messagesTwo;
})

//Factory for department 3 messages
.factory('messagesThree', function() {
  var messagesThree = {};
  messagesThree.list = [];
  messagesThree.add = function(messageThree){
  messagesThree.list.push({id: messagesThree.list.length, text: messageThree});
  };
  return messagesThree;
})

//Factory for project A messages
.factory('messagesA', function() {
  var messagesA = {};
  messagesA.list = [];
  messagesA.add = function(messageA){
  messagesA.list.push({id: messagesA.list.length, text: messageA});
  };
  return messagesA;
})

//Factory for project B messages
.factory('messagesB', function() {
  var messagesB = {};
  messagesB.list = [];
  messagesB.add = function(messageB){
  messagesB.list.push({id: messagesB.list.length, text: messageB});
  };
  return messagesB;
})

//Factory for project C messages
.factory('messagesC', function() {
  var messagesC = {};
  messagesC.list = [];
  messagesC.add = function(messageC){
  messagesC.list.push({id: messagesC.list.length, text: messageC});
  };
  return messagesC;
})

       
//LocalStorage
.factory('$localStorage', ['$window', function($window) {
        return {
          store: function(key, value) {
          $window.localStorage[key] = value;
          },
          get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
          },
          storeObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
          },
          getObject: function(key,defaultValue) {
          return JSON.parse($window.localStorage[key] || defaultValue);
          }
        }
      }])

      //Authfactory
      .factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;
    

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({username:loginData.username, token: response.token});
              $rootScope.$broadcast('login:Successful');
           },
           function(response){
              isAuthenticated = false;
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };
    
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])

        ;