import API_interface from "@/services/API-interface.js";
import LoginModal from "@/components/LoginModal.vue";
import { ModalProgrammatic as Modal } from 'buefy';

export const namespaced = true;

export const state = {
  user: null,
  modal: {
    show: false,
    resolve: null,
  },
  online: false,
  messages: null
}


export const mutations = {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
    },
    CLEAR_USER_DATA(state) {
      localStorage.removeItem('user');
      state.user = null;
    },
    SHOW_MODAL(state) {
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
          }
        } 
      });
    },
    HIDE_MODAL(state) {
      
      console.log('hiding modal...');
      state.modal.instance.close();
    },
    ENABLE_ONLINE(state) {
      state.online = true;
    },
    DISABLE_ONLINE(state) {
      state.online = false;
    }

  }
export const actions = {
    logIn({ commit }, data) {
      console.log('hello from inside user module - actions - logIn');
      API_interface.loginUser(data)
        .then(response => {
          console.log(response);
          commit('SET_USER_DATA', response);
          commit('HIDE_MODAL');
        })
        .catch(err => console.log(err))
      
    },
    logOut({ commit }) {
      console.log('trying to log out...');
      commit('CLEAR_USER_DATA');
    },
    showModal({ commit }) {
      commit('SHOW_MODAL');
    },

    hideModal({ commit }) {
      commit('HIDE_MODAL');
    },
    //remove this or showModal()
    openModal({ commit }) {
      commit('SHOW_MODAL');
    },
    enableOnline({ commit }) {
      commit('ENABLE_ONLINE');
    },
    disableOnline({ commit }) {
      commit('DISABLE_ONLINE');
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
    }
  }

  

