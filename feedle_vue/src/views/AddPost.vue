<template>
  <div>
    <b-card
      class="add_post_card"
      title="Add Post"
      sub-title="Please input data in the fields below"
    >
      <b-form @submit="onSubmit">
        <b-form-group>
          <label for="text-title">Title</label>
          <b-form-input
            v-model="title"
            id="text-title"
            placeholder="Enter title"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="text-content">Content</label>
          <b-form-input
            v-model="content"
            id="text-content"
            placeholder="Enter content"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="text-picture">Picture URL</label>
          <b-form-input
            v-model="postImageSrc"
            id="text-picture"
            placeholder="Enter picture URL"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["allPosts"]),
  name: "AddPost",
  data() {
    return {
      title: "",
      content: "",
      postImageSrc: "",
    };
  },
  methods: {
    ...mapActions(["addPost", "fetchPosts"]),
    async onSubmit(e) {
      e.preventDefault();
      const date = new Date();
      const newPost = {
        id: 0,
        userId: 1,
        title: this.title,
        content: this.content,
        authorUserName: "auf",
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        postReactions: [],
        comments: [],
        postImageSrc: this.postImageSrc,
      };
      await this.addPost(newPost);
      this.title = "";
      this.content = "";
      this.postImageSrc = "";
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.add_post_card {
  width: 50%;
}
</style>