const SERVER = "https://trails-back-end.herokuapp.com/"

function HomeController ($state, $http) {
  let vm = this;
  vm.signIn = signIn;

  function signIn(){
    $state.go("register")
  }
};

HomeController.$inject = ['$state', '$http'];
export {HomeController};
