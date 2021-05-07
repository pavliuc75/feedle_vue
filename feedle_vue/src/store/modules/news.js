import axios from "axios";

const state = {
  posts: [],
  postData: Object,
};
const getters = {
  allPosts: (state) => state.posts,
  postData: (state) => state.postData,
};
const actions = {
  async fetchPosts({ commit }) {
    const response = await axios.get("http://localhost:5002/feedle/posts");
    commit("setPosts", response.data);
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

  async loginUser({ commit }, newUser) {
    const response = await axios.get(
      `http://localhost:5002/feedle/user?username=${newUser.username}&password=${newUser.password}`
    );
    window.sessionStorage.setItem("currentUser", JSON.stringify(response.data));
    commit("authenticateUser", response.data);
    //TODO: hash passwords
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
