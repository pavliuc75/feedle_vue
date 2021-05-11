<template>
  <div>
    <b-card
      class="edit_post_card"
      title="Edit Post"
      sub-title="Please input new values into the fields below"
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
          <b-form-textarea
            v-model="content"
            id="text-content"
            placeholder="Enter content"
            rows="4"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group>
          <label for="text-picture">Picture URL</label>
          <b-form-input
            v-model="postImageSrc"
            id="text-picture"
            placeholder="Enter picture URL"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Apply changes</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditPost",
  data() {
    return {
      title: "",
      content: "",
      postImageSrc: "",
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const date = new Date();
      const updatedPost = {
        id: this.postData.id,
        userId: 1,
        title: this.title,
        content: this.content,
        authorUserName: this.postData.authorUserName,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        postReactions: this.postData.postReactions,
        comments: this.postData.comments,
        postImageSrc: this.postImageSrc,
      };
      await this.updatePost(updatedPost);
      this.$router.push({
        name: "ReadPost",
        params: { id: this.$route.params.id },
      });
    },
    ...mapActions(["getPostData", "fetchPosts", "updatePost"]),
  },
  computed: mapGetters(["postData"]),
  async created() {
    await this.fetchPosts();
    await this.getPostData(this.$route.params.id);
    this.title = this.postData.title;
    this.content = this.postData.content;
    this.postImageSrc = this.postData.postImageSrc;
  },
};
</script>

<style scoped>
.edit_post_card {
  width: 50%;
}
</style>