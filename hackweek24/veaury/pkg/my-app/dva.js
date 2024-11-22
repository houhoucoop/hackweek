import createHistory from 'history/createHashHistory'
import createLoading from 'dva-loading'
import dva from 'dva'

import appmodel from './react_app/longhorn-ui/src/models/app'
import host from './react_app/longhorn-ui/src/models/host'
import volume from './react_app/longhorn-ui/src/models/volume'
import setting from './react_app/longhorn-ui/src/models/setting'
import eventlog from './react_app/longhorn-ui/src/models/eventlog'
import engineimage from './react_app/longhorn-ui/src/models/engineimage'
import backingImage from './react_app/longhorn-ui/src/models/backingImage'
import backup from './react_app/longhorn-ui/src/models/backup'
import snapshot from './react_app/longhorn-ui/src/models/snapshot'
import recurringJob from './react_app/longhorn-ui/src/models/recurringJob'
import instanceManager from './react_app/longhorn-ui/src/models/instanceManager'
import orphanedData from './react_app/longhorn-ui/src/models/orphanedData'
import systemBackups from './react_app/longhorn-ui/src/models/systemBackups'

import routerConfig from './react_app/longhorn-ui/src/router'

const app = dva({
  ...createLoading(),
  history: createHistory({
    queryKey: false,
  }),
  onError() {
  },
})

// 2. Model (I am also helpless to not be able to load on demand, that the data is closely related, it must be loaded all!)
app.model(appmodel)
app.model(snapshot('snapshotModal'))
app.model(host)
app.model(setting)
app.model(eventlog)
app.model(engineimage)
app.model(backingImage)
app.model(backup)
app.model(volume)
app.model(recurringJob)
app.model(instanceManager)
app.model(orphanedData)
app.model(systemBackups)

// 3. Router
app.router(routerConfig)

// Start the dva app
app.start();

export const store = app._store;
export const startApp = (id) => app.start(id);