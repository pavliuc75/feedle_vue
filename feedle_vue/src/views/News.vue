<template>
  <div>
    <router-link to="/AddPost" v-show="userStatus"
      ><b-button variant="primary">Add Post</b-button></router-link
    >
    <router-link to="/Login" v-show="!userStatus"
      ><b-button variant="outline-primary">Add Post</b-button></router-link
    >
    <div v-for="post in allPosts" :key="post.id">
      <Post
        :title="post.title"
        :content="post.content"
        :authorUserName="post.authorUserName"
        :postImageSrc="post.postImageSrc"
        :postId="post.id"
      />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "News",
  computed: mapGetters(["allPosts", "userStatus"]),
  components: {
    Post,
  },
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  async created() {
    await this.fetchPosts();
  },
};
</script>
