import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  const [token, setToken] = useState('')

  useEffect(() => {

    VerificaLogado()
  })

  function VerificaLogado() {
    if (localStorage.getItem('Token')) {
      router.push('/principal')
    } else {
      router.push('/login')
      localStorage.clear()
    }

  }

return(<></>)
}
