import { defineStore } from "pinia"

export interface Document {
  id: string
  title: string
  description: string
  type: "contract" | "proposal" | "report" | "other"
  status: "draft" | "pending-review" | "approved" | "archived"
  owner: string
  createdAt: Date
  updatedAt: Date
  sharedWith: string[]
  tags: string[]
}

export const useDocumentStore = defineStore("document", {
  state: () => ({
    documents: [] as Document[],
    selectedDocument: null as Document | null,
    filter: "all" as "all" | "my-docs" | "shared",
  }),

  getters: {
    filteredDocuments: (state) => {
      switch (state.filter) {
        case "my-docs":
          return state.documents.filter((d) => d.owner === "me")
        case "shared":
          return state.documents.filter((d) => d.sharedWith.length > 0)
        default:
          return state.documents
      }
    },

    documentsByType: (state) => {
      return {
        contract: state.documents.filter((d) => d.type === "contract"),
        proposal: state.documents.filter((d) => d.type === "proposal"),
        report: state.documents.filter((d) => d.type === "report"),
        other: state.documents.filter((d) => d.type === "other"),
      }
    },
  },

  actions: {
    async fetchDocuments() {
      this.documents = [
        {
          id: "1",
          title: "Q4 Business Proposal",
          description: "Annual proposal for Q4 initiatives",
          type: "proposal",
          status: "approved",
          owner: "me",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          sharedWith: ["john@example.com", "sarah@example.com"],
          tags: ["business", "q4"],
        },
        {
          id: "2",
          title: "Client Contract - TechCorp",
          description: "Service contract with TechCorp Inc",
          type: "contract",
          status: "pending-review",
          owner: "john@example.com",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          sharedWith: ["me"],
          tags: ["legal", "techcorp"],
        },
      ]
    },

    selectDocument(id: string) {
      this.selectedDocument = this.documents.find((d) => d.id === id) || null
    },

    deleteDocument(id: string) {
      this.documents = this.documents.filter((d) => d.id !== id)
      if (this.selectedDocument?.id === id) this.selectedDocument = null
    },

    addDocument(doc: Omit<Document, "id" | "createdAt" | "updatedAt">) {
      this.documents.push({
        ...doc,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Document)
    },

    setFilter(filter: "all" | "my-docs" | "shared") {
      this.filter = filter
    },
  },
})
