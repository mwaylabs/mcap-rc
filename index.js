var fs = require('fs');
var rc = require('rc');
var path = require('path');

var defaultConf = {
    "default": ""
};

var rcName = 'mcap';

/**
 * Select operation to given command
 * @param command the operation
 * @param attr the config attributes
 */
function parse(command, attr) {
    if (command === 'add') {
        add(attr);
    }
    else if (command === 'list') {
        list(attr);
    }
    else if (command === 'info') {
        info(attr);
    }
    else if (command === 'remove') {
        remove(attr);
    }
    else if (command === 'default') {
        setDefault(attr[0]);
    }
    else {
        list(attr);
    }
}

/**
 * Add a server to the list
 * @param attr ['name', 'baseurl', 'username', 'password']
 * @returns {*}
 */
function add(attr) {
    if (!attr || !Array.isArray(attr) || !attr[0]) {
        return get();
    }

    var newServer = {};
    newServer[attr[0]] = {
        "baseurl": attr[1] || '',
        "username": attr[2] || '',
        "password": attr[3] || ''
    };
    var conf = rc(rcName, _deepCopy(defaultConf), newServer);
    if (!conf.default) {
        conf.default = attr[0];
    }
    return _save(conf);
}

/**
 * Returns all settings
 * no param will return all configurations - if param exists then return the specific one - if none is found return false
 * @param param
 * @returns {*}
 */
function get(param) {
    // get the config
    var config = rc(rcName, _deepCopy(defaultConf));
    // return all configs if no param is given
    if (!param) {
        // get the config
        return config
    }
    else if (config[param]) {
        if (param === 'default') {
            // return the default one if param is default
            return config[config[param]];
        }
        // return the param one
        return config[param];
    }
    // otherwise return false
    return false;
}

/**
 * Print all settings
 * @returns {*}
 */
function list() {
    // get the config
    var conf = get();
    // print a cleaned version
    console.log(JSON.stringify(_clean(conf), null, 5));
    return conf;
}

function info() {
    // TODO
    return list();
}

/**
 * Remove a configuration
 * @param attr
 * @returns {*}
 */
function remove(attr) {
    if (!attr) {
        return;
    }
    var rem = Array.isArray(attr) ? attr[0] : attr;
    // get the config
    var conf = get();
    // delete the given server
    delete conf[rem];
    // [ 'default', 'config', '_' ]
    if (Object.keys(conf).length <= 3) {
        // reset default if no server is present
        conf.default = defaultConf.default;
    }
    return _save(conf);
}

/**
 * set the default alias
 * @param attr {string} the default value
 * @returns {*}
 */
function setDefault(attr) {
    if (!attr || typeof attr !== 'string') {
        return;
    }
    // get the config
    var conf = get();
    if (conf && conf['default'] && conf[attr]) {
        conf['default'] = attr;
        return _save(conf);
    }
}

/**
 * Write a clean version of the config to the filesystem. The '.mcaprc' file must be present!
 * @param conf
 * @returns {*}
 * @private
 */
function _save(conf) {
    // get the path
    var _path = conf.config;
    // if no path is set the rc file doesn't exists
    if (!_path) {
        _path = path.normalize(getUserHome() + '/.' + rcName + 'rc');
    }
    // write a clean version of it
    fs.writeFileSync(_path, JSON.stringify(_clean(conf), null, 3));
    return conf;
}

/**
 * Return a copy of the config without rc attributes
 * @param conf
 * @returns {*}
 * @private
 */
function _clean(conf) {
    // deep copy
    var copy = _deepCopy(conf);
    // remove rc attributes
    delete copy._;
    delete copy.config;
    return copy;
}

/**
 * Copy the given object without functions!
 * @param conf
 * @returns {*}
 * @private
 */
function _deepCopy(conf) {
    return JSON.parse(JSON.stringify(conf));
}

/**
 * returns the home dir of the user
 * @returns {*}
 */
function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports.parse = parse;
module.exports.add = add;
module.exports.list = list;
module.exports.info = info;
module.exports.setDefault = setDefault;
module.exports.remove = remove;
module.exports.get = get;