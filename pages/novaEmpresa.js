import React, { useState } from 'react'
import Menu from './_componentes/Menu/Menu'
import styles from '../styles/novaEmpresa.module.css'
import { Button, TextField } from '@material-ui/core'
import api from './api/api'
import { useRouter } from 'next/router'
import { ActivityIndicator } from 'react-native-web'

export default function NovaEmpresa() {

  const route = useRouter()

  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [ativo, setAtivo] = useState('')
  const [ip, setIp] = useState('')
  const [banco, setBanco] = useState('')

  const [file, setFile] = useState('')

  const [loading, setLoading] = useState(false)

  const fileHandler = event => {

    setFile(event.target.files[0]);

  };

  async function GravaEmmpresa() {
    event.preventDefault()
    setLoading(true)

    let anexo = new FormData();
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    anexo.append('img', file)

    await api.post('/api/empresa',
      {
        "cnpj": cnpj,
        "email": email,
        "razaoSocial": razaoSocial,
        "ativo": ativo,
        "ip": ip,
        "banco": banco
      })
      .then(async response => {
        if (file) {
          await api.post('/api/empresa/uploadImgPorCNPJ/' + cnpj, anexo, config)
            .then(response => {
              alert('Empresa cadastrada com sucesso')
              route.push('/principal')
            })
            .catch(error => {
              alert('Erro ! Verifica o log')
              console.log(error)
              setLoading(false)
            })
        } else {
          alert('Empresa cadastrada com sucesso')
          route.push('/principal')
        }

      })
      .catch(error => {
        console.log(error)
        alert('Problema ao cadastrar a empresa.')
        setLoading(false)
      })
  }


  return (
    <div className={styles.principal}>
      <Menu />

      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.TituloContainer}>
            <h2 className={styles.Titulo}>Inclusão de nova Empresa</h2>
          </div>

          <form className={styles.form} onSubmit={GravaEmmpresa}>
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Razão Social"
              variant="outlined"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
            />
            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="CNPJ"
              variant="outlined"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Ativo"
              variant="outlined"
              value={ativo}
              inputProps={{
                maxLength: 1,
              }}
              onChange={(e) => setAtivo(e.target.value.toUpperCase())}
              required
            />
            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="IP"
              variant="outlined"
              onChange={(e) => setIp(e.target.value)}
              required
            />
            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Banco"
              variant="outlined"
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
              required
            />
            <br/>
        
            <div className={styles.InputIMG}>
              <input
                id="car"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={fileHandler}
              />
            </div>

            <br />
            <Button
             // disabled={btnAtivo}
              className={styles.btnGravar}
              type='submit'
              variant="contained"
              color="primary">
              {
              loading?
               <ActivityIndicator size="small" color="#00ff48" />
               : 'Gravar'}
            </Button>
          </form>



        </div>


      </div>

    </div>
  )
}