<template>
  <div>
    <b-card
      class="sign_up_card"
      title="Sign up"
      sub-title="Please input data into the fields below"
    >
      <b-form @submit="onSubmit">
        <b-form-group>
          <label for="text-user">Username</label>
          <b-form-input
            id="text-username-signup"
            v-model="username"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="text-password">Password</label>
          <b-form-input
            type="password"
            id="text-password-signup"
            v-model="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="text-password">Repeat password</label>
          <b-form-input
            type="password"
            id="text-password-repeat-signup"
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
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      repeatPassword: "",
      errorLabel: "",
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      if (this.password === this.repeatPassword) {
        console.log("all good");
        this.errorLabel = "";
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