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
            var id = msg.payload.id;
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
                        options.uri = redashAPIURL + '/' + id + '/results.json?api_key=' + apiKey;
                    }else if(method === 'post' || method === 'put' || method === 'delete') {
                        options.uri = redashAPIURL + '/' + id + '?api_key=' + apiKey;
                    }
                }else{
                    options.uri = redashAPIURL + '?api_key=' + apiKey;
                }
                node.log(options.uri);

                if(method === 'get'){
                    options.query = JSON.stringify(data);
                    options.headers = {
                        'Authorization': 'Bearer '+apiKey
                    };
                }else if(method === 'post' || method === 'put' || method === 'delete'){
                    options.body = JSON.stringify(data);
                    options.headers = {
                        'Authorization': 'Bearer '+apiKey,
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
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
