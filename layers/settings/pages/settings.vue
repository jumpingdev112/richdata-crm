<!-- biome-ignore lint/correctness/useHookAtTopLevel: Component has no hooks; linter false positive -->
<template>
  <div class="max-w-4xl">
    <h1 class="text-3xl font-bold text-foreground mb-8">Settings</h1>

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-1">
        <nav class="space-y-2">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg transition-colors',
              activeTab === tab ? 'bg-primary text-white' : 'text-foreground hover:bg-bg-secondary',
            ]"
          >
            {{ tab }}
          </button>
        </nav>
      </div>

      <div class="col-span-2">
        <!-- Profile Settings -->
        <template v-if="activeTab === 'Profile'">
          <div class="space-y-6">
            <Card>
              <div class="p-6">
                <h2 class="text-xl font-bold text-foreground mb-4">Profile Settings</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-foreground-subtle text-sm mb-2">Full Name</label>
                    <Input v-model="user.name" />
                  </div>
                  <div>
                    <label class="block text-foreground-subtle text-sm mb-2">Email</label>
                    <Input v-model="user.email" type="email" />
                  </div>
                  <Button>Update Profile</Button>
                </div>
              </div>
            </Card>
          </div>
        </template>

        <!-- User Preferences -->
        <template v-if="activeTab === 'Preferences'">
          <div class="space-y-6">
            <Card>
              <div class="p-6">
                <h2 class="text-xl font-bold text-foreground mb-4">User Preferences</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-foreground-subtle text-sm mb-2">Theme</label>
                    <select v-model="userSettings.theme" class="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg text-foreground">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  <div>
                    <label class="flex items-center gap-3 cursor-pointer">
                      <input v-model="userSettings.notifications" type="checkbox" class="w-4 h-4" />
                      <span class="text-foreground">Push Notifications</span>
                    </label>
                  </div>
                  <div>
                    <label class="flex items-center gap-3 cursor-pointer">
                      <input v-model="userSettings.emailNotifications" type="checkbox" class="w-4 h-4" />
                      <span class="text-foreground">Email Notifications</span>
                    </label>
                  </div>
                  <Button @click="savePreferences">Save Preferences</Button>
                </div>
              </div>
            </Card>
          </div>
        </template>

        <!-- Organization -->
        <template v-if="activeTab === 'Organization'">
          <div class="space-y-6">
            <Card>
              <div class="p-6">
                <h2 class="text-xl font-bold text-foreground mb-4">Organization Settings</h2>
                <div class="space-y-4 mb-6">
                  <div>
                    <label class="block text-foreground-subtle text-sm mb-2">Organization Name</label>
                    <Input v-model="organization.name" />
                  </div>
                  <div>
                    <label class="block text-foreground-subtle text-sm mb-2">Timezone</label>
                    <select v-model="organization.timezone" class="w-full px-3 py-2 bg-bg-tertiary border border-border rounded-lg text-foreground">
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="CST">CST</option>
                      <option value="PST">PST</option>
                    </select>
                  </div>
                  <Button @click="saveOrganization">Save Settings</Button>
                </div>

                <h3 class="text-lg font-bold text-foreground mb-4 mt-6 pt-6 border-t border-border">Team Members</h3>
                <div class="space-y-3">
                  <div
                    v-for="member in organization.members"
                    :key="member.id"
                    class="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
                  >
                    <div>
                      <p class="text-foreground font-medium">{{ member.name }}</p>
                      <p class="text-foreground-subtle text-sm">{{ member.email }}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <Badge variant="info">{{ member.role }}</Badge>
                      <button @click="removeTeamMember(member.id)" class="text-error hover:text-error/80">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '../stores/settings'
import { ref, reactive } from 'vue'
import { definePageMeta, useHead } from '#imports'
import Card from '#shared-ui/components/ui/Card.vue'
import Input from '#shared-ui/components/ui/Input.vue'
import Button from '#shared-ui/components/ui/Button.vue'
import Badge from '#shared-ui/components/Badge.vue'

const settingsStore = useSettingsStore()

const activeTab = ref('Profile')
const tabs = ['Profile', 'Preferences', 'Organization']

const user = reactive(settingsStore.user)
const userSettings = reactive(settingsStore.userSettings)
const organization = reactive(settingsStore.organization)

const savePreferences = () => {
  settingsStore.updateUserSettings(userSettings)
}

const saveOrganization = () => {
  settingsStore.updateOrganization(organization)
}

const removeTeamMember = (id: string) => {
  settingsStore.removeTeamMember(id)
}

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Settings - CRM',
})
</script>
