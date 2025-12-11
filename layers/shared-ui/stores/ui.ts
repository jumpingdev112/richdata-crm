import { defineStore } from "pinia"

export const useUIStore = defineStore("ui", {
  state: () => ({
    sidebarOpen: true,
    theme: "dark" as "light" | "dark",
    notifications: [] as Array<{
      id: string
      type: "success" | "error" | "warning" | "info"
      message: string
    }>,
  }),

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark"
    },

    addNotification(type: "success" | "error" | "warning" | "info", message: string) {
      const id = Math.random().toString(36).substring(7)
      this.notifications.push({ id, type, message })

      setTimeout(() => {
        this.notifications = this.notifications.filter((n) => n.id !== id)
      }, 5000)
    },
  },
})
