var request = require('request');

module.exports = function(RED) {
    "use strict";

    // set this to true to spam your console with stuff.
    var redashDebug = true;

    function redashOut(n) {
        RED.nodes.createNode(this,n);
        var self = this;

        this.redashAPIURL = n.redashAPIURL;
        this.apiKey = n.apiKey || "";
        var node = this;

        this.on('input', function (msg) {
            var redashAPIURL = node.redashAPIURL || msg.redashAPIURL;
            var apiKey = node.apiKey || msg.apiKey;
            var method = node.method || msg.method;
            var results = node.results || msg.results;
            var id = msg.payload.id || msg.queryid;
            var data = msg.payload;

            if (this.credentials && this.credentials.apiKey) {
                apiKey = this.credentials.apiKey;
            }

            if (redashDebug) { node.log(JSON.stringify(data)); }
            try {
                var options = {};
                options.method = method;
                if(id){
                    if(method === 'get'){
                        if(redashAPIURL.indexOf('jobs') > -1){ // job get api
                            options.uri = redashAPIURL + '/' + id + '?api_key=' + apiKey;
                        }else if(redashAPIURL.indexOf('dashboards') > -1){ // dashboard get api
                            options.uri = redashAPIURL + '/' + id + '?api_key=' + apiKey;
                        }else{
                            options.uri = redashAPIURL + '/' + id + '/results.json?api_key=' + apiKey;
                        }
                    }else if(method === 'post' || method === 'put' || method === 'delete') {
                        if(results){
                            options.uri = redashAPIURL + '/' + id + '/results';
                        }else{
                            options.uri = redashAPIURL + '/' + id;
                        }
                    }
                }else{
                    options.uri = redashAPIURL + '?api_key=' + apiKey;
                }
                node.log(options.uri);

                if(method === 'get'){
                    options.query = JSON.stringify(data);
                    options.headers = {
                        'Authorization': 'Key ' + apiKey
                    };
                    node.log(options.query);
                }else if(method === 'post' || method === 'put' || method === 'delete'){
                    options.method = method;
                    options.body = {};
                    options.body.parameters = data;
                    options.body = JSON.stringify(options.body);
                    options.headers = {
                        'Authorization': 'Key ' + apiKey,
                        'Content-Type': 'application/json'
                    };
                    node.log(options.body);
                }

                request(options, function (err, res, body) {
                    if(err){
                        console.trace();
                        node.log(err,msg);
                    }else{
                        msg.payload = body;
                        msg.res = res;
                        node.log(body);
                        self.send(msg);
                    }
                });
            }
            catch (err) {
                console.trace();
                node.log(err,msg);
            }
        });
    }
    RED.nodes.registerType("redash", redashOut);
};
