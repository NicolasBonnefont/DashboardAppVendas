import React from 'react'
import Menu from './_componentes/Menu/Menu'
import styles from '../styles/principal.module.css'
import { useRouter } from 'next/router'

function principal() {
  const router = useRouter()

  function Deslogar() {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <>
      <Menu />

      <div className={styles.container}>
        <div className={styles.cardPrincipal}>

          <div
            onClick={() => router.push('/novaEmpresa')}
            className={styles.card}>
            Nova Empresa
          </div>

          <div
            onClick={() => router.push('/alteraEmpresa')}
            className={styles.card}>
            Alterar Empresa
          </div>

        </div>
        <div className={styles.cardPrincipal}>

          <div
            onClick={() => router.push('/novoUsuario')}
            className={styles.card}>
            Novo Usuário
          </div>

          <div
            onClick={() => router.push('/alteraEmpresa')}
            className={styles.card}>
            Alterar Usuário
          </div>

        </div>
      </div>

    </>
  )
}


export default principal