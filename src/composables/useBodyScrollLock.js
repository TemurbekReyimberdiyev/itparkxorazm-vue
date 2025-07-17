import { watch, onUnmounted } from 'vue'

export function useBodyScrollLock(isOpen) {
  const unlock = () => {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
  }

  watch(isOpen, (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      unlock()
    }
  })

  onUnmounted(unlock)

  window.addEventListener('beforeunload', unlock)
}
