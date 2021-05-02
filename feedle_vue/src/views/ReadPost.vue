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
        <Comment :comment="comment" />
      </div>
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
    };
  },
  computed: mapGetters(["postData"]),
  methods: {
    ...mapActions(["getPostData", "fetchPosts"]),
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
  },
  created() {
    this.fetchPosts();
    this.getPostData(this.$route.params.id);
    this.scopedPostData = this.postData;
    this.showComments = this.scopedPostData.comments.length > 0;
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
</style>