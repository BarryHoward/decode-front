function RegisterController ($state, $rootScope, $http) {
  let vm = this;

  const ENDPOINT = ""

  const SITUATION_MAP = {
    med_sit: "Medical Situation",
    mech_sit: "Mechanical Situation",
    per_saf: "Personal Safety"
  }

  const SKILLS_MAP = {
    first_aid: "First Aid",
    cpr: "CPR",
    doctor: "Doctor",
    combat_med: "Combat Medic",
    nurse: "Nurse",
    emt: "EMT",
    therapy: "Therapy"
  }

  vm.state = 0;
  vm.total_states = 7;
  vm.next = next;
  vm.previous = previous;
  vm.update_situations = update_situations;
  vm.update_skills = update_skills;
  vm.beginning = beginning;
  vm.signup = signup

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

  function beginning(){
    vm.state = 0;
  }

  function signup(){
    var user = {name: vm.name,
                password: vm.password,
                email: vm.email,
                phone: vm.phone,
                situations: vm.situations,
                skills: vm.skills,
                photo: ""
            }

    let req = {
      url: `${ENDPOINT}`,
      data: user,
      method: 'POST',
      //headers: 
    }

    $http(req).then(function (resp){
        console.log(resp)
        $state.go("home")
      }, (reject) => {
        console.log(reject)
      })
  }

  function update_situations(){
    vm.situations = []
    var keys = Object.keys(SITUATION_MAP)
    for (var i=0; i<keys.length; i++){
      if (vm[keys[i]]){
        vm.situations.push(SITUATION_MAP[keys[i]]);
      }
    }
  }

  function update_skills(){
    vm.skills = []
    var keys = Object.keys(SKILLS_MAP)
    for (var i=0; i<keys.length; i++){
      if (vm[keys[i]]){
        vm.skills.push(SKILLS_MAP[keys[i]]);
      }
    }
  }


}
RegisterController.$inject = ['$state', '$rootScope', '$http'];
export {RegisterController}
