import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const menuIsOpenState = atom({
  key: 'menu',
  default: false
})

export const useMenu = () => {
  const [isOpen, setIsOpen] = useRecoilState(menuIsOpenState)
  const toggle = useCallback(() => {
    setIsOpen(value => !value)
  }, [setIsOpen])

  return {
    isOpen,
    toggle
  }
}
