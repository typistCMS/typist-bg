<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="msg" v-if="msg"> {{ msg }} </div>
      <form class="pure-form pure-form-stacked" @submit.prevent="login" method="POST">
        <input v-model="name" placeholder="Username / Email" autocomplete="email" required name email/>
        <input v-model="password" placeholder="Password" type="password" autocomplete="current-password" required/>
        <button class="pure-button">Login</button>
      </form>
    </div>
  </div>
</template>

<style>
  .login-wrapper {
    background-image: url("https://www.vitacost.com/blog/wp-content/uploads/2016/05/Why-You-Need-More-Lavender-in-Your-Life-e1462955823730.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 4;
    background-color: #FFF;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login {
    backdrop-filter: blur(5px);
    padding: 1em;
    width: 50%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  .msg {
    color: #FF0000;
  }
</style>

<script>
export default {
  data () {
    return {
      'name': null,
      'password': null,
      'msg': null
    }
  },
  methods: {
    login () {
      this.$http.post('user/token', {
        'name': this.name,
        'password': this.password
      }).then((response) => {
        localStorage.setItem('token', response.data.token)
        this.$router.push('/')
      }).catch((error) => {
        this.msg = error.response.data.msg
        this.password = null
      })
    }
  }
}
</script>
