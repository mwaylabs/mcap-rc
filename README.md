# mCAP Serverconfig

Interface to configure multiple mCAP server.

## Install

```
git clone https://github.com/mwaylabs/mcaprc.git
cd mcaprc
npm install
```

## Usage

```
var mcaprc = require('mcaprc');
// list all server
mcaprc.list();
// add a server
mcaprc.add(['name', 'baseurl', 'username', 'password']);
// set the default server
mcaprc.setDefault('name');
// remove a server
mcaprc.remove('name');
```

## Test

```
tap test/*.js
```

## Changelog

### v0.1.0
- made get method public: no param will return all configurations - if param exists then return the specific one - if none is found return false