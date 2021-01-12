import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button';

export default function Home() {

  async function Logar() {
    event.preventDefault()

    console.log('TESTE')
  }


  return (
    <div className={styles.Container}>

      <div className={styles.CardLogin}>
        <form className={styles.form} onSubmit={() => Logar()}>
          <input className={styles.inputLogin} type="text" placeholder='Usuário...' />
          <input className={styles.inputLogin} type="text" placeholder='Senha...' />
          <Button className={styles.btnLogar} type='submit' variant="contained" color="primary">
            Logar
          </Button>
        </form>



      </div>

    </div>

  )
}