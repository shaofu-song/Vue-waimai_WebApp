const state = {
  emailLoginStatus: window.localStorage.getItem('emailLoginStatus') || false,
  emailUserName: window.localStorage.getItem('emailUserName') || '',
  emailIsAdmin : window.localStorage.getItem('emailIsAdmin') || false,
  emailUserHead : ''
};

const actions = {

};

const mutations = {
  EMAIL_USER(state , {emailUser}){
    state.emailLoginStatus = emailUser.emailLoginStatus
    state.emailUserName = emailUser.emailUserName
    state.emailIsAdmin = emailUser.emailIsAdmin;
    state.emailUserHead = emailUser.emailUserHead;
  },
};

export default {
  namespaced : true,
  state,
  actions,
  mutations
}

