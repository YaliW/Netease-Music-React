
/* config-overrides.js */
const path = require('path');
const projectConfig = require('./project.config.js');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias = {
    ...config.resolve.alias,
    components: path.resolve(projectConfig.paths.src, 'components'),
    config: path.resolve(projectConfig.paths.src, 'config'),
    layout: path.resolve(projectConfig.paths.src, 'layout'),
    model: path.resolve(projectConfig.paths.src, 'model'),
    utils: path.resolve(projectConfig.paths.src, 'utils'),
    apis: path.resolve(projectConfig.paths.src, 'apis'),
    assets: path.resolve(projectConfig.paths.src, 'assets'),
    store: path.resolve(projectConfig.paths.src, 'store')
  };
  return config;
}
