<template>
  <div>
    <b-card
      :header="comment.authorUserName"
      class="comment"
      :sub-title="getDate()"
    >
      <b-card-text> {{ comment.content }}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object,
  },
  methods: {
    getDate() {
      return (
        this.comment.hour +
        ":" +
        this.comment.minute +
        " " +
        this.comment.day +
        "." +
        this.comment.month +
        "." +
        this.comment.year
      );
    },
  },
};
</script>

<style>
.comment {
  margin-top: 1%;
}
</style>