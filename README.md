# mCAP Serverconfig

Interface to configure multiple mCAP server.

## Install

```
git clone https://github.com/mwaylabs/mcapcli-serverconfig.git
cd mcapcli-serverconfig
npm install
```

## Usage

```
var mCAPrc = require('mcapcli-serverconfig');
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