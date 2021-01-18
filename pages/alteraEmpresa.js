import { Button, NativeSelect, TextField } from '@material-ui/core';
import React, { useEffect, useState, } from 'react';
import { ActivityIndicator } from 'react-native-web'

import styles from '../styles/alteraEmpresa.module.css'
import api from './api/api'
import { useRouter } from 'next/router'
import Menu from './_componentes/Menu/Menu'

function alteraEmpresa() {

  const route = useRouter()

  const [empresas, setEmpresas] = useState([])
  const [idEmpresa, setIdEmpresa] = useState(0)
  const [razaoSocial, setRazaoSocial] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [ip, setIp] = useState('')
  const [banco, setBanco] = useState('')
  const [ativo, setAtivo] = useState('')
  const [email, setEmail] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [file, setFile] = useState('')

  const [loading, setLoading] = useState(false)

  const [camposAtivos, setCamposAtivo] = useState(false)
  const [btnAtivo, setBtnAtivo] = useState(false)

  useEffect(() => {
    CarregaEmpresas()

  }, [])

  async function CarregaEmpresas() {

    await api.get('/api/empresa')
      .then(response => {
        setEmpresas(response.data)

      })
      .catch(error => {
        console.log(error)
        alert('Problema ao buscar as empresas')

      })
  }

  function IgualaEmpresa(e) {
    const index = e.target.value

    const empresaSelecionada = empresas.find(e => e.id == index)

    console.log(empresaSelecionada)

    if (empresaSelecionada) {
      setRazaoSocial(empresaSelecionada.razaoSocial)
      setCnpj(empresaSelecionada.cnpj)
      setIp(empresaSelecionada.ip)
      setBanco(empresaSelecionada.banco)
      setAtivo(empresaSelecionada.empresas)
      setEmail(empresaSelecionada.email)
      setAtivo(empresaSelecionada.ativo)
      setIdEmpresa(empresaSelecionada.id)
      setImgUrl('http://appvendasmor-com.umbler.net/uploads/' + empresaSelecionada.url)

    } else {
      setRazaoSocial('')
      setCnpj('')
      setIp('')
      setBanco('')
      setAtivo('')
      setEmail('')
      setImgUrl('')
      setIdEmpresa(0)
    }

  }

  const fileHandler = event => {

    setFile(event.target.files[0]);

  };

  async function GravaEmpresa() {
    setLoading(true)
    event.preventDefault()

    console.log(idEmpresa)

    if (cnpj == '') {

      return
    }

    let anexo = new FormData();
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    anexo.append('img', file)

    await api.put('/api/empresa/' + cnpj,
      {
        'razaoSocial': razaoSocial,
        'cnpj': cnpj,
        'ip': ip,
        'banco': banco,
        'ativo': ativo,
        'email': email,
        'ativo': ativo
      }
    )
      .then(async response => {
        if (file) {
          await api.post('/api/empresa/uploadImgPorCNPJ/' + cnpj, anexo, config)
            .then(response => {
              alert('Empresa alterada com sucesso')
              route.push('/principal')
            })
            .catch(error => {
              alert('Erro ! Verifica o log')
              console.log(error)
              setLoading(false)
            })
        } else {
          alert('Empresa alterada com sucesso')
          route.push('/principal')
        }

      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  async function ExcluirEmpresa() {
    setLoading(true)
    event.preventDefault()


    if (!cnpj) {
      alert('Necessário informar a Empresa ! ')
      setLoading(false)
      return
    }
    await api.delete('/api/empresa/' + cnpj)
      .then(response => {
        alert('Empresa excluida com sucesso !')
        route.push('/principal')
      })
      .catch(error => {
        console.log(error)
        alert('Problema ao excluir. Verificar o log.')
        setLoading(false)
      })
  }

  return (
    <>

      <Menu />

      <div className={styles.Container}>
        <div className={styles.Card}>
          <div className={styles.TituloContainer}>
            <h2 className={styles.Titulo}>Alteração de Empresa</h2>
          </div>
          <form onSubmit={() => GravaEmpresa()} className={styles.form}>
            <NativeSelect
              id="selectEmpresas"
              //value={0}
              onChange={(e) => IgualaEmpresa(e)}
            //input={<BootstrapInput />}
            >
              <option aria-label="None" value=" " >Selecione a Empresa...</option>
              {empresas.map(empresa =>
              (
                <option key={empresa.id} value={empresa.id}>{empresa.razaoSocial}</option>
              )
              )}
            </NativeSelect>

            <br />

            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Razão Social"
              variant="outlined"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              required
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

            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <br />

            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Ativo"
              variant="outlined"
              value={ativo}
              onChange={e => setAtivo(e.target.value.toUpperCase())}
              inputProps={{
                maxLength: 1,
              }}
              required
            />

            <br />

            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Ip"
              variant="outlined"
              value={ip}
              onChange={e => setIp(e.target.value)}
              required
            />

            <br />

            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Banco"
              variant="outlined"
              value={banco}
              onChange={e => setBanco(e.target.value)}
              required
            />

            <br />

            <div className={styles.InputIMG}>
              <input
                id="car"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={fileHandler}
                required
              />
            </div>
            <br />

            <div className={styles.ContainerBtn}>
              <Button
                disabled={loading}
                className={styles.btnGravar}
                type='submit'
                variant="contained"
                color="primary">
                {
                  loading ?
                    <ActivityIndicator size="small" color="#00ff48" />
                    : 'Gravar'}
              </Button>
              <Button
                disabled={loading}
                className={styles.btnGravar}
                onClick={ExcluirEmpresa}
                variant="contained"
                color="secondary">
                {
                  loading ?
                    <ActivityIndicator size="small" color="#00ff48" />
                    : 'Excluir'}
              </Button>
            </div>


          </form>
        </div>
      </div>
    </>
  )
}

export default alteraEmpresa;