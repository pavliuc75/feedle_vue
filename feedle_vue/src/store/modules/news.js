import axios from "axios";

const state = {
  posts: [],
  postData: Object,
  userStatus: undefined,
};
const getters = {
  allPosts: (state) => state.posts,
  postData: (state) => state.postData,
  userStatus: (state) => state.userStatus,
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
    console.log(newPost);
    await axios.post("http://localhost:5002/feedle/posts", newPost);
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
    //TODO: hash passwords
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
    if (sessionStorage.getItem("currentUser") === '""') {
      status = false;
    } else {
      status = true;
    }
    commit("setUserStatus", status);
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
  setUserStatus: (state, status) => (state.userStatus = status),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
