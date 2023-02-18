<template>
    <div>
        <h1>Coins</h1>
        <div v-if="coins !=null">
            <table border="1" style="margin:auto" class="table table-hover table-striped ">
             <thead>
                <tr class="table-info">
                    <th>Cripto</th>
                    <th>Nombre</th>
                    <th>Precio Compra c/comisón</th>
                    <th>Precio Venta c/comisón</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(coin,index) in coins" :key="index">
                        <td><img :src="coin.image" style="width:40%" /></td>
                        <td>{{coin.name}}</td>
                        <td>{{getPrice(coin.data.totalAsk)}}</td>
                        <td>{{getPrice(coin.data.totalBid)}}</td>
                        <td><router-link :to="{name:'newMovimiento',params:{id:coin.coin, accion:'comprar'}}"><button type="button" class="btn btn-success">Comprar</button></router-link> |
                        <router-link :to="{name:'newMovimiento',params:{id:coin.coin, accion:'vender'}}"><button type="button" class="btn btn-danger">Vender</button></router-link></td>
                </tr>
            </tbody>
            </table>
        </div>
        <div v-else><p>Cargando</p></div>
        
    </div>
</template>

<script>
export default {
	name: "Coins",
    data() {
		return {
		};
	},
    computed:{
        coins(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            do{
                var x = this.$store.state.coins
                console.log(x)
            }while(x.length==0)
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        },
        movimientos(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            var x = this.$store.state.movimientos
            console.log(x)
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        },
        username() {
            let loader = this.$loading.show({container: false,canCancel: true});
            var user = this.$store.state.username;
            this.array.user_id = user
            loader.hide()
             return user
        },
        

        
    },
    methods:{
        getPrice(number){
            var ars = number.toLocaleString(
                'de-DE', { style: 'currency',currency: 'ARS' })
            return ars
        },

  }
}

    

</script>