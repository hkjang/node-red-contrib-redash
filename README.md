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

<a href="https://www.buymeacoffee.com/gagagiga" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

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

[
  {
    "id": "6ff71945.a428d8",
    "type": "inject",
    "z": "7f4f292f.0dd758",
    "name": "",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 240,
    "wires": [
      [
        "32207afc.a0a056"
      ]
    ]
  },
  {
    "id": "6852ff3d.4fe47",
    "type": "redash",
    "z": "7f4f292f.0dd758",
    "redashAPIURL": "https://yourdomain.com/api/queries",
    "apiKey": "",
    "x": 570,
    "y": 240,
    "wires": [
      [
        "1d286012.0a7c9"
      ]
    ]
  },
  {
    "id": "279bc241.54b41e",
    "type": "debug",
    "z": "7f4f292f.0dd758",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 240,
    "wires": []
  },
  {
    "id": "32207afc.a0a056",
    "type": "function",
    "z": "7f4f292f.0dd758",
    "name": "Read query execute (params)",
    "func": "msg = {};\nmsg.payload = {};\nmsg.method = 'post';\nmsg.apiKey = 'STlBjonYRSzFTyu4jaXSLKVTdIIs3mABjZKA8m3p';\n// msg.id = '3';\nmsg.queryid = '3';\nmsg.payload.cmd_type = 'docker';\nmsg.results = true;\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 310,
    "y": 240,
    "wires": [
      [
        "6852ff3d.4fe47"
      ]
    ]
  },
  {
    "id": "1d286012.0a7c9",
    "type": "json",
    "z": "7f4f292f.0dd758",
    "name": "",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 710,
    "y": 240,
    "wires": [
      [
        "279bc241.54b41e"
      ]
    ]
  },
  {
    "id": "a52d2914.a51bc8",
    "type": "inject",
    "z": "7f4f292f.0dd758",
    "name": "",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 200,
    "wires": [
      [
        "b95f55ff.8ac678"
      ]
    ]
  },
  {
    "id": "68844da1.9a2cc4",
    "type": "redash",
    "z": "7f4f292f.0dd758",
    "redashAPIURL": "https://yourdomain.com/api/queries",
    "apiKey": "STlBjonYRSzFTyu4jaXSLKVTdIIs3mABjZKA8m3p",
    "x": 570,
    "y": 200,
    "wires": [
      [
        "17430501.b321fb"
      ]
    ]
  },
  {
    "id": "2e7929c8.71de46",
    "type": "debug",
    "z": "7f4f292f.0dd758",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 200,
    "wires": []
  },
  {
    "id": "b95f55ff.8ac678",
    "type": "function",
    "z": "7f4f292f.0dd758",
    "name": "Read all queries",
    "func": "msg = {};\nmsg.payload = {};\nmsg.method = 'get';\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 260,
    "y": 200,
    "wires": [
      [
        "68844da1.9a2cc4"
      ]
    ]
  },
  {
    "id": "17430501.b321fb",
    "type": "json",
    "z": "7f4f292f.0dd758",
    "name": "",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 710,
    "y": 200,
    "wires": [
      [
        "2e7929c8.71de46"
      ]
    ]
  },
  {
    "id": "bb4dfa2a.e8adb8",
    "type": "inject",
    "z": "7f4f292f.0dd758",
    "name": "",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 280,
    "wires": [
      [
        "25d58398.a3aa4c"
      ]
    ]
  },
  {
    "id": "5f51d9e7.5f8fe8",
    "type": "redash",
    "z": "7f4f292f.0dd758",
    "redashAPIURL": "https://yourdomain.com/api/jobs",
    "apiKey": "",
    "x": 570,
    "y": 280,
    "wires": [
      [
        "8f900c36.bb1ea"
      ]
    ]
  },
  {
    "id": "b16092ab.48266",
    "type": "debug",
    "z": "7f4f292f.0dd758",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 280,
    "wires": []
  },
  {
    "id": "25d58398.a3aa4c",
    "type": "function",
    "z": "7f4f292f.0dd758",
    "name": "Read query job results",
    "func": "msg = {};\nmsg.payload = {};\nmsg.method = 'get';\nmsg.apiKey = 'STlBjonYRSzFTyu4jaXSLKVTdIIs3mABjZKA8m3p';\nmsg.payload.id = 'd79930b0-99c8-4ad1-9d4d-22fb6b728afb';\n\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 280,
    "y": 280,
    "wires": [
      [
        "5f51d9e7.5f8fe8"
      ]
    ]
  },
  {
    "id": "8f900c36.bb1ea",
    "type": "json",
    "z": "7f4f292f.0dd758",
    "name": "",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 710,
    "y": 280,
    "wires": [
      [
        "b16092ab.48266"
      ]
    ]
  },
  {
    "id": "73c11bb3.95c104",
    "type": "inject",
    "z": "7f4f292f.0dd758",
    "name": "",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 320,
    "wires": [
      [
        "8423e2d9.06ee3"
      ]
    ]
  },
  {
    "id": "9a84b0ce.112e4",
    "type": "redash",
    "z": "7f4f292f.0dd758",
    "redashAPIURL": "https://yourdomain.com/api/queries",
    "apiKey": "ZrMM6DzEyJQocoGPGWCc2b3JLDvBlBjJhhsfR3Jb",
    "x": 570,
    "y": 320,
    "wires": [
      [
        "a68998a0.ead278"
      ]
    ]
  },
  {
    "id": "72e2af37.dbfee",
    "type": "debug",
    "z": "7f4f292f.0dd758",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 320,
    "wires": []
  },
  {
    "id": "8423e2d9.06ee3",
    "type": "function",
    "z": "7f4f292f.0dd758",
    "name": "Read query execute",
    "func": "msg = {};\nmsg.payload = {};\nmsg.method = 'get';\n// msg.payload.id = '1';\nmsg.queryid = '1';\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 280,
    "y": 320,
    "wires": [
      [
        "9a84b0ce.112e4"
      ]
    ]
  },
  {
    "id": "a68998a0.ead278",
    "type": "json",
    "z": "7f4f292f.0dd758",
    "name": "",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 710,
    "y": 320,
    "wires": [
      [
        "72e2af37.dbfee"
      ]
    ]
  },
  {
    "id": "3ac2fe31.966762",
    "type": "inject",
    "z": "7f4f292f.0dd758",
    "name": "",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 360,
    "wires": [
      [
        "9ccf043d.a4fde8"
      ]
    ]
  },
  {
    "id": "d32b229e.ece92",
    "type": "redash",
    "z": "7f4f292f.0dd758",
    "redashAPIURL": "https://yourdomain.com/api/queries",
    "apiKey": "",
    "x": 570,
    "y": 360,
    "wires": [
      [
        "9fdcfd8.692"
      ]
    ]
  },
  {
    "id": "be0648b0.21bb38",
    "type": "debug",
    "z": "7f4f292f.0dd758",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 360,
    "wires": []
  },
  {
    "id": "9ccf043d.a4fde8",
    "type": "function",
    "z": "7f4f292f.0dd758",
    "name": "[X] Create query execute (params)",
    "func": "// https://yourdomain.com/api/queries/2/results.json?\n// api_key=4Ft0xObDPjsNYUl6vgVbcmyjPS9kxzQjYW156XNI\n// api_key=cE8fCTZVw9uM5nrQueKExdhDcFCEjcrpgiqIcf2A\n// user_key STlBjonYRSzFTyu4jaXSLKVTdIIs3mABjZKA8m3p\nmsg = {};\nmsg.payload = {};\nmsg.method = 'post';\nmsg.apiKey = 'STlBjonYRSzFTyu4jaXSLKVTdIIs3mABjZKA8m3p';\n// msg.id = '3';\nmsg.queryid = '4';\nmsg.payload.cmd_name = 'docker run';\nmsg.payload.cmd_type = 'docker';\nmsg.payload.cmd_command = 'docker run';\nmsg.payload.cmd_api = '/docker/run';\nmsg.results = true;\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 320,
    "y": 360,
    "wires": [
      [
        "d32b229e.ece92"
      ]
    ]
  },
  {
    "id": "9fdcfd8.692",
    "type": "json",
    "z": "7f4f292f.0dd758",
    "name": "",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 710,
    "y": 360,
    "wires": [
      [
        "be0648b0.21bb38"
      ]
    ]
  },
  {
    "id": "bb3fcc5c.5f5a8",
    "type": "inject",
    "z": "7f4f292f.0dd758",
    "name": "",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 420,
    "wires": [
      [
        "80ec9fb1.0c466"
      ]
    ]
  },
  {
    "id": "640091ae.21964",
    "type": "redash",
    "z": "7f4f292f.0dd758",
    "redashAPIURL": "https://yourdomain.com/api/dashboards",
    "apiKey": "STlBjonYRSzFTyu4jaXSLKVTdIIs3mABjZKA8m3p",
    "x": 570,
    "y": 420,
    "wires": [
      [
        "f10aa49a.a8b328"
      ]
    ]
  },
  {
    "id": "3caabbc7.ee68a4",
    "type": "debug",
    "z": "7f4f292f.0dd758",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 420,
    "wires": []
  },
  {
    "id": "80ec9fb1.0c466",
    "type": "function",
    "z": "7f4f292f.0dd758",
    "name": "Read all dashboards",
    "func": "msg = {};\nmsg.payload = {};\nmsg.method = 'get';\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 280,
    "y": 420,
    "wires": [
      [
        "640091ae.21964"
      ]
    ]
  },
  {
    "id": "f10aa49a.a8b328",
    "type": "json",
    "z": "7f4f292f.0dd758",
    "name": "",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 710,
    "y": 420,
    "wires": [
      [
        "3caabbc7.ee68a4"
      ]
    ]
  },
  {
    "id": "d707294d.eb4e28",
    "type": "inject",
    "z": "7f4f292f.0dd758",
    "name": "",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 100,
    "y": 460,
    "wires": [
      [
        "a5d00e40.ff08f"
      ]
    ]
  },
  {
    "id": "6907369e.ac49b8",
    "type": "redash",
    "z": "7f4f292f.0dd758",
    "redashAPIURL": "https://yourdomain.com/api/dashboards",
    "apiKey": "STlBjonYRSzFTyu4jaXSLKVTdIIs3mABjZKA8m3p",
    "x": 570,
    "y": 460,
    "wires": [
      [
        "207e5ed3.364702"
      ]
    ]
  },
  {
    "id": "ec8516a5.1e27b8",
    "type": "debug",
    "z": "7f4f292f.0dd758",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "false",
    "x": 870,
    "y": 460,
    "wires": []
  },
  {
    "id": "a5d00e40.ff08f",
    "type": "function",
    "z": "7f4f292f.0dd758",
    "name": "Read dashboard by id",
    "func": "msg = {};\nmsg.payload = {};\nmsg.method = 'get';\nmsg.payload.id = 'server-monitor';\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 280,
    "y": 460,
    "wires": [
      [
        "6907369e.ac49b8"
      ]
    ]
  },
  {
    "id": "207e5ed3.364702",
    "type": "json",
    "z": "7f4f292f.0dd758",
    "name": "",
    "property": "payload",
    "action": "",
    "pretty": false,
    "x": 710,
    "y": 460,
    "wires": [
      [
        "ec8516a5.1e27b8"
      ]
    ]
  }
]
```
