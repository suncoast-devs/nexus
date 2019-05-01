import { useState } from 'react'

const useForceUpdate = () => {
  const [value, set] = useState(true) // boolean state
  return () => set(!value) // toggle the state to force render
}

export default useForceUpdate
