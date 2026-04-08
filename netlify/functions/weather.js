var https = require('https');

exports.handler = function (event, context, callback) {
  var params = event.queryStringParameters || {};
  var lat = params.lat || '19.264';
  var lon = params.lon || '-99.540';

  var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
            '&longitude=' + lon + '&current_weather=true';

  https.get(url, function (res) {
    var data = '';
    res.on('data', function (chunk) { data += chunk; });
    res.on('end', function () {
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: data
      });
    });
  }).on('error', function (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    });
  });
};
