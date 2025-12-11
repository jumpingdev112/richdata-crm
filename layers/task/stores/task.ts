import { defineStore } from "pinia"

export interface Task {
  id: string
  title: string
  description: string
  status: "backlog" | "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignee?: string
  dueDate?: Date
  labels: string[]
  subtasks: Array<{ id: string; title: string; completed: boolean }>
  createdAt: Date
  updatedAt: Date
}

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
    selectedTask: null as Task | null,
    filter: "all" as "all" | "my-tasks" | "urgent",
    searchQuery: "",
  }),

  getters: {
    filteredTasks: (state) => {
      let result = state.tasks

      if (state.filter === "my-tasks") {
        result = result.filter((t) => t.assignee === "me")
      } else if (state.filter === "urgent") {
        result = result.filter((t) => t.priority === "urgent" && t.status !== "done")
      }

      if (state.searchQuery) {
        result = result.filter((t) => t.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
      }

      return result
    },

    tasksByStatus: (state) => {
      return {
        backlog: state.tasks.filter((t) => t.status === "backlog"),
        todo: state.tasks.filter((t) => t.status === "todo"),
        "in-progress": state.tasks.filter((t) => t.status === "in-progress"),
        review: state.tasks.filter((t) => t.status === "review"),
        done: state.tasks.filter((t) => t.status === "done"),
      }
    },
  },

  actions: {
    async fetchTasks() {
      this.tasks = [
        {
          id: "1",
          title: "Design new dashboard layout",
          description: "Create mockups for the updated dashboard",
          status: "in-progress",
          priority: "high",
          assignee: "me",
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          labels: ["Design", "UI"],
          subtasks: [
            { id: "1", title: "Create wireframes", completed: true },
            { id: "2", title: "Design components", completed: false },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          title: "API integration",
          description: "Connect to the backend API",
          status: "todo",
          priority: "urgent",
          assignee: "me",
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          labels: ["Backend", "Integration"],
          subtasks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    },

    updateTaskStatus(id: string, status: Task["status"]) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.status = status
    },

    selectTask(id: string) {
      this.selectedTask = this.tasks.find((t) => t.id === id) || null
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      if (this.selectedTask?.id === id) this.selectedTask = null
    },

    addTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">) {
      this.tasks.push({
        ...task,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Task)
    },

    setFilter(filter: "all" | "my-tasks" | "urgent") {
      this.filter = filter
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },
  },
})
