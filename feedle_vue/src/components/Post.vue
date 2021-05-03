<template>
  <div class="post_card">
    <b-card
      footer-bg-variant="white"
      :header="title"
      :footer="authorUserName"
      class="b_card_margin"
    >
      <b-row>
        <b-col md="4"
          ><b-card-img
            :src="postImageSrc"
            alt="Image"
            class="b_card_img"
          ></b-card-img
        ></b-col>
        <b-col md="8"
          ><b-card-text>{{ content }}</b-card-text>
          <router-link :to="{ name: 'ReadPost', params: { id: postId } }">
            <b-button size="sm" variant="outline-secondary"
              >To comments</b-button
            >
          </router-link>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    title: String,
    content: String,
    authorUserName: String,
    postImageSrc: String,
    postId: Number,
  },
};
</script>

<style scoped>
.b_card_margin {
  margin-top: 2%;
}
.b_card_img {
  width: 100%;
}
.post_card {
  width: 70%;
}
</style>