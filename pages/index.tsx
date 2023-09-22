import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')

  const addressSubmittedHandler = (address: string) => {
    const key = new web3.PublicKey(address);
    setAddress(key.toBase58());

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

    connection.getBalance(key).then(balance => {
      setBalance(balance / web3.LAMPORTS_PER_SOL)
    })
  }    

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Checar Balanço da conta 💰
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{address ? `Address: ${address}` : '' }</p>
        <p>{address ? `Balance: ${balance} SOL` : ''}</p>
      </header>
    </div>
  )
}

export default Home
