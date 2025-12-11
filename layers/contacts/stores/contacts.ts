import { defineStore } from "pinia"

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  tags: string[]
  notes?: string
  createdAt: Date
  lastInteraction?: Date
}

export const useContactsStore = defineStore("contacts", {
  state: () => ({
    contacts: [] as Contact[],
    selectedContact: null as Contact | null,
    searchQuery: "",
  }),

  getters: {
    filteredContacts: (state) => {
      if (!state.searchQuery) return state.contacts

      return state.contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    },
  },

  actions: {
    async fetchContacts() {
      this.contacts = [
        {
          id: "1",
          name: "John Smith",
          email: "john@example.com",
          phone: "+1 (555) 123-4567",
          company: "Tech Corp",
          position: "Manager",
          tags: ["client", "vip"],
          notes: "Important client for Q4",
          createdAt: new Date(),
          lastInteraction: new Date(Date.now() - 86400000),
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+1 (555) 234-5678",
          company: "Design Studio",
          position: "Creative Lead",
          tags: ["partner"],
          createdAt: new Date(),
        },
      ]
    },

    selectContact(id: string) {
      this.selectedContact = this.contacts.find((c) => c.id === id) || null
    },

    deleteContact(id: string) {
      this.contacts = this.contacts.filter((c) => c.id !== id)
      if (this.selectedContact?.id === id) this.selectedContact = null
    },

    addContact(contact: Omit<Contact, "id" | "createdAt">) {
      this.contacts.push({
        ...contact,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
      } as Contact)
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },
  },
})
