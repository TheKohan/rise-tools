import { Template } from '@react-native-templates/core'
import { RiseComponents } from '@react-native-templates/ui-rise'
import { TamaguiComponents } from '@react-native-templates/ui-tamagui'
import { Stack } from 'expo-router'
import React from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

import { useDataSource } from '../data-sources'
import { Connection, useConnection } from '../provider/storage'
import { NotFoundScreen } from './not-found'

export function Screen(props: { title: string }) {
  return <Stack.Screen options={{ title: props.title }} />
}

const components = {
  ...TamaguiComponents,
  ...RiseComponents,
  Screen: {
    component: Screen,
    validate: (props: any) => props,
  },
}

const { useParam, useParams } = createParam<{ id: string; path: string }>()

export function ConnectionScreen() {
  const [id] = useParam('id')
  // const router = useRouter()
  const [connection] = useConnection(id)
  if (!connection) return <NotFoundScreen />
  return <ActiveConnectionScreen connection={connection} />
  // return <SizableText>Hellow</SizableText>
}
function ActiveConnectionScreen({ connection }: { connection: Connection }) {
  const router = useRouter()
  const { params } = useParams()
  const [path] = useParam('path')

  const dataSource = useDataSource(connection.id, connection.host, (event) => {
    const [action, path] = Array.isArray(event.action) ? event.action : [event.action, '']
    if (action === 'navigate') {
      router.push(`/connection/${params.id}?path=${path}`)
      return true
    }
    if (action === 'navigate-back') {
      router.back()
      return true
    }
    return false
  })
  if (!dataSource) {
    return null
  }
  return <Template components={components} dataSource={dataSource} path={path} />
}
