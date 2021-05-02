"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  posts: [],
  postData: Object
};
var getters = {
  allPosts: function allPosts(state) {
    return state.posts;
  },
  postData: function postData(state) {
    return state.postData;
  }
};
var actions = {
  fetchPosts: function fetchPosts(_ref) {
    var commit, response;
    return regeneratorRuntime.async(function fetchPosts$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:5002/feedle/posts"));

          case 3:
            response = _context.sent;
            commit("setPosts", response.data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getPostData: function getPostData(_ref2, id) {
    var commit;
    return regeneratorRuntime.async(function getPostData$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            commit("setPostData", id);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
var mutations = {
  setPosts: function setPosts(state, posts) {
    return state.posts = posts;
  },
  setPostData: function setPostData(state, id) {
    return state.postData = state.posts.find(function (post) {
      return post.id == id;
    });
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;