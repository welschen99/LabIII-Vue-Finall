<template>
    <div class="container-sm col-xl-8" style="margin:auto">
          <h1 class="text-center">Iniciar sesión</h1>
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="User Name"
            v-model.trim="username"
            required
          >
          <button class="btn btn-primary" type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
      };
    },
    mounted() {
      this.$store.commit('setUser', '');
    },
    methods: {
      onSubmit() {
        this.$store.commit('setUser', this.username);
        this.$router.push({ name: 'Coins' });
      },
    },
  };
  /*
  export default {
    data() {
      return {
        name: '',
        age:0
      };
    },
    mounted() {//carga los datos almacenados cuando existen
      if (localStorage.name) {
        this.name = localStorage.name;
      }
      if (localStorage.age) {
        this.age = localStorage.age;
      }
    },
    methods: {
        persist() {
          localStorage.name = this.name;
          localStorage.age = this.age;
          console.log(`Nombre ${this.name} y edad ${this.age}`);
           this.$router.push({ name: 'Home' });
        }
    },
  };*/
  </script>