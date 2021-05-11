<template>
  <div>
    <h3>Unauthorized</h3>
    <p>
      You are not allowed to access this page.
      <router-link to="/Login">Log in.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style>
</style>