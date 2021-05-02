<template>
  <div>
    <b-card :header="comment.authorUserName" class="comment">
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
};
</script>

<style>
.comment {
  margin-top: 1%;
}
</style>