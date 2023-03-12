<template>
    <div>
        <h1>Movimientos</h1>
        <div v-if="movimientos.length==0">Buscando..</div>
        <div>
           <table name="tabla1" border="1" style="margin:auto" class="table table-hover  table-striped">
            <thead>
                <tr class="table-info">
                    <th>Usuario</th>
                    <th>Accion</th>
                    <th>Cripto</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Fecha</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="movimiento in movimientos" :key="movimiento._id">
                        <td>{{movimiento.user_id}}</td>
                        <td>{{movimiento.action === "purchase" ? "compra" : "venta" }}</td>
                        <td>{{movimiento.crypto_code}}</td>
                        <td>{{movimiento.crypto_amount}}</td>
                        <td>{{getPrice(movimiento.money)}}</td>
                        <td>{{movimiento.datetime.slice(0, 10)}} - {{movimiento.datetime.slice(11, 16)}}</td>
                        <td><router-link :to="{name:'editMovimiento',params:{id:movimiento._id}}"><button type="button" class="btn btn-warning">Editar</button></router-link> | 
                        <button type="button" class="btn btn-danger" @click="deleteMovimientos(movimiento._id)">Eliminar</button></td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Movimiento from '../services/APIlab.js';
//var obtenerDato = document.getElementsByTagName("td");
//console.log(obtenerDato.length)
export default {
	name: "Movimientos",
    beforeCreate() {//antes de que cargue todo, llama la lista de vuex
        this.$store.commit("pullMovimientos")
    },
    computed:{
        movimientos(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            var x = this.$store.state.movimientos
            console.log(x)
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        }
    },
    methods:{
        getPrice(moneda){
            moneda = '$ '+ moneda +'  '+ '  ARS'
            return moneda.replace('.',',')
        },
        deleteMovimientos(id){
            let loader = this.$loading.show({container: false,canCancel: true});
            console.log(id);
            Movimiento.deleteOperation(id)
            .then(response => {
                console.log(response.data)
                this.$swal( 'Eliminado',
                            'Movimiento '+id+ ' Eliminado con Exito',
                             'success');
                loader.hide()
            })
            .catch((error)=> console.error(error));
        },
    }
}

    

</script>