import API_interface from "@/services/API-interface.js";
import MySocket from '@/services/mysocket.js'
import LoginModal from "@/components/LoginModal.vue";
import MultiplayerModal from "@/components/MultiplayerModal.vue"
import { ModalProgrammatic as Modal } from 'buefy';



export const namespaced = true;

export const state = {
  user: null,
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
        customClass: "custom-class custom-class-2",
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
      commit('SEND_MESSAGE', message)
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
    socket(state){
      return state.socket;
    },
    activeChat(state) {
      return state.activeChat;
    }
  }

  

