import { Button, Separator, YStack } from '@react-native-templates/demo-ui'
import { useConnection } from 'app/provider/storage'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { NotFoundScreen } from './not-found'
import { ConnectionForm } from 'app/src/connection-form'
import { Copy, Trash } from '@tamagui/lucide-icons'
import { setStringAsync } from 'expo-clipboard'
import bs58 from 'bs58'
import { Buffer } from 'buffer'
import { router } from 'expo-router'

const { useParam } = createParam<{ id: string }>()

export function EditConnectionScreen() {
  const [id] = useParam('id')
  const [connection, { remove, update }] = useConnection(id)
  const goHomeLink = useLink({
    href: '/',
  })
  if (!connection) return <NotFoundScreen />
  return (
    <YStack f={1} space padding="$4">
      <ConnectionForm
        onSubmit={(values) => {
          update((conn) => ({ ...conn, ...values }))
          goHomeLink.onPress()
        }}
        defaultValues={connection}
        submitButton={({ submit }) => <Button onPress={() => submit()}>Save Connection</Button>}
      />
      <Separator />
      <Button
        onPress={() => {
          const connectionString = bs58.encode(Buffer.from(JSON.stringify(connection)))
          setStringAsync(`rise://connect/${connectionString}`)
        }}
        theme="green"
        icon={Copy}
      >
        Copy Connection Link
      </Button>
      {/* <Button
        onPress={() => {
          const connectionString = bs58.encode(Buffer.from(JSON.stringify(connection)))
          router.navigate(`/connect/${connectionString}`)
          // setStringAsync(`rise://connect/${connectionString}`)
        }}
        theme="green"
      >
        DEV - Navigate to Connect
      </Button> */}

      <Button
        theme="red"
        color="$red10"
        onPress={() => {
          remove()
          goHomeLink.onPress()
        }}
        chromeless
        icon={Trash}
      >
        {`Delete "${connection.label}" Connection`}
      </Button>
    </YStack>
  )
}
// rise://connect/3PDaRnc1CoGkXf4HiDu8JnBuU8bdm1ohJLfwhZTNTwN4h5Po6VMDhyUpS9zpEvizipY7KnGWBn68CV9rRz8r6cHbQLVHgktpPsd9ZgCLj8X2AT1eTwJowZ9hqYN3fNSZyy57WXxkfKku4Pi4
