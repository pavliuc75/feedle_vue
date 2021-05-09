<template>
  <div>
    <b-card
      class="sign_up_card"
      title="Sign up"
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
        <b-form-group>
          <label>Repeat password</label>
          <b-form-input
            type="password"
            v-model="repeatPassword"
            placeholder="Enter password once again"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Sign up</b-button>
        <label class="error_label">{{ errorLabel }}</label>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SignUp",
  computed: mapGetters(["userStatus"]),
  data() {
    return {
      username: "",
      password: "",
      repeatPassword: "",
      errorLabel: "",
    };
  },
  methods: {
    ...mapActions(["loginUser", "registerUser"]),
    async onSubmit(e) {
      e.preventDefault();
      if (this.password === this.repeatPassword) {
        const newUser = {
          username: this.username,
          password: this.password,
          securityLevel: 1,
        };
        await this.registerUser(newUser);
        if (this.userStatus == false) {
          this.errorLabel = "Something went wrong";
        } else {
          this.errorLabel = "";
          await this.$router.push({ path: "/" });
        }
      } else {
        this.errorLabel = "Passwords do not match";
      }
    },
  },
};
</script>

<style scoped>
.sign_up_card {
  width: 50%;
}

.error_label {
  margin-left: 2%;
  color: #ff0000;
  font-weight: bolder;
  font-style: italic;
}
</style>