<template>
  <div>
    <b-card
      v-show="!isCommentAuthor"
      :header="commentData.authorUserName"
      class="comment"
      :sub-title="getDate()"
    >
      <b-card-text> {{ commentData.content }}</b-card-text>
    </b-card>
    <b-card
      v-show="isCommentAuthor"
      :header="commentData.authorUserName"
      class="comment"
      :sub-title="getDate()"
    >
      <b-card-text> {{ commentData.content }}</b-card-text>
      <b-link @click="removeComment" class="card-link">Remove</b-link>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Comment",
  props: {
    commentData: Object,
    userData: undefined,
  },
  data() {
    return {
      isCommentAuthor: false,
    };
  },
  methods: {
    ...mapActions(["deleteComment"]),
    getDate() {
      return (
        this.commentData.hour +
        ":" +
        this.commentData.minute +
        " " +
        this.commentData.day +
        "." +
        this.commentData.month +
        "." +
        this.commentData.year
      );
    },
    async removeComment() {
      if (confirm("Are you sure you want to delete this comment?")) {
        const deleteCommentRequestData = {
          commentId: this.commentData.id,
          postId: this.commentData.postId,
        };
        await this.deleteComment(deleteCommentRequestData);
        window.location.reload();
      }
    },
  },
  created() {
    if (this.userData != undefined) {
      if (this.userData.id == this.commentData.userId) {
        this.isCommentAuthor = true;
      }
    }
  },
};
</script>

<style>
.comment {
  margin-top: 1%;
}
</style>