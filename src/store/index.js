import User from '@/models/user';
import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [new User("", 0), new User("", 0)],
  },
  mutations: {
    changePlayerName(state, {index, name}){
        state.players[index].name = name;
    }
  }
});
