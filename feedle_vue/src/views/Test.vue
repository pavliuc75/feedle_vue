<template>
  <div><TestComponent :title="postData" /></div>
</template>

<script>
import TestComponent from "../components/TestComponent";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Test",
  data() {
    return {
      postData: undefined,
    };
  },
  computed: mapGetters(["allPosts"]),
  components: {
    TestComponent,
  },
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  async created() {
    await this.fetchPosts();
    this.postData = this.allPosts[1].title;
  },
};
</script>

<style>
</style>