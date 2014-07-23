# mCAP Serverconfig

Interface to configure multiple mCAP server.

## Install

```
git clone https://github.com/mwaylabs/mcap-rc.git
cd mcap-rc
npm install
```

## Usage

```
var mCAPrc = require('mcap-rc');
// list all server
mCAPrc.list();
// add a server
mCAPrc.add(['name', 'baseurl', 'username', 'password']);
// set the default server
mCAPrc.setDefault('name');
// remove a server
mCAPrc.remove('name');
```

## Test

```
tap test/*.js
```