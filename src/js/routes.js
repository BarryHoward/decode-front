function routerConfig ($stateProvider , $urlRouterProvider) {

  $stateProvider

 // root states -------------------------------
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.tpl.html',
      controller: 'HomeController as home'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.tpl.html',
      controller: 'RegisterController as register'
    })
    .state('help', {
      url: '/help',
      templateUrl: 'templates/help.tpl.html',
      controller: 'HelpController as help'
    })
    .state('onroute', {
      url: '/onroute',
      templateUrl: 'templates/onroute.tpl.html',
      controller: 'OnRouteController as onroute',
      params: {
        obj: 5
      }
    })

// trails states ------------------------------
    // .state('root.trails', {
    //   url: '/trails',
    //   abstract: true,
    //   templateUrl: 'templates/trails.tpl.html',
    //   controller: 'TrailController as trail'
    // })
    // .state('root.trails.blazeNew', {
    //   url: '/blaze/new',
    //   templateUrl: 'templates/trails.blazeNew.tpl.html',
    //   controller: 'BlazeNewController as blazeNew'
    // })
    // .state('root.trails.blazeEdit', {
    //   url: '/blaze/:id',
    //   templateUrl: 'templates/trails.blazeEdit.tpl.html',
    //   controller: 'BlazeEditController as blazeEdit'
    // })
    // .state('root.trails.mark', {
    //   url: '/mark/:id',
    //   templateUrl: 'templates/trails.mark.tpl.html',
    //   controller: 'MarkController as mark'
    // })
    // .state('root.trails.hike', {
    //   url: '/hike/:trailId/users/:userId',
    //   templateUrl: 'templates/trails.hike.tpl.html',
    //   controller: 'HikeController as hike'
    // })
    // .state('root.trails.hike.modal', {
    //   url: '/modal/:id',
    //   templateUrl: 'templates/trails.hike.modal.tpl.html',
    //   controller: 'ModalController as modal'
    // })


  // // users states --------------------------------
  //   .state('root.users', {
  //     url: '/users',
  //     abstract: true,
  //     templateUrl: 'templates/users.tpl.html',
  //     controller: 'UsersController as users'
  //   })

  //   // .state('root.users.home', {
  //   //   url: '/:userId/home',
  //   //   templateUrl: 'templates/users.home.tpl.html',
  //   //   controller: 'UserHomeController as userHome'
  //   // })

  //   .state('root.users.createdTrails', {
  //     url: '/:userId/createdTrails',
  //     templateUrl: 'templates/users.createdTrails.tpl.html',
  //     controller: 'UserCreatedController as userCreated'
  //   })

  //   .state('root.users.hikedTrails', {
  //     url: '/:userId/hikedTrails',
  //     templateUrl: 'templates/users.hikedTrails.tpl.html',
  //     controller: 'UserHikedController as userHiked'
  //   })

  //   .state('root.users.profile', {
  //     url: '/:userId/profile',
  //     templateUrl: 'templates/users.profile.tpl.html',
  //     controller: 'UserProfileController as userProfile'
  //   })

     $urlRouterProvider.otherwise('/home');
};

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
export { routerConfig };
