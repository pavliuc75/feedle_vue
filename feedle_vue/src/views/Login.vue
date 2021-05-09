<template>
  <div>
    <b-card
      class="login_card"
      title="Log in"
      sub-title="Please input data into the fields below"
    >
      <b-form @submit="onSubmit">
        <b-form-group>
          <label>Username</label>
          <b-form-input
            v-model="username"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label>Password</label>
          <b-form-input
            type="password"
            v-model="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Log in</b-button>
        <label class="error_label">{{ errorLabel }}</label>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  computed: mapGetters(["userStatus"]),
  data() {
    return {
      username: "",
      password: "",
      errorLabel: "",
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async onSubmit(e) {
      e.preventDefault();
      const newUser = {
        username: this.username,
        password: this.password,
      };
      await this.loginUser(newUser);
      if (this.userStatus == false) {
        this.errorLabel = "Wrong username or password";
      } else {
        this.errorLabel = "";
        await this.$router.push({ path: "/" });
      }
    },
  },
};
</script>

<style scoped>
.login_card {
  width: 50%;
}
.error_label {
  margin-left: 2%;
  color: #ff0000;
  font-weight: bolder;
  font-style: italic;
}
</style>