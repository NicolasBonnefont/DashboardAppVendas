import React,{useEffect, useState} from 'react';
import styles from './index.module.css'
import {useRouter} from 'next/router'

const Menu = () => {
  const router = useRouter()

  useEffect(() => {

    VerificaLogado()
  },[])

  function VerificaLogado() {
    if (localStorage.getItem('Token')) {
      return
    } else {
      router.replace('/login')
      localStorage.clear()
    }
  }

  function Deslogar(){
    localStorage.clear()
    router.push('/login')
  }
  return (

    <div className={styles.Menu} onClick={()=> router.push('/principal')}>
      <img className={styles.Logo} src="/logo.png" alt="" />
      <div className={styles.btnSair} onClick={Deslogar}>
        Sair
      </div>
    </div>

  );
}

export default Menu;