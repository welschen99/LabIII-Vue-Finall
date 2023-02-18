<template style="background-color:black">
    <!-- <div class="container-sm col-xl-8" style="margin:auto">
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
    </div> -->
    <section class="vh-100">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img src="../assets/fondoLogin.jpg" 
          alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
      </div>
      <div class="col-sm-6 text-white bg-dark">

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form style="width: 23rem;" @submit.prevent="onSubmit">

            <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Iniciar sesión en su cuenta</h3>

            <div class="form-outline mb-4">
                  <input
                type="text"
                class="form-control"
                placeholder="User Name"
                v-model.trim="username"
                required
              >
            </div>

            <div class="pt-1 mb-4">
              <button class="btn btn-info btn-lg btn-block" type="submit">Iniciar sesión</button>
            </div>

            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Primera vez en loguearse? ingrese un nombre de usuario para identificarse</a></p>

          </form>

        </div>

      </div>
    </div>
  </div>
</section>
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
        this.$router.push({ name: 'Home' });
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