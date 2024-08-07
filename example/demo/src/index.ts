import { setupRiseTools } from '@rise-tools/cli'
import { createWSServer, InferModel } from '@rise-tools/server'

import { models as delivery } from './delivery/ui'
import { Home } from './home/ui'
import { models as inventory } from './inventory/ui'
import { models as controls } from './ui-controls/ui'

const models = { ...inventory, ...controls, ...delivery, '': Home }

const port = Number(process.env.PORT || '3005')

const server = createWSServer(models, port)

if (process.env.NODE_ENV === 'development') {
  setupRiseTools({ server })
}

import '@rise-tools/kit-react-navigation/server'

declare module '@rise-tools/kit-react-navigation/server' {
  interface Navigate {
    screens: InferModel<typeof models>
  }
}
