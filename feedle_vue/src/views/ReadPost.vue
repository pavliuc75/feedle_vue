<template>
  <div>
    <b-card
      :header="scopedPostData.title"
      :sub-title="getDate()"
      :footer="scopedPostData.authorUserName"
      footer-bg-variant="white"
    >
      <b-row>
        <b-col md="4">
          <b-card-img
            :src="scopedPostData.postImageSrc"
            alt="Image"
            class="b_card_img"
          >
          </b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-text>
            {{ postData.content }}
          </b-card-text>
          <div v-show="isPostOwner">
            <b-button variant="danger" @click="removePost()"
              >Delete Post</b-button
            >
            <router-link
              :to="{ name: 'EditPost', params: { id: this.$route.params.id } }"
            >
              <b-button class="btn" variant="warning">Edit Post</b-button>
            </router-link>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-card v-show="!showComments" class="comment_section">
      <b-card-text>There are no comments</b-card-text>
    </b-card>
    <b-card
      class="comment_section"
      bg-variant="light"
      header="Comments"
      v-show="showComments"
    >
      <div v-for="comment in scopedPostData.comments" :key="comment.id">
        <Comment :commentData="comment" :userData="userData" />
      </div>
    </b-card>
    <b-card class="comment_section">
      <b-form @submit="onSubmit">
        <b-row>
          <b-col md="10"
            ><b-form-input
              v-model="newComment"
              id="text-comment"
              placeholder="Enter your comment here"
              required
            ></b-form-input
          ></b-col>
          <b-col md="2"
            ><b-button
              v-show="userStatus"
              type="submit"
              variant="primary"
              style="width: 100%"
              >Post</b-button
            >
            <router-link to="/Login" v-show="!userStatus">
              <b-button variant="outline-primary" style="width: 100%"
                >Post</b-button
              ></router-link
            >
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Comment from "../components/Comment";
export default {
  name: "ReadPost",
  components: {
    Comment,
  },
  data() {
    return {
      scopedPostData: Object,
      showComments: false,
      newComment: "",
      isPostOwner: false,
    };
  },
  computed: mapGetters(["postData", "userData", "userStatus"]),
  methods: {
    ...mapActions([
      "getPostData",
      "fetchPosts",
      "deletePost",
      "addComment",
      "getUserData",
    ]),
    getDate() {
      return (
        this.scopedPostData.hour +
        ":" +
        this.scopedPostData.minute +
        " " +
        this.scopedPostData.day +
        "." +
        this.scopedPostData.month +
        "." +
        this.scopedPostData.year
      );
    },
    async removePost() {
      if (confirm("Are you sure you want to delete the post?")) {
        await this.deletePost(this.$route.params.id);
        await this.$router.push({ path: "/" });
      }
    },
    async onSubmit(e) {
      e.preventDefault();
      const date = new Date();
      const comment = {
        content: this.newComment,
        userId: this.userData.id,
        authorUserName: this.userData.username,
        second: date.getSeconds(),
        minute: date.getMinutes(),
        hour: date.getHours(),
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        postId: this.scopedPostData.id,
      };
      await this.addComment(comment);
      window.location.reload();
    },
  },
  async created() {
    await this.fetchPosts();
    await this.getPostData(this.$route.params.id);
    this.scopedPostData = this.postData;
    this.showComments = this.scopedPostData.comments.length > 0;
    await this.getUserData();

    //post management buttons v-show
    var isPostOwner = false;
    if (this.userData != undefined) {
      if (this.userData.username == this.scopedPostData.authorUserName) {
        isPostOwner = true;
      }
    }
    this.isPostOwner = isPostOwner;
  },
};
</script>

<style scoped>
.b_card_img {
  width: 100%;
}
.comment_section {
  margin-top: 1%;
}

.btn {
  margin-left: 1%;
}
</style>