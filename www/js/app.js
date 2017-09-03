// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('efficiChat', ['ionic', 'ngCordova', 'LocalStorageModule', 'angularMoment', 'efficiChat.controllers', 'efficiChat.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
    url: '/app',
      templateUrl: 'templates/home.html',
      controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/navbar',
    views: {
      'navbarView': {
        templateUrl: 'templates/navbar.html',
        controller: 'NavbarController',
      }
    }
    
  })

  .state('app.alerts', {
      url: '/alerts',
      views: {
        'alertView': {
          templateUrl: 'templates/alerts.html',
        }
      }
      
    })
    .state('app.users', {
      url: '/users',
      views: {
        'userView': {
          templateUrl: 'templates/users.html',
        }
      }
     
    })

    .state('app.department1Messages', {
                url: 'department1Messages',
                views: {
                    'content@': {
                        templateUrl: 'templates/department1Messages.html',
                        controller: 'CompanyController'
                    }
                }
            })

            .state('app.department2Messages', {
                url: 'department2Messages',
                views: {
                    'content@': {
                        templateUrl: 'templates/department2Messages.html',
                        controller: 'CompanyController'
                    }
                }
            })

            .state('app.department3Messages', {
                url: 'department3Messages',
                views: {
                    'content@': {
                        templateUrl: 'templates/department3Messages.html',
                        controller: 'CompanyController'
                    }
                }
            })

            .state('app.projectAMessages', {
                url: 'projectAMessages',
                views: {
                    'content@': {
                        templateUrl: 'templates/projectAMessages.html',
                        controller: 'CompanyController'
                    }
                }
            })

            .state('app.projectBMessages', {
                url: 'projectBMessages',
                views: {
                    'content@': {
                        templateUrl: 'templates/projectBMessages.html',
                        controller: 'CompanyController'
                    }
                }
            })

            .state('app.projectCMessages', {
                url: 'projectCMessages',
                views: {
                    'content@': {
                        templateUrl: 'templates/projectCMessages.html',
                        controller: 'CompanyController'
                    }
                }
            });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});
