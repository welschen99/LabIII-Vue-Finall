<template>
  <div id="nav">
    <router-link to="/" v-if="!username">Login</router-link>
    <router-link to="/" v-if="username">Log out</router-link>
    <router-link to="/home" >Home</router-link>
    <router-link to="/movimientos" v-if="username">Movimientos</router-link> 
    <router-link to="/coins" v-if="username">Coins</router-link>
    <router-link to="/resumen" v-if="username">Resumen</router-link>
  </div>
  <router-view/>
<p v-if="username != ''">Benvenuti {{ username }}</p>

  
</template>

<script>
export default {
  computed:{
    username() {
      return this.$store.state.username;
    },
    movimientos(){//accede la bbdd de vuex(busca en el store)
            var x = this.$store.state.movimientos
            return x;//una computer propierty que busca de vuex la lista de technologies
    }
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
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
