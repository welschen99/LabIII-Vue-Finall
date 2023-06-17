<template>
  <nav class="navbar flex-column navbar-expand-lg text-white" style="background-color: #1d43fb33">
  <div class="container-fluid">
    <a class="navbar-brand" href="/home"  style="color:#050a6b" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <img src="./assets/logo.svg" alt="Vue Logo"  >
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" style="color:black"></span>
    </button>
    <br>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link active" aria-current="page"><router-link style="color: #050a6b"   to="/home">Home</router-link></a>
      </li>
        <li class="nav-item">
        <a class="nav-link active" aria-current="page"  v-if="username" v-on:click="resumen=1"><router-link style="color: #050a6b"  to="/movimientos">Movimientos</router-link></a> 
      </li>
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" v-if="username" v-on:click="resumen=1"><router-link style="color: #050a6b"  to="/resumen">Resumen</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" v-if="username && resumen==1"><router-link style="color: #050a6b;"  to="/coins">Coins</router-link></a>
      </li>
    </ul>
      <a class="nav-link active justify-content-end" aria-current="page" style="color: #050a6b;" v-if="username != ''">Bienvenido  <strong>{{ username }} </strong> </a>
      <a class="nav-link active justify-content-end" aria-current="page" style="color: #050a6b;" href="/" v-if="username"><button type="button" class="btn btn-danger">Log out</button></a>
      <a class="nav-link active" aria-current="page" style="color: #050a6b;" href="/" v-if="!username"><button type="button" class="btn btn-success">Login</button></a>
    </div>
    </div>
</nav>
  <router-view/>

  
</template>

<script>
export default {
  data(){
        return{
            resumen:0
        }
    },
  computed:{
    username() {
      return this.$store.state.username;
    },
  },
  beforeCreate() {//antes de que cargue todo, llama la lista de vuex
        this.$store.commit("pullCripto")
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b4763;
}

</style>
