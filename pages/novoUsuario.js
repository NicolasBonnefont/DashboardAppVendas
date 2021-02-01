import React, { useState } from 'react'
import Menu from './_componentes/Menu/Menu'
import styles from '../styles/novoUsuario.module.css'
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import api from './api/api'
import { useRouter } from 'next/router'
import { ActivityIndicator } from 'react-native-web'

export default function NovoUsuario() {

  const route = useRouter()

  const [usuario, setUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [senha, setSenha] = useState('')
  const [administrador, setAdministrador] = useState(false)
  const [usuarioMOR, setUsuarioMOR] = useState(false)

  const [loading, setLoading] = useState(false)

  async function GravaUsuário() {
    event.preventDefault()
    setLoading(true)

    await api.post('/api/usuario',
      {
        'usuario': usuario,
        'email': email,
        'cnpj': cnpj,
        'senha': senha,
        'administrador': administrador ? 'S' : 'N',
        'usuarioMOR': usuarioMOR ? 'S' : 'N'
      })
      .then(response => {
        alert('Usuário salvo com sucesso')
        route.push('/principal')

      })
      .catch(error => {
        console.log(error)
        alert('Problema ao gravar o usuário')
        setLoading(false)
      })
    setLoading(false)
  }


  return (
    <div className={styles.principal}>
      <Menu />

      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.TituloContainer}>
            <h2 className={styles.Titulo}>Inclusão de novo Usuário</h2>
          </div>

          <form className={styles.form} onSubmit={GravaUsuário}>
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Cnpj"
              variant="outlined"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
            <br />

            <div className={styles.ContainerGroupRadio}>
              <div className={styles.GroupRadio}>
                <label> Usuário MOR</label>
                <input className={styles.Radio} type="checkbox"
                  value={usuarioMOR} onChange={() => setUsuarioMOR(!usuarioMOR)} />
              </div>
              <div className={styles.GroupRadio}>
                <label> Administrador</label>
                <input className={styles.Radio} type="checkbox"
                  value={administrador} onChange={() => setAdministrador(!administrador)} />
              </div>
            </div>

            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <br />
            <Button
              // disabled={btnAtivo}
              className={styles.btnGravar}
              type='submit'
              variant="contained"
              color="primary">
              {
                loading ?
                  <ActivityIndicator size="small" color="#00ff48" />
                  : 'Gravar'}
            </Button>
          </form>

        </div>

      </div>

    </div>
  )
}