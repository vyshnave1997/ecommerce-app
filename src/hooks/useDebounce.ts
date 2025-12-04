import { useState, useEffect } from 'react'

export function useCustomHook() {
  const [state, setState] = useState(null)

  useEffect(() => {
    // Effect logic
  }, [])

  return { state, setState }
}