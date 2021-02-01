import { Button, NativeSelect, TextField } from '@material-ui/core';
import React, { useEffect, useState, } from 'react';
import { ActivityIndicator } from 'react-native-web'

import styles from '../styles/alteraUsuario.module.css'
import api from './api/api'
import { useRouter } from 'next/router'
import Menu from './_componentes/Menu/Menu'

function alteraEmpresa() {

  const route = useRouter()

  const [empresas, setEmpresas] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [idUsuario, setIdUsuario] = useState(0)
  const [usuario, setUsuario] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [ativo, setAtivo] = useState(false)
  const [administrador, setAdministrador] = useState(false)
  const [usuarioMOR, setUsuarioMOR] = useState(false)
  const [loading, setLoading] = useState(false)

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

  async function CarregaUsuario(e) {
    await api.get('/api/usuario/cnpj/' + e)
      .then(response => {
        setUsuarios(response.data)

      })
      .catch(error => {
        console.log(error)
      })
  }

  function IgualaEmpresa(e) {
    const index = e.target.value

    const empresaSelecionada = empresas.find(e => e.id == index)

    console.log(empresaSelecionada)

    if (empresaSelecionada) {

      CarregaUsuario(empresaSelecionada.cnpj)

    } else {

      setUsuarios([])
      setUsuario('')
      setCnpj('')
      setEmail('')
      setAtivo(false)
      setAdministrador(false)
      setUsuarioMOR(false)
    }

  }

  function IgualaUsuario(e) {
    const index = e.target.value

    const usuarioSelecionado = usuarios.find(e => e.id == index)
    console.log(usuarioSelecionado)

    if (usuarioSelecionado) {
      setIdUsuario(usuarioSelecionado.id)
      setUsuario(usuarioSelecionado.usuario)
      setCnpj(usuarioSelecionado.cnpj)
      setEmail(usuarioSelecionado.email)
      setAtivo(usuarioSelecionado.ativo == "S" ? true : false)
      setAdministrador(usuarioSelecionado.administrador == "S" ? true : false)
      setUsuarioMOR(usuarioSelecionado.usuarioMOR == "S" ? true : false)
    } else {
      setIdUsuario(0)
      setUsuario('')
      setCnpj('')
      setEmail('')
      setAtivo(false)
      setAdministrador(false)
      setUsuarioMOR(false)
    }
  }


  async function GravaUsuario() {
    setLoading(true)
    event.preventDefault()

    if (idUsuario == 0) {

      return
    }

    let dados =
    {
      "usuario": usuario,
      "email": email,
      "cnpj": cnpj,
      "senha": senha,
      "ativo": ativo ? 'S' : 'N',
      "administrador": administrador ? 'S' : 'N',
      "usuarioMOR": usuarioMOR ? 'S' : 'N'
    }

    console.log(dados)

    await api.put('/api/usuario/' + idUsuario, dados)
      .then(response => {
        console.log(response.data)
        alert('Usuário alterado com sucesso !')
        route.push('/principal')
      })
      .catch(error => {
        console.log(error)
        alert('Problema ao alterar o usuário !')
      })

  }

  async function ExcluirUsuario() {
    setLoading(true)

    event.preventDefault()

    if (idUsuario == 0) {
      setLoading(false)
      return
    }

    let confirma = confirm('Deseja mesmo excluir ?')

    if (confirma == false) {
      setLoading(false)
      return
    }

    await api.delete('/api/usuario/' + idUsuario)
      .then(response => {
        alert('Usuario excluida com sucesso !')
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
            <h2 className={styles.Titulo}>Alteração de Usuários</h2>
          </div>
          <form onSubmit={() => GravaUsuario()} className={styles.form}>
            <NativeSelect
              id="selectEmpresas"
              //value={0}
              onChange={(e) => IgualaEmpresa(e)}
            //input={<BootstrapInput />}
            >
              <option aria-label="None" value=" " >Selecione o Empresa...</option>
              {empresas.map(empresa =>
              (
                <option key={empresa.id} value={empresa.id}>{empresa.razaoSocial}</option>
              )
              )}
            </NativeSelect>
            <br />
            <NativeSelect
              id="selectUsuarios"
              //value={0}
              onChange={(e) => IgualaUsuario(e)}
            //input={<BootstrapInput />}
            >
              <option aria-label="None" value=" " >Selecione o Usuário...</option>
              {usuarios.length > 0 ? usuarios.map(usuario =>
              (
                <option key={usuario.id} value={usuario.id}>{usuario.usuario}</option>
              )
              ) : <></>}
            </NativeSelect>

            <br />
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
                <input className={styles.Radio} type="checkbox" checked={usuarioMOR}
                  value={usuarioMOR} onChange={() => setUsuarioMOR(!usuarioMOR)} />
              </div>
              <div className={styles.GroupRadio}>
                <label> Administrador</label>
                <input className={styles.Radio} type="checkbox" checked={administrador}
                  value={administrador} onChange={() => setAdministrador(!administrador)} />
              </div>
              <div className={styles.GroupRadio}>
                <label> Ativo</label>
                <input className={styles.Radio} type="checkbox" checked={ativo}
                  value={ativo} onChange={() => setAtivo(!ativo)} />
              </div>
            </div>

            <br />
            <TextField
              className={styles.input}
              id="outlined-basic"
              label="Nova Senha"
              variant="outlined"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <br />


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
                onClick={ExcluirUsuario}
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