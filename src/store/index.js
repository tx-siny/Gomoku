import { createStore } from 'vuex'

import ModulePk from './pk'
import ModuleUser from './user'
import ModuleRecord from './record'

export default createStore({
  state: {
    // base_url: '192.168.31.153:2002'
    // base_url: '192.168.194.174:2002',
    base_url: '127.0.0.1:2002',
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
