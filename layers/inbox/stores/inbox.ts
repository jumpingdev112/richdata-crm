import { defineStore } from "pinia"

export interface Email {
  id: string
  from: string
  subject: string
  preview: string
  body: string
  timestamp: Date
  read: boolean
  starred: boolean
  folder: "inbox" | "sent" | "draft" | "archive"
  attachments: Array<{ name: string; size: string }>
}

export const useInboxStore = defineStore("inbox", {
  state: () => ({
    emails: [] as Email[],
    selectedEmail: null as Email | null,
    filter: "all" as "all" | "unread" | "starred",
  }),

  getters: {
    filteredEmails: (state) => {
      switch (state.filter) {
        case "unread":
          return state.emails.filter((e) => !e.read)
        case "starred":
          return state.emails.filter((e) => e.starred)
        default:
          return state.emails
      }
    },

    unreadCount: (state) => state.emails.filter((e) => !e.read).length,
  },

  actions: {
    async fetchEmails() {
      // Mock data for demo
      this.emails = [
        {
          id: "1",
          from: "john@example.com",
          subject: "Project Update - Q4 Goals",
          preview: "Here are the Q4 goals for our project...",
          body: "Full email body content here...",
          timestamp: new Date(Date.now() - 3600000),
          read: false,
          starred: true,
          folder: "inbox",
          attachments: [{ name: "Q4-goals.pdf", size: "2.5 MB" }],
        },
        {
          id: "2",
          from: "sarah@example.com",
          subject: "Design Review Meeting",
          preview: "The design review is scheduled for...",
          body: "Full email body content here...",
          timestamp: new Date(Date.now() - 7200000),
          read: true,
          starred: false,
          folder: "inbox",
          attachments: [],
        },
      ]
    },

    toggleRead(id: string) {
      const email = this.emails.find((e) => e.id === id)
      if (email) email.read = !email.read
    },

    toggleStarred(id: string) {
      const email = this.emails.find((e) => e.id === id)
      if (email) email.starred = !email.starred
    },

    selectEmail(id: string) {
      this.selectedEmail = this.emails.find((e) => e.id === id) || null
    },

    deleteEmail(id: string) {
      this.emails = this.emails.filter((e) => e.id !== id)
      if (this.selectedEmail?.id === id) this.selectedEmail = null
    },

    setFilter(filter: "all" | "unread" | "starred") {
      this.filter = filter
    },
  },
})
