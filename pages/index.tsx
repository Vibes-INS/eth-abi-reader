import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { readFile } from '../utils'

const Home: NextPage = () => {
  const [content, setContent] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
    if (!e.target) return
    const file = e.target?.files?.[0]
    if (!file) return
    const fileContent = JSON.parse(await readFile<string>(file))
    console.log(fileContent)
    setContent(
      fileContent
        .map((item: any) => {
          const inputs = item.type === 'function' || item.type === 'constructor' ? `(${item.inputs.map((input: any) => [input.type, ...(input.indexed ? ['indexed'] : []), input.name].join(' ')).join(', ')})` : ''
          return [
            item.type,
            `${item.type === 'constructor' ? 'constructor' : item.name}${inputs}`,
            ...(item.stateMutability ? [item.stateMutability] : []),
          ].join(' ') + ';'
        })
        .join('\n')
    )
    e.target.value = ''
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <title>Eth Abi Reader</title>
      </Head>

      <main className={styles.main}>
        <input ref={fileInputRef} type="file" onChange={onChangeFile} style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: 0, height: 0 }} />
        <button onClick={() => fileInputRef.current?.click()}>Upload your ABI file (without network)</button>
        {
          content ? (
            <pre style={{ fontSize: '14px', lineHeight: '1.2' }}>
              <code>{content}</code>
            </pre>
          ) : null
        }
      </main>
    </div>
  )
}

export default Home