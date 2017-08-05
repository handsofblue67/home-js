let Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
  let alexa = Alexa.handler(event, context);

  // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
  // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

  alexa.registerHandlers(handlers);
  alexa.execute();
};

let handlers = {
  LaunchRequest: () => this.emit('MyIntent'),
  MyIntent: () => {
    let pop = 0;
    let myRequest = 'Virginia';

    httpPost(myRequest, myResult => {
      console.log("sent     : " + myRequest);
      console.log("received : " + myResult);

      this.emit(':tell', 'The population of ' + myRequest + ' is ' + myResult);

    });
  }
};

// END of Intent Handlers ---------------------------------------------------------------------
// Paste in any helper functions below --------------------------------------------------------


let http = require('http');

function httpPost(myData, callback) {

  // GET is a web service request that is fully defined by a URL string
  // Try GET in your browser:
  // http://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey


// {
//   _id: '596692a96f9b86001b8116ae',
//     deviceID: '6727399750238208',
//       name: 'kejef',
//         deviceType: 'Test',
//           checkinFreq: null,
//             components: [{ name: 'vedo', controlState: true, type: 'toggle' }],
//               topics:
//   {
//     pub:
//     {
//       status: '/status/6727399750238208',
//         currentSettings: '/currentSettings/6727399750238208'
//     },
//     sub:
//     {
//       reqStatus: '/reqStatus/6727399750238208',
//         settings: '/settings/6727399750238208'
//     }
//   },
//   createdAt: null,
//     updatedAt: 1499899547000,
//       lastSeen: 1499899547000
// }
  
  let post_data = { "usstate": myData };

  let post_options = {
    host: 'cp6gckjt97.execute-api.us-east-1.amazonaws.com',
    port: '443',
    path: '/prod/stateresource',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(post_data))
    }
  };

  let post_req = http.request(post_options, res => {
    res.setEncoding('utf8');
    let returnData = "";
    res.on('data', chunk => {
      returnData += chunk;
    });
    res.on('end', () => {
      // this particular API returns a JSON structure:
      // returnData: {"usstate":"New Jersey","population":9000000}

      population = JSON.parse(returnData).population;

      callback(population);

    });
  });
  post_req.write(JSON.stringify(post_data));
  post_req.end();

}