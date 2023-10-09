// This script is developed to run on Runkit.
// It leverage the environment variables and create and endpoint.


const axios = require('axios');
const parse = require('url-parse');
const querystring = require('querystring');

//  Environment variable
//  Expected format of the environment variable:
// {
//     "clientId":      "[YOUR_CLIENT_ID]", // AKA Api Key 
//     "clientSecret":  "[YOUR_CLIENT_SECRET]", 
//     "imsOrg":        "[YOUR IMS ORG]", 
//     "sandboxName":   "[YOUR_SANDBOX_NAME]", 
//     "containerId":   "[YOUR_CONTAINER_ID]"
// }

//  Replace XXX with your environment variable
// const envVariables = JSON.parse(process.env.XXX);

const envVariables = JSON.parse(process.env.pot4sandbox2);


// BEGIN - Configuration parameters
const CLIENT_ID = envVariables.clientId;
const CLIENT_SECRET = envVariables.clientSecret;

const imsOrg = envVariables.imsOrg;
const sandboxName = envVariables.sandboxName;
const containerId = envVariables.containerId;

//  For Decisioning API
//  This object contains the propositions based on the node of the journey.
//  The key is the name of the node. In this way, if the journey version changes, the name of the node can be consistent.
//  This node should be customised based on the decision scope you need to show.
const propositionsList = {
    "paywall_discount": [
        {
            "xdm:activityId": "xcore:offer-activity:178c4d837fffecc3",
            "xdm:placementId": "xcore:offer-placement:170e802b02f9063b"
        }
    ],
    "upcoming_event": [
        {
            "xdm:activityId": "xcore:offer-activity:17a7844a7c0aeb85",
            "xdm:placementId": "xcore:offer-placement:170e802b02f9063b"
        }
    ]
}

// END - Configuration parameters


// Function to retrieve the Bearer Token
async function getBearerToken() {
    // Define the Adobe OAuth Server-to-Server token URL
    const tokenUrl = 'https://ims-na1.adobelogin.com/ims/token/v3';
    try {
        // Prepare the token request data
        const tokenRequestData = {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: 'openid,AdobeID,read_organizations,additional_info.projectedProductContext,session,additional_info.job_function,additional_info.roles',
        };

        // Send a POST request to the Adobe token URL
        const response = await axios.post(tokenUrl, querystring.stringify(tokenRequestData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.data && response.data.access_token) {
            const accessToken = response.data.access_token;
            return accessToken;
        } else {
            console.error('Unable to retrieve access token.');
            return null;
        }
    } catch (error) {
        console.error('Error while retrieving access token:', error);
        return null;
    }
}

// Function to retrieve decisioning offers using the Bearer Token
async function getDecisioningOffersWithToken(params) {
    const accessToken = await getBearerToken();

    //  Define the profile object
    let profiles = [
        {
            "xdm:identityMap": {

            }
        }
    ];

    //  The namespace is sent with as parameter in the request.
    profiles[0]["xdm:identityMap"][params.identityNamespace] = [
        {
            "xdm:id": params.profileId
        }
    ];


    if (accessToken) {
        try {
            const url = `https://platform.adobe.io/data/core/ode/${containerId}/decisions`;
            const headers = {
                'Accept': 'application/vnd.adobe.xdm+json; schema="https://ns.adobe.com/experience/offer-management/decision-response;version=1.0"',
                'Content-Type': 'application/vnd.adobe.xdm+json; schema="https://ns.adobe.com/experience/offer-management/decision-request;version=1.0"',
                'Authorization': `Bearer ${accessToken}`,
                'x-api-key': CLIENT_ID,
                'x-gw-ims-org-id': imsOrg,
                'x-sandbox-name': sandboxName,
            };
            const data = {
                "xdm:propositionRequests": propositionsList[params.nodeName],
                "xdm:profiles": profiles,
                "xdm:allowDuplicatePropositions": {
                    "xdm:acrossActivities": true,
                    "xdm:acrossPlacements": true
                },
                "xdm:responseFormat": {
                    "xdm:includeContent": true,
                    "xdm:includeMetadata": {
                        "xdm:activity": [
                            "name"
                        ],
                        "xdm:option": [
                            "name"
                        ],
                        "xdm:placement": [
                            "name"
                        ]
                    }
                }
            };
            console.log(JSON.stringify(headers))
            const response = await axios.post(url, data, { headers })
            if (response.data != undefined) {
                console.log('Response data:', response.data);
                return response.data
            }
            else {
                console.error('Error:', error);
            };
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        }
    }
}

exports.endpoint = async function (request, response) {

    //  Expected parameters:
    //  - profileId
    //  - nodeName
    //  - identityNamespace

    let url = parse(request.url, true);
    let offers = await getDecisioningOffersWithToken({
        profileId: url.query.profileId,
        nodeName: url.query.nodeName,
        identityNamespace: url.query.identityNamespace
    });
    
    try {
        // Resto del tuo codice
        let offers = await getDecisioningOffersWithToken({
            profileId: url.query.profileId,
            nodeName: url.query.nodeName,
            identityNamespace: url.query.identityNamespace
        });        
    } catch (e) {
        // Gestisci l'errore e restituisci una risposta HTTP 500
        response.statusCode = 500;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ error: e }));
    }

    console.log(JSON.stringify(url.query))

    //  Return only the content of the first offer
    try {
        const deliveryURLs = [];
        const propositions = offers['xdm:propositions'];
        for (const proposition of propositions) {
            const options = proposition['xdm:options'];
            if (options !== undefined && options.length > 0) {
                for (const option of options) {
                    const deliveryURL = option['xdm:deliveryURL'];
                    deliveryURLs.push(deliveryURL);
                }
            }
            else
            {   
                //  Return fallback
                deliveryURLs.push(proposition["xdm:fallback"]["xdm:deliveryURL"]);
            }
        }
        response.end(JSON.stringify({ deliverURL: deliveryURLs[0] }))
    }
    catch (e) {
        response.end(JSON.stringify(e))
    }
}
