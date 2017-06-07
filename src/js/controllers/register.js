function RegisterController ($state, $rootScope) {
  let vm = this;

  vm.state = 0;
  vm.total_states = 7;
  vm.next = next;
  vm.previous = previous;

  function next(){
    if (vm.state < vm.total_states){
      vm.state = vm.state + 1;
    }
  }

  function previous(){
    if (vm.state > 0){
      vm.state = vm.state - 1;
    }
  }


}
RegisterController.$inject = ['$state', '$rootScope'];
export {RegisterController}
