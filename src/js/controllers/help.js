function HelpController ($state, $rootScope, $http) {
  let vm = this;
  vm.call_help = call_help;

  const LUIS_ENDPOINT="https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/db6dc131-3164-4086-8d2a-5fc41b25bb31?subscription-key=411d55671bf84e8c81ea1e762ca2e9a3&timezoneOffset=0&verbose=true&spellCheck=true&q=I%20fell%20dwn%20and%20kant%20get%20up"


  const SERVER_ENDPOINT=""
  var text = "I cut myself, and I'm bleeding"


  var audio = "I've fallen and I can't get up"

  function call_help(){
    var data = [text]

    let req = {
      url: `${LUIS_ENDPOINT}`
    }

    $http(req).then(function (resp){

        console.log(resp.data.intents)
        var new_req={
            url: `${SERVER_ENDPOINT}`,
            data: resp.data.intents,
            method: 'POST',
            headers: { 'x-functions-key': "DfhpTaxIpcQI4poARx0YNwEUC7SPcOKzL3TgffTFtnkDfDNPF6/66Q==",
                  'Content-Type': 'application/json'} 
        }

        $http(new_req).then(function(new_resp){
            console.log(new_resp)

            }, (new_reject) => {
                console.log(new_reject)
            })
        $state.go("home")
      }, (reject) => {
        console.log(reject)
      })
  }



}
HelpController.$inject = ['$state', '$rootScope', '$http'];
export {HelpController}