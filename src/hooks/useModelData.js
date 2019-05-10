import { useState, useEffect } from 'react'

const useModelData = (queryFunction, defaultData = []) => {
  const [forceUpdate, setForceUpdate] = useState(true)

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(defaultData)

  useEffect(
    () => {
      queryFunction().then(function(response) {
        setData(response.data)
        setLoading(false)
      })
    },
    // -- this would warn that queryFunction is a missing dependency --
    // -- there is some discussion here: https://github.com/facebook/create-react-app/issues/6880 --
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forceUpdate]
  )

  return { loading, data, reload: () => setForceUpdate(!forceUpdate) }
}

export default useModelData
