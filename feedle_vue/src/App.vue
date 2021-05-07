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
        <b-nav-text>
          <router-link to="/Login">Login</router-link>
        </b-nav-text>
        <b-nav-text>
          <router-link to="/SignUp">SignUp</router-link>
        </b-nav-text>
        <b-nav-text>
          <router-link to="/About">README</router-link>
        </b-nav-text>
      </div>
    </b-navbar>
    <div class="container container_margin">
      <router-view />
    </div>
  </div>
</template>

<style>
.navbar_brand {
  height: 39px;
}

.container_margin {
  margin: 1%;
}
</style>
