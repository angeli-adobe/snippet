alloy("sendEvent", {
    xdm: {
        "_demoemea": {
            "identification": {
                "core":{
                    "email":"angeli+nw21@adobetest.com"
                }
            }
        },
        "web": {
          "webPageDetails": {
          "viewName":"homepage"
          }
        }
      },
    "renderDecisions": true,
    decisionScopes: ['__view__',"eyJ4ZG06YWN0aXZpdHlJZCI6Inhjb3JlOm9mZmVyLWFjdGl2aXR5OjE3YWY0ZGE0YjZlZWFiMDciLCJ4ZG06cGxhY2VtZW50SWQiOiJ4Y29yZTpvZmZlci1wbGFjZW1lbnQ6MTdhZjQ3ZDg5YmI5YzRiNiJ9"]
}).then(function (result) {
    console.log("result")     
    console.log(result) 
    if (result.propositions) {
        //console.log(result.proposition)
    }
});
