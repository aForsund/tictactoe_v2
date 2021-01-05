import API_interface from "@/services/API-interface.js";
import MySocket from '@/services/mysocket.js'
import LoginModal from "@/components/LoginModal.vue";
import { ModalProgrammatic as Modal } from 'buefy';




export const namespaced = true;

export const state = {
  user: null,
  users: null,
  modal: {
    show: false,
    resolve: null,
  },
  multiplayer: {
    show: false,
    resolve: null
  },
  online: false,
  messages: null,
  socket: null,
  activeChat: false,
  activeInstance: null,
}


export const mutations = {
    SET_NEW_USER(state) {
      state.user = {};
    },
    SET_USER_TOKEN(state, token, expiresIn) {
      state.user.token = token;
      state.user.expiresIn = expiresIn;
    },
    SET_USER_NAME(state, name) {
      state.user.name = name;
    },
    SET_USER_ID(state, id) {
      state.user.id = id;
    },
    SET_USER_LOCALSTORAGE(state) {
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    SET_USER_DATA(state, data) {
      state.user = data;
    },
    CLEAR_USER_LOCALSTORAGE() {
      localStorage.removeItem('user');
      location.reload();
      //state.user = null;
    },
    SHOW_LOGIN(state) {
      state.modal.instance = Modal.open({
        parent: this.parent,
        component: LoginModal,
        hasModalCard: true,
        customClass: "",
        trapFocus: true,
        events: {
          logIn: packet => {
            console.log(packet);
            this.dispatch('user/logIn', packet);
          },
          register: packet => {
            console.log(packet);
            this.dispatch('user/register', packet);
          }
        } 
      });
    },

    HIDE_LOGIN(state) {
      console.log('hiding modal...');
      state.modal.instance.close();
    },
    ENABLE_ONLINE(state) {
      state.online = true;
    },
    DISABLE_ONLINE(state) {
      state.online = false;
      state.socket = null;
    },
    OPEN_SOCKET_CONNECTION(state) {
      state.socket = new MySocket(state.user);
      
    },
    CLOSE_SOCKET_CONNECTION(state) {
      state.socket.logOut();
      
    },
    JOIN_CHAT(state) {
      state.socket.joinChat();
      state.activeChat = true;
    },
    LEAVE_CHAT(state) {
      state.socket.leaveChat();
      state.activeChat = false;
    },
    SEND_MESSAGE(state, message) {
      state.socket.sendMessage(message);
    },
    LINK_USERS_ARRAY(state) {
      if (state.socket) state.users = state.socket.users;
    },
    CHALLENGE(state, user) {
      state.socket.challenge(user);
    },
    ACCEPT(state, challenge) {
      console.log('accepted challenge', challenge);
      state.socket.acceptChallenge(challenge);
    },
    DISMISS(state, notification) {
      console.log('dismiss notification', notification);
      state.socket.removeNotification(state.user.name, notification);
      //let index = state.socket.notifications.findIndex(index => index === challenge);
      //if (index !== -1) state.socket.notifications.splice(index, 1);
    },
    JOIN_MULTIPLAYER_GAME(state, id) {
      state.socket.joinGame(state.user.name, id);
    },
    ACTIVATE_INSTANCE(state, id) {
      state.activeInstance = id;
      console.log('active instance is now ', state.activeInstance);
      //Force update of entire object...
      let temp = {...state.socket.collection[id]};
      
      state.socket.collection[id] = {...temp};

      let index = state.socket.collectionIndex.findIndex(index => index === id);
      state.socket.collectionIndex.splice(index, 1, id);
    },
    DEACTIVATE_INSTANCE(state) {
      state.activeInstance = null;
    },
    MAKE_MOVE(state, move) {
      state.socket.makeMove(state.user.name, state.activeInstance, move);
    },
    CLEAR_COUNTDOWN(state, id) {
      state.socket.updateCountdown(id);
      let temp = {...state.socket.collection[id]};
      
      state.socket.collection[id] = {...temp};

      //state.socket.gameNotifications.splice(index, 1, state.socket.gameNotifications[index]);
      //state.socket.spliceNotification(index, state.socket.gameNotifications[index]);
      //Vue.set(state.socket.gameNotifications, index, state.socket.gameNotifications[index]);
    },

    async UPDATE_USER_DETAILS(state, user = null) {
      if (!user) user = await API_interface.getUser(state.user.id)
        .then(response => user = response.data)
        .catch(err => console.log(err));
      if (user) {
        state.user.details = {
          gamesPlayed: user.gamesPlayed,
          lastOutcomes: user.lastOutcomes ? user.lastOutcomes.join('') : '',
          rating: user.rating
        };
      }
      //Force Vue.js update..
      let temp = {...state.user.details};
      state.user.details = {...temp}; 
    },
    REMOVE_INSTANCE(state, id) {
      state.socket.deleteGame(id);
      if (state.activeInstance === id) state.activeInstance = null;
    }
  }
export const actions = {
    logIn({ commit }, data) {
      API_interface.loginUser(data)
        .then(response => {
          console.log(data);
          console.log(response.data);
          commit('SET_NEW_USER');
          commit('SET_USER_NAME', data.name);
          commit('SET_USER_ID', response.data.user._id);
          commit('SET_USER_TOKEN', response.data.token, response.data.expiresIn);
          commit('SET_USER_LOCALSTORAGE');
          commit('HIDE_LOGIN');
          commit('UPDATE_USER_DETAILS', response.data.user);
        })
        .catch(err => console.log(err));
      
    },
    logOut({ commit }) {
      console.log('trying to log out...');

      commit('CLEAR_USER_LOCALSTORAGE');
    },
    register({ commit }, data) {
      API_interface.registerUser(data)
        .then(response => {
          console.log(data);
          console.log(response.data);
          commit('SET_NEW_USER');
          commit('SET_USER_NAME', data.name);
          commit('SET_USER_TOKEN', response.data.token, response.data.expiresIn);
          commit('SET_USER_ID', response.data.user._id);
          commit('SET_USER_LOCALSTORAGE');
          commit('HIDE_LOGIN');
          commit('UPDATE_USER_DETAILS', response.data.user);
        })
        .catch(err => console.log(err));
    },
    setUser({ commit }, data) {
      commit('SET_USER_DATA', data);
      commit('UPDATE_USER_DETAILS');
    },
    showModal({ commit }) {
      commit('SHOW_MODAL');
    },

    hideModal({ commit }) {
      commit('HIDE_MODAL');
    },
    //remove this or showModal()
    openModal({ commit }) {
      commit('SHOW_LOGIN');
    },
    enableOnline({ commit }) {
      commit('ENABLE_ONLINE');
      commit('OPEN_SOCKET_CONNECTION');
      commit('LINK_USERS_ARRAY');
    },
    disableOnline({ commit }) {
      commit('LEAVE_CHAT')
      commit('CLOSE_SOCKET_CONNECTION');
      commit('UPDATE_USER_DETAILS');
      commit('DISABLE_ONLINE');
      
    },
    testJWT(context) {
      API_interface.testJWT2(state.user.token)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log('there was an error...', err);
          if (err.response.status === 401) context.dispatch('logOut');
        })
    },
    joinChat({ commit }) {
      commit('JOIN_CHAT');
    },
    leaveChat({ commit }) {
      commit('LEAVE_CHAT');
    },
    sendMessage({ commit}, message) {
      console.log('sending message ', message);
      commit('SEND_MESSAGE', message);
    },
    challenge({ commit }, user) {
      console.log('challenging', user);
      commit('CHALLENGE', user);
    },
    accept({ commit }, challenge) {
      console.log(`accepting ${challenge}`);
      commit('ACCEPT', challenge);
    },
    dismiss({ commit }, notification) {
      console.log('dismissing challenge');
      commit('DISMISS', notification);
    },
    getChallenges() {
      API_interface.getChallenges(state.user.token, state.user.name)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },
    joinGame({ commit }, instance) {
      console.log('attempting to join multiplayer game...');
      commit('JOIN_MULTIPLAYER_GAME', instance);
      commit('ACTIVATE_INSTANCE', instance.id);
    },
    activateInstance({ commit }, id) {
      commit('ACTIVATE_INSTANCE', id);
    },
    makeMove({ commit }, move) {
      console.log('makeMove', move);
      commit('MAKE_MOVE', move);
    },
    clearCountdown({ commit }, id) {
      commit('CLEAR_COUNTDOWN', id);
    },
    updateUser({ commit }) {
      commit('UPDATE_USER_DETAILS');
    },
    closeGame({ commit }) {
      commit('DEACTIVATE_INSTANCE');
    },
    removeInstance({ commit }, id) {
      commit('REMOVE_INSTANCE', id);
    }
 }

export const getters = {
    loggedIn(state) {
      return !!state.user;
    },
    modalActive(state) {
      return state.modal.show;
    },
    online(state) {
      return state.online;
    },
    messages(state) {
      return state.messages;
    },
    user(state) {
      return state.user;
    },
    users(state) {
      return state.socket.users;
    },
    socket(state){
      return state.socket;
    },
    activeChat(state) {
      return state.activeChat;
    },
    activeInstance(state) {
       if (state.socket) 
        return state.socket.collection[state.activeInstance];
    },
    activeInstanceId(state) {
      return state.activeInstance;
    },
    gameNotifications(state) {
      return state.socket.collection[state.activeInstance].notifications;
    },
    gameProgress(state) {
      
      return state.socket.collection[state.activeInstance].progress;
    },
    gameCountdown(state) {
      
      return state.socket.collection[state.activeInstance].countdown;
    }

  }

  

