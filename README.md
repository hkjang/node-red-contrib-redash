node-red-contrib-redash
========================

A <a href="http://nodered.org" target="_new">Node-RED</a> 
node to get response to  <a href="https://redash.io/help/user-guide/integrations-and-api/api" target="_new"> redash api </a>.

Install
-------

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-redash


Usage
-----

## redash API 
<i><a href="https://redash.io/help/user-guide/integrations-and-api/api" target="_new">redash</a></i> api request node.

Expects a <b>msg.payload</b> with request(get,post,put,delete) params.

### API URL
- The url to call the redash API.

### API Key
- API Key value you put in the http header when calling the redash API.
- If the redash api is public, the API Key value is not necessary.

### method
- Http Request Method 

## parameter example
```javascript
# GET
msg.method = 'get'
// msg.payload.id = '4';

# POST
msg.method = 'post'
msg.payload.price = '300';
msg.payload.tax = '30';

# PUT
msg.method = 'put'
msg.payload.id = '2';
msg.payload.price = '400';
msg.payload.tax = '40';

# DELETE
msg.method = 'delete'
msg.payload.id = '2';
```

## sample flow

```json

[{"id":"1468f357.005e8d","type":"inject","z":"7f4f292f.0dd758","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":100,"y":40,"wires":[["90f391b.872de7"]]},{"id":"560e7abb.55c544","type":"redash","z":"7f4f292f.0dd758","redashAPIURL":"https://yourdomain.com/api/queries","apiKey":"ZrMM6DzEyJQocoGPGWCc2b3JLDvBlBjJhhsfR3Jb","x":410,"y":40,"wires":[["4cb8a330.b118bc"]]},{"id":"d2491f20.8d26b","type":"debug","z":"7f4f292f.0dd758","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":710,"y":40,"wires":[]},{"id":"90f391b.872de7","type":"function","z":"7f4f292f.0dd758","name":"","func":"msg = {};\nmsg.payload = {};\nmsg.method = 'get';\nmsg.payload.id = '1';\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":260,"y":40,"wires":[["560e7abb.55c544"]]},{"id":"4cb8a330.b118bc","type":"json","z":"7f4f292f.0dd758","name":"","property":"payload","action":"","pretty":false,"x":540,"y":40,"wires":[["d2491f20.8d26b"]]}]

```
