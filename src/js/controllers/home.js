const SERVER = "https://trails-back-end.herokuapp.com/"

function HomeController ($state, $http) {
  let vm = this;
  vm.signIn = signIn;
  vm.gotohelp = gotohelp;

  function signIn(){
    $state.go("register")
  }

  function gotohelp(){
    $state.go("help")
  }
};

HomeController.$inject = ['$state', '$http'];
export {HomeController};
