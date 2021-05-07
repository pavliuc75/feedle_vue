<template>
  <div>
    In development. No login yet. All the actions are made with the predifined
    user.
    <input type="text" />
    <button @click="persist">save to session storage</button>
    <h4>{{ sessionStorageValue }}</h4>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      sessionStorageValue: "test",
    };
  },
  mounted() {
    if (this.$session.exists("test")) {
      this.sessionStorageValue = this.$session.get("test");
    }
  },
  methods: {
    persist() {
      this.$session.set("test", "persisted");
      console.log("done");
    },
  },
};
</script>
