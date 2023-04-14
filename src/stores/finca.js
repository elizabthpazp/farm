// stores/finca.js
import { defineStore } from 'pinia'

export const useFincaStore = defineStore('finca', {
  state: () => {
    return { finca: '1',
             user: 'elita',
             pass: '1234',
             role: 'Admin' 
            }
  }, 
  actions: {
    setFinca(newF) {
      this.finca = newF;
    },
    setUser(newF) {
        this.user = newF;
      },
    setRole(newF) {
        this.role = newF;
    },
    setPass(newF) {
      this.pass = newF;
  },
  },
})