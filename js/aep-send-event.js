


sendProfileEvent();
function sendProfileEvent() {
  
  var url = 'https://dcs.adobedc.net/collection/fadd01373a8ac7859f30d9d69c504304f65542a62c74a3212e24c43277684cbd';
  var json = {
    "header": {
      "datasetId": "64f708516b187928d25157f8",
      "imsOrgId": "6BB915785DE67ED10A495E68@AdobeOrg",
      "source": {
        "name": "web"
      },
      "schemaRef": {
        "id": "https://ns.adobe.com/adobeamericaspot4/schemas/1118fc8be763f5e0e3008df22e8e6843d2bcf422b83924b2",
        "contentType": "application/vnd.adobe.xed-full+json;version=1"
      }
    },
    "body": {
      "xdmMeta": {
        "schemaRef": {
          "id": "https://ns.adobe.com/adobeamericaspot4/schemas/1118fc8be763f5e0e3008df22e8e6843d2bcf422b83924b2",
          "contentType": "application/vnd.adobe.xed-full+json;version=1"
        }
      },
      "xdmEntity": {
        "_adobeamericaspot4":{
          "ferrari":{
            "tickets": {
              "circuitId": _satellite.getVar("Offer circuitId"),
              "endDate": _satellite.getVar("Offer endDate"),
              "options": _satellite.getVar("Offer options"),
              "price": _satellite.getVar("Offer price"),
              "raceId": _satellite.getVar("Offer raceId"),
              "raceName": _satellite.getVar("Offer raceName"),
              "raceStart": _satellite.getVar("Offer raceStart"),
              "startDate": _satellite.getVar("Offer startDate"),
              "ticketNumber": "XDF-FRD-FORR"
            }
          },
          "identification": {
            "core" : {
              "ecid":_satellite.getVar('ECID')
            }
          },
        },
      }
     }
    };

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Profile update successful");
      // alert("Thank you for registering");
      // window.location = '/';
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(json));
}
