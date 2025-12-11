import { defineStore } from "pinia"

export interface UserSettings {
  theme: "light" | "dark" | "system"
  notifications: boolean
  emailNotifications: boolean
  language: string
}

export interface OrganizationSettings {
  name: string
  logo?: string
  timezone: string
  language: string
  members: Array<{ id: string; name: string; email: string; role: "admin" | "user" }>
}

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "👤",
    },
    userSettings: {
      theme: "dark" as "light" | "dark" | "system",
      notifications: true,
      emailNotifications: true,
      language: "en",
    } as UserSettings,
    organization: {
      name: "Acme Corporation",
      timezone: "UTC",
      language: "en",
      members: [
        { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
      ],
    } as OrganizationSettings,
  }),

  actions: {
    updateUserSettings(settings: Partial<UserSettings>) {
      this.userSettings = { ...this.userSettings, ...settings }
    },

    updateOrganization(org: Partial<OrganizationSettings>) {
      this.organization = { ...this.organization, ...org }
    },

    addTeamMember(member: OrganizationSettings["members"][0]) {
      this.organization.members.push(member)
    },

    removeTeamMember(id: string) {
      this.organization.members = this.organization.members.filter((m) => m.id !== id)
    },
  },
})
