import { useState, useEffect } from 'react'

const useModelData = queryFunction => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    queryFunction().then(function(response) {
      setData(response.data)
      setLoading(false)
    })
  }, [])

  return [loading, data]
}

export default useModelData
