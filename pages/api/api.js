import axios from 'axios'

const api = axios.create({
  baseURL: 'https://appvendasmor-com.umbler.net'
})
// FUNÇÃO QUE PASSA O TOKEN DE ACESSO EM TODAS AS ROTAS QUE
// QUE NECESSITA DE AUTENTICAÇÃO
api.interceptors.request.use(async config => {
  const token = localStorage.getItem('Token')
  //const token = JSON.parse(storage)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(async (response) => {
  // Caso nao ocorra nenhuma falha, retorna normal
  return response;
}, async (error) => {
  // Se possuir algum erro no corpo da resposta, refazer o login e tentar novamente

  if (error.response.status === 401 || error.response.status === 403) {

    localStorage.clear()
    location.replace('/')

  }
  return Promise.reject(error);
});

export default api