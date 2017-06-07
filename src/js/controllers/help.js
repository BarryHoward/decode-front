function HelpController ($state, $rootScope, $http) {
  let vm = this;
  vm.call_help = call_help;
  vm.show_mic = false;

  const LUIS_ENDPOINT="https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/db6dc131-3164-4086-8d2a-5fc41b25bb31?subscription-key=411d55671bf84e8c81ea1e762ca2e9a3&timezoneOffset=0&verbose=true&spellCheck=true&q=I%20fell%20dwn%20and%20kant%20get%20up"


  const SERVER_ENDPOINT="https://closecall-api.azurewebsites.net/api/help"

  function call_help(){

    let req = {
      url: `${LUIS_ENDPOINT}`
    }

    vm.show_mic = true;
    setTimeout(function(){ 
        $http(req).then(function (resp){

            console.log(resp.data.intents)
            var new_req={
                url: `${SERVER_ENDPOINT}`,
                data: resp.data.intents,
                method: 'POST',
                headers: { "x-functions-key": "Y/MzwkcNpRZrOxes3FQVJDIijuftiLU07BtdBaWaGqIlc7Yr0CJlaA==",
                      'Content-Type': 'application/json'} 
            }

            $http(new_req).then(function(new_resp){
                console.log(new_resp)
                $state.go("onroute", {obj: new_resp.data})

                }, (new_reject) => {
                    console.log(new_reject)
                })

          }, (reject) => {
            console.log(reject)
          })
    }, 3000);
  }



}
HelpController.$inject = ['$state', '$rootScope', '$http'];
export {HelpController}