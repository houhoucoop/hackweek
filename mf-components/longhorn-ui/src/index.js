import './publicPath'
import appmodel from './models/app'
import host from './models/host'
import volume from './models/volume'
import setting from './models/setting'
import eventlog from './models/eventlog'
import engineimage from './models/engineimage'
import backingImage from './models/backingImage'
import backup from './models/backup'
import snapshot from './models/snapshot'
import recurringJob from './models/recurringJob'
import instanceManager from './models/instanceManager'
import orphanedData from './models/orphanedData'
import systemBackups from './models/systemBackups'

// import assets
import './assets/iconfont/iconfont.eot'
import './assets/iconfont/iconfont.svg'
import './assets/iconfont/iconfont.ttf'
import './assets/iconfont/iconfont.woff'

// import global styles
import './assets/styles/index.less'

import app from './main'

import routerConfig from './router'

const renderApp = (containerId = '#root') => {
  app.model(appmodel);
  app.model(snapshot('snapshotModal'));
  app.model(host);
  app.model(setting);
  app.model(eventlog);
  app.model(engineimage);
  app.model(backingImage);
  app.model(backup);
  app.model(volume);
  app.model(recurringJob);
  app.model(instanceManager);
  app.model(orphanedData);
  app.model(systemBackups);

  app.router(routerConfig);

  // Start the app and render it to the provided container
  app.start(containerId);
};

if (process.env.LH_UI_VERSION) {
  renderApp()
}

export { renderApp };
