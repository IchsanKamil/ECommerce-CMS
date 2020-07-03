<template>
  <div class="overflow-hidden row justify-content-center mt-5 text-center">
    <div class="col-4">
      <form class="form-signin" @submit.prevent="login">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Username</label>
        <input
          type="email"
          v-model="email"
          id="inputEmail"
          class="form-control"
          placeholder="Username"
          required
          autofocus
        />
        <label for="password" class="sr-only">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="form-control"
          placeholder="Password"
          required
        />
        <!-- <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> -->
        <div class="form-group form-check mt-3">
          <input id="show" type="checkbox" class="form-check-input" @click="showPassword()" />
          <label class="form-check-label text-center" for="show">Show Password</label>
        </div>
        <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios({
        method: 'post',
        url: `${this.baseUrl}/login`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((respon) => {
          console.log(respon, '<<< respon');
          const { id, email, token } = respon.data;
          localStorage.setItem('token', token);
          localStorage.setItem('currentUserEmail', email);
          localStorage.setItem('currentUserId', id);
          this.$router.push({ name: 'MainPage' });
        })
        .catch((err) => {
          console.log(err, '<<< err login');
        });
    },
    showPassword() {
      const pass = document.getElementById('password');
      if (pass.type === 'password') {
        pass.type = 'text';
      } else {
        pass.type = 'password';
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

body {
  /* display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center; */
  /* align-items: center; */
  /* padding-top: 40px;
  padding-bottom: 40px; */
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
