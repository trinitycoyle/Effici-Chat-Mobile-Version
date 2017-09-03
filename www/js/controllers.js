angular.module('efficiChat.controllers', [])

.controller('AppCtrl', ['$scope', 'companyFactory', '$compile', '$localStorage', '$ionicPopover', '$ionicPopup', '$state', '$stateParams', '$ionicModal', '$timeout', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function($scope, companyFactory, $compile, $localStorage, $ionicPopover, $ionicPopup, $state, $stateParams, $ionicModal, $timeout, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

  $scope.showDepartments= true;
  $scope.showProjects= true;
  $scope.message = "Loading ...";
  $scope.departments = companyFactory.getDepartments().query();
  $scope.projects = companyFactory.getProjects().query();

   //Popover for company info
  $ionicPopover.fromTemplateUrl('templates/companypopover.html', {
    scope: $scope
    }).then(function(popover){
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.goUsers = function () {
    $state.go('users');
  };

  $scope.goAlerts = function () {
    $state.go('alerts');
  };

 $scope.message = {};
 

    $scope.showMain = false;
    $scope.showDepartments = false;
    $scope.showProjects = false;
  
  $scope.openGroup = function(val, scope){
      if(val == 'main'){
        $scope.content = "main content";

        $scope.showMain = true;
        $scope.showDepartments = false;
        $scope.showProjects = false;
      } else if (val == 'project') {
         $scope.content = "templates/projectsMessages.html";
       

        $scope.showMain = false;
        $scope.showDepartments = false;
        $scope.showProjects = true;
      } else if (val == 'department') {
         $scope.content = "templates/departmentsMessages.html";
      

        $scope.showMain = false;
        $scope.showDepartments = true;
        $scope.showProjects = false;
      }
    
 $ionicPlatform.ready(function () {
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Connected to room",
                    text: $scope.val
                }).then(function () {
                    console.log('Connected to '+ $scope.val);
                },
                function () {
                    console.log('Failed to add Notification ');
                });

                $cordovaToast
                  .show('Connected to '+$scope.val, 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                });
    });
};
  
  //login modal
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.loginData = $localStorage.getObject('userinfo','{}');

  //user login to localStorage
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);

    //Open register modal
  $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerUser= modal;
    });

    $scope.closeRegister = function () {
        $scope.registerUser.hide();
    };

    $scope.openRegister = function () {
        $scope.registerUser.show();
    };

    $scope.registerSuccess = function () {
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };      

  $scope.go = function (hash) {
  $location.path(hash);
};   
 } 

 $scope.mymessage = {user:"", message:"", date:""};

  $scope.uploadedFile = function(element) {
$scope.$apply(function($scope) {
  $scope.files = element.files;         
});
}

//open modal for entering department 1
$ionicModal.fromTemplateUrl('templates/dept1Alert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.dept1Alert = function() {
    $scope.modal.hide();
  };

  $scope.closeAlert1 = function() {
    $scope.modal.show();
  };

  //open modal for entering department 2
$ionicModal.fromTemplateUrl('templates/dept2Alert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.dept2Alert = function() {
    $scope.modal.hide();
  };

  $scope.closeAlert2 = function() {
    $scope.modal.show();
  };

  //open modal for entering department 3
$ionicModal.fromTemplateUrl('templates/dept3Alert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.dept3Alert = function() {
    $scope.modal.hide();
  };

  $scope.closeAlert3 = function() {
    $scope.modal.show();
  };

  //open modal for entering project A
$ionicModal.fromTemplateUrl('templates/projAAlert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.projAAlert = function() {
    $scope.modal.hide();
  };

  $scope.closeProjA = function() {
    $scope.modal.show();
  };

    //open modal for entering project B
$ionicModal.fromTemplateUrl('templates/projBAlert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.projBAlert = function() {
    $scope.modal.hide();
  };

  $scope.closeProjB = function() {
    $scope.modal.show();
  };

    //open modal for entering project C
$ionicModal.fromTemplateUrl('templates/projCAlert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.projCAlert = function() {
    $scope.modal.hide();
  };

  $scope.closeProjC = function() {
    $scope.modal.show();
  };

}])

//Controller for home chat list
.controller('ListCtrl', ['$scope', 'messages', function ($scope, messages) {
    var self = this;
    self.messages = messages.list;
}])

//Controller for home chat post
.controller('PostCtrl', ['$scope', 'messages', function ($scope, messages){
    var self = this;
    self.addMessage = function(message) {
      messages.add(message);
      self.newMessage = '';
      };
}])

//Controller for department 1 list
.controller('DeptOneListCtrl', ['$scope', 'messagesOne', function ($scope, messagesOne) {
    var self = this;
    self.messagesOne = messagesOne.list;
}])

//Controller for department 1 post
.controller('DeptOnePostCtrl', ['$scope', 'messagesOne', function ($scope, messagesOne){
    var self = this;
    self.addMessage = function(messageOne) {
      messagesOne.add(messageOne);
      self.newMessage = '';
    };
}])

//Controller for department 2 list
.controller('DeptTwoListCtrl', ['$scope', 'messagesTwo', function ($scope, messagesTwo) {
    var self = this;
    self.messagesTwo = messagesTwo.list;
}])

//Controller for department 2 post
.controller('DeptTwoPostCtrl', ['$scope', 'messagesTwo', function ($scope, messagesTwo){
    var self = this;
    self.addMessage = function(messageTwo) {
      messagesTwo.add(messageTwo);
      self.newMessage = '';
    };
}])

//Controller for department 3 list
.controller('DeptThreeListCtrl', ['$scope', 'messagesThree', function ($scope, messagesThree) {
    var self = this;
    self.messagesThree = messagesThree.list;
}])

//Controller for department 3 post
.controller('DeptThreePostCtrl', ['$scope', 'messagesThree', function ($scope, messagesThree){
    var self = this;
    self.addMessage = function(messageThree) {
      messagesThree.add(messageThree);
      self.newMessage = '';
    };
}])

//Controller for project A list
.controller('ProjAListCtrl', ['$scope', 'messagesA', function ($scope, messagesA) {
    var self = this;
    self.messagesA = messagesA.list;
}])

//Controller for project A post
.controller('ProjAPostCtrl', ['$scope', 'messagesA', function ($scope, messagesA){
    var self = this;
    self.addMessage = function(messageA) {
      messagesA.add(messageA);
      self.newMessage = '';
    };
}])

//Controller for project B list
.controller('ProjBListCtrl', ['$scope', 'messagesB', function ($scope, messagesB) {
    var self = this;
    self.messagesB = messagesB.list;
}])

//Controller for project B post
.controller('ProjBPostCtrl', ['$scope', 'messagesB', function ($scope, messagesB){
    var self = this;
    self.addMessage = function(messageB) {
      messagesB.add(messageB);
      self.newMessage = '';
    };
}])

//Controller for project C list
.controller('ProjCListCtrl', ['$scope', 'messagesC', function ($scope, messagesC) {
    var self = this;
    self.messagesC = messagesC.list;
}])

//Controller for project C post
.controller('ProjCPostCtrl', ['$scope', 'messagesC', function ($scope, messagesC){
    var self = this;
    self.addMessage = function(messageC) {
      messagesC.add(messageC);
      self.newMessage = '';
    };
}])
;





