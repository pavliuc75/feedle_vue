<template>
  <div id="app">
    <b-navbar variant="light">
      <div class="container">
        <b-navbar-brand>
          <router-link to="/">
            <img
              class="navbar_brand"
              src="../resources/feedle_logo.png"
              alt="Kitten"
            />
          </router-link>
        </b-navbar-brand>
        <b-navbar-nav v-show="userStatus">
          <b-nav-item-dropdown text="User">
            <b-dropdown-item @click="onSignOut">Sign out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click="onAbout"> README </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-show="!userStatus">
          <b-nav-item-dropdown text="User">
            <b-dropdown-item @click="onLogin">Log in</b-dropdown-item>
            <b-dropdown-item @click="onSignUp">Sign up</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click="onAbout"> README </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
    <div class="container container_margin">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  computed: mapGetters(["userStatus"]),
  methods: {
    ...mapActions(["signOut"]),
    async onAbout() {
      await this.$router.push({ path: "/About" });
    },
    async onLogin() {
      await this.$router.push({ path: "/Login" });
    },
    async onSignUp() {
      await this.$router.push({ path: "/Signup" });
    },
    async onSignOut() {
      if (confirm("Do you really want to sign out?")) {
        await this.signOut();
        window.location.reload();
      }
    },
  },
};
</script>

<style>
.navbar_brand {
  height: 39px;
}

.container_margin {
  margin: 1%;
}
</style>
