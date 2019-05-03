import { useState, useEffect } from 'react'

const useModelData = queryFunction => {
  const [forceUpdate, setForceUpdate] = useState(true) // boolean state

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(
    () => {
      queryFunction().then(function(response) {
        setData(response.data)
        setLoading(false)
      })
    },
    [forceUpdate]
  )

  return { loading, data, reload: () => setForceUpdate(!forceUpdate) }
}

export default useModelData
