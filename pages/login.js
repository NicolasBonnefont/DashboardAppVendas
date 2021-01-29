import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button';
import api from './api/api'
import {ActivityIndicator} from 'react-native-web'

export default function Home() {

  useEffect(() => {
    VerificaLogado()
  }, [])

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function VerificaLogado() {

    if (localStorage.getItem('Token')) {
      router.push('/principal')
    }
  }

  async function Logar() {
    event.preventDefault()

    setLoading(true)

    await api.post('/api/login',
      {
        email: email,
        senha: senha
      })
      .then(response => {
        if(response.data.usuarioMOR == 'S'){
          localStorage.setItem('Token', response.data.token)
          router.push('/principal')
        }else{
          alert('Usuário não autorizado !')
          localStorage.clear()
          setLoading(false)
          return
        }
        
      })
      .catch(error => {
        console.log(error)
        alert('Problema no Acesso')
        localStorage.clear()
        setLoading(false)
        
      })
      setLoading(false)
  }

  return (
    <div className={styles.Container}>

      <div className={styles.CardLogin}>

        <form className={styles.form} onSubmit={()=>Logar()} >

          <img className={styles.imgLogo} src='/logo.png' alt="LogoMOR" width="64" height="64" />
          <input className={styles.inputLogin} type="email" placeholder='Email...' value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
          <input className={styles.inputLogin} type="password" placeholder='Senha...' value={senha} onChange={(e) => setSenha(e.currentTarget.value)} required />
          <Button className={styles.btnLogar} type='submit' variant="contained" color="primary">
           
            {loading ? <ActivityIndicator size="small" color="#00ff48"/> : "Logar"}
           
          </Button>

        </form>

      </div>

    </div>

  )
}
