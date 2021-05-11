import axios from "axios";

const state = {
  posts: [],
  postData: Object,
  userStatus: false,
  userData: undefined,
};
const getters = {
  allPosts: (state) => state.posts,
  postData: (state) => state.postData,
  userStatus: (state) => state.userStatus,
  userData: (state) => state.userData,
};
const actions = {
  async fetchPosts({ commit, dispatch }) {
    const response = await axios.get("http://localhost:5002/feedle/posts");
    commit("setPosts", response.data);
    dispatch("getUserStatus");
  },

  async getPostData({ commit }, id) {
    commit("setPostData", id);
  },

  async addPost({ commit }, newPost) {
    await axios.post("http://localhost:5002/feedle/posts", newPost);
    //await dispatch("loginUser", state.userData);
    commit("newPost");
  },

  async deletePost({ commit }, id) {
    await axios.delete(`http://localhost:5002/feedle/posts?id=${id}`);
    commit("removePost");
  },

  async updatePost({ commit }, updatedPost) {
    await axios.patch(`http://localhost:5002/feedle/posts`, updatedPost);
    commit("modifyPost");
  },

  async addComment({ commit }, newComment) {
    await axios.post(
      `http://localhost:5002/feedle/posts/comment?Id=${newComment.postId}`,
      newComment
    );
    commit("postComment");
  },

  async loginUser({ commit, dispatch }, newUser) {
    const response = await axios.get(
      `http://localhost:5002/feedle/user?username=${newUser.username}&password=${newUser.password}`
    );
    window.sessionStorage.setItem("currentUser", JSON.stringify(response.data));
    commit("authenticateUser");
    dispatch("getUserStatus");
  },

  async registerUser({ commit, dispatch }, newUser) {
    await axios.post("http://localhost:5002/feedle/user", newUser);
    commit("registerUser");
    await dispatch("loginUser", newUser);
  },

  async signOut({ dispatch }) {
    window.sessionStorage.setItem("currentUser", '""');
    dispatch("getUserStatus");
  },

  async getUserStatus({ commit }) {
    var status = undefined;
    if (
      sessionStorage.getItem("currentUser") === '""' ||
      sessionStorage.getItem("currentUser") == null
    ) {
      status = false;
    } else {
      status = true;
    }
    commit("setUserStatus", status);
  },

  async getUserData({ commit, dispatch }) {
    dispatch("getUserStatus");
    if (state.userStatus) {
      const userData = sessionStorage.getItem("currentUser");
      const userDataJSON = JSON.parse(userData);
      commit("setUserData", userDataJSON);
    }
  },

  async deleteComment({ commit }, commentData) {
    console.log(commentData);
    await axios.delete(
      `http://localhost:5002/feedle/posts/comment?commentId=${commentData.commentId}&postId=${commentData.postId}`
    );
    commit("deleteComment");
  },
};
const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setPostData: (state, id) =>
    (state.postData = state.posts.find((post) => post.id == id)),
  newPost: () => console.log("// ADDED"),
  removePost: () => console.log("// DELETED"),
  modifyPost: () => console.log("// UPDATED"),
  postComment: () => console.log("// COMMENTED"),
  authenticateUser: () => console.log("// AUTHENTICATION"),
  registerUser: () => console.log("//REGISTRATION"),
  deleteComment: () => console.log("//DELETE_COMMENT"),
  setUserStatus: (state, status) => (state.userStatus = status),
  setUserData: (state, data) => (state.userData = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

//TODO: delete comments
//TODO: hash passwords
