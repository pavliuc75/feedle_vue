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
    const response = await axios.post(
      "http://localhost:5002/feedle/posts",
      newPost
    );

    commit("newPost", response.data);
  },

  async deletePost({ commit }, id) {
    await axios.delete(`http://localhost:5002/feedle/posts?id=${id}`);
    commit("removePost", id);
  },
};
const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setPostData: (state, id) =>
    (state.postData = state.posts.find((post) => post.id == id)),
  newPost: (state, post) => state.posts.push(post),
  removePost: (state, id) =>
    (state.posts = state.posts.filter((post) => post.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
