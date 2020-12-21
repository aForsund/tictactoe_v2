import API_interface from "@/services/API-interface.js";
import MySocket from '@/services/mysocket.js'
import LoginModal from "@/components/LoginModal.vue";
import MultiplayerModal from "@/components/MultiplayerModal.vue"
import { ModalProgrammatic as Modal } from 'buefy';
import Vue from 'vue';



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
    SET_USER_TOKEN(state, userData) {
      state.user.token = userData.token;
      state.user.expiresIn = userData.expiresIn;
    },
    SET_USER_NAME(state, name) {
      state.user.name = name;
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
    SHOW_MULTIPLAYER(state) {
      state.multiplayer.instance = Modal.open({
        parent: this.parent,
        component: MultiplayerModal,
        trapFocus: true,
        canCancel: false,
        events: {
          makeMove: packet => {
            console.log(packet);
            this.dispatch('user/makeMove', packet);
          },
          cancelGame: () => {
            this.dispatch('cancelGame');
          }
        }

      });
    },
    ENABLE_ONLINE(state) {
      state.online = true;
    },
    DISABLE_ONLINE(state) {
      state.online = false;
    },
    OPEN_SOCKET_CONNECTION(state) {
      state.socket = new MySocket(state.user);
      
    },
    CLOSE_SOCKET_CONNECTION(state) {
      state.socket.logOut();
      state.socket = null;
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
    JOIN_MULTIPLAYER_GAME(state, instance) {
      state.socket.joinGame(state.user.name, instance.id);
    },
    ACTIVATE_INSTANCE(state, id) {
      state.activeInstanceId = id;
      let instanceIndex = state.socket.instances.findIndex(async index => {
        while (!index.id) {
          await new Promise(resolve => setTimeout(resolve, 0));
          console.log('waiting in findIndex function...');
        }
        index.id === id
      });
      Vue.set(state.socket.instances, 1, state.socket.instances[instanceIndex]);
      //state.socket.spliceInstance(instanceIndex, 1, state.socket.instances[instanceIndex]);
      let notificationIndex = state.socket.gameNotifications.findIndex(async index => {
        while (!index.id) {
          await new Promise(resolve => setTimeout(resolve, 0));
          console.log('waiting in findIndex function...');
        }
        index.id === id
      });
      Vue.set(state.socket.gameNotifications, notificationIndex, state.socket.gameNotifications[notificationIndex]);
      //state.socket.gameNotifications.splice(notificationIndex, 1, state.socket.gameNotifications[notificationIndex]);
      //state.socket.spliceNotification(notificationIndex, state.socket.gameNotifications[notificationIndex]);
    },
    DEACTIVATE_INSTANCE(state) {
      state.instance = null;
    },
    MAKE_MOVE(state, move) {
      state.socket.makeMove(state.user.name, state.activeInstanceId, move);
    },
    CLEAR_COUNTDOWN(state) {
      let index = state.socket.gameNotifications.findIndex(async index => {
        while (!index.id) {
          await new Promise(resolve => setTimeout(resolve, 0));
          console.log('waiting in findIndex function...');
        }
        index.id === state.activeInstanceId
      });
      state.socket.gameNotifications[index].countdown = 0;
      //state.socket.gameNotifications.splice(index, 1, state.socket.gameNotifications[index]);
      //state.socket.spliceNotification(index, state.socket.gameNotifications[index]);
      Vue.set(state.socket.gameNotifications, index, state.socket.gameNotifications[index]);
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
          commit('SET_USER_TOKEN', response.data);
          commit('SET_USER_LOCALSTORAGE');
          commit('HIDE_LOGIN');
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
          commit('SET_USER_TOKEN', response.data);
          commit('SET_USER_LOCALSTORAGE');
          commit('HIDE_LOGIN');
        })
        .catch(err => console.log(err));
    },
    setUser({ commit }, data) {
      commit('SET_USER_DATA', data);
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
      commit('DISABLE_ONLINE');
      commit('CLOSE_SOCKET_CONNECTION');
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
    activateInstance({ commit }, instance) {
      commit('ACTIVATE_INSTANCE', instance.id);
    },
    makeMove({ commit }, move) {
      console.log('makeMove', move);
      commit('MAKE_MOVE', move);
    },
    clearCountdown({ commit }) {
      commit('CLEAR_COUNTDOWN');
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
      if (state.socket) {
        if (state.socket.instances) {
          let index = state.socket.instances.findIndex(async index => {
            while (!index.id) {
              await new Promise(resolve => setTimeout(resolve, 0));
              console.log('waiting in findIndex function...');
            }
            index.id == state.activeInstanceId
          });
          if (index === -1) return null;
          else {
            return state.socket.instances[index];
            
          }
        } else return null;
      } else return null;
    },
    gameNotifications(state) {
      if (!state.socket.gameNotifications) return null;
      let index = state.socket.gameNotifications.findIndex(async index => {
        while (!index.id) {
          await new Promise(resolve => setTimeout(resolve, 0));
          console.log('waiting in findIndex function...');
        }
        index.id === state.activeInstanceId
      });
      return state.socket.gameNotifications[index].notificationArr;
    },
    gameProgress(state) {
      let index = state.socket.gameNotifications.findIndex(async index => {
        while (!index.id) {
          await new Promise(resolve => setTimeout(resolve, 0));
          console.log('waiting in findIndex function...');
        }
        index.id === state.activeInstanceId
      });
      console.log(state.socket.gameNotifications[index]);
      return state.socket.gameNotifications[index].progress;
    },
    gameCountdown(state) {
      let index = state.socket.gameNotifications.findIndex(async index => {
        while (!index.id) {
          await new Promise(resolve => setTimeout(resolve, 0));
          console.log('waiting in findIndex function...');
        }
        index.id === state.activeInstanceId
      });
      console.log(state.socket.gameNotifications[index]);
      return state.socket.gameNotifications[index].countdown;
    }

  }

  

