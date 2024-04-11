import { createStore } from 'vuex'

import ModulePk from './pk'
import ModuleUser from './user'
import ModuleRecord from './record'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    pk: ModulePk,
    user: ModuleUser,
    record: ModuleRecord
  }
})
