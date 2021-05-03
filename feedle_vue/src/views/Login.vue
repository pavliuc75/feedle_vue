<template>
  <div>
    <b-card
      class="login_card"
      title="Login"
      sub-title="Please input data in the fields below"
    >
      <b-form @submit="onSubmit">
        <b-form-group>
          <label for="text-user">Username</label>
          <b-form-input
            id="text-user"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="text-password">Password</label>
          <b-form-input
            type="password"
            id="text-password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log("here");
    },
  },
};
</script>

<style scoped>
.login_card {
  width: 50%;
}
</style>