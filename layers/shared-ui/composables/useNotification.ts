import { useUIStore } from "../stores/ui"

export const useNotification = () => {
  const uiStore = useUIStore()

  return {
    success: (message: string) => uiStore.addNotification("success", message),
    error: (message: string) => uiStore.addNotification("error", message),
    warning: (message: string) => uiStore.addNotification("warning", message),
    info: (message: string) => uiStore.addNotification("info", message),
  }
}
