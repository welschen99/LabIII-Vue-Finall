<template>
    <h1>Resumen de Portafolio</h1>
    <div>
     <table border="1" style="margin:auto" class="table table-hover">
            <thead>
                <tr class="table-info">
                    <th scope="col">Criptomoneda</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Valor Actualizado</th>
                    <th scope="col">Rentabilidad al vender </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(movimiento, index) in Mostrar.movimiento" :key="movimiento.crypto_code">
                        <td>{{movimiento.crypto_code}}</td>
                        <td>{{movimiento.crypto_amount}}</td>
                        <td>{{getPrice(movimiento.money)}}</td>
                        <td>{{getPrice(Mostrar.totalActual[index].precio)}}</td>
                        <td>{{getPrice(Mostrar.totalActual[index].rentabilidad)}}</td>
                        
                </tr>
            </tbody>
            <tfoot style="background:#170561;color:white">
                <tr>
                <td>TOTALES</td>
                <td></td>
                <td>{{getPrice(Mostrar.total)}}</td>
                <td>{{getPrice(Mostrar.totalValorActual)}}</td>
                <td>{{ getPrice(Mostrar.totalRentabilidad )}}</td>
                </tr>
            </tfoot>
            </table>
        </div>
    <div class="row" style="margin-left:20%" v-if="optionsDonut">
    <div class="col-md-5" style="margin:1%">
      <apexchart  height="260" type="donut" :options="optionsDonut()" :series="seriesDonut()"></apexchart>
    </div>
    <div class="col-md-5" style="margin:1%">
      <apexchart height="260" type="donut"  :options="optionsDonut2()" :series="seriesDonut2()"></apexchart>
    </div> 
</div>

</template>
<script>
export default {
    name: "resumen",
    data(){
        return{
            loading:true
        }
    },
    beforeCreate() {//antes de que cargue todo, llama la lista de vuex
        this.$store.commit("pullMovimientos")
    },
    computed:{
        movimientos(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            var x = this.$store.state.movimientos
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        },
        coins(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            var x = this.$store.state.coins
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        },
        Mostrar(){
            let loader = this.$loading.show({container: false,canCancel: true});
            var resumen = this.$store.getters.getResumen
            loader.hide()
            return{
                movimiento:resumen.movimiento,
                totalActual:resumen.totalActual,
                total:resumen.total,
                totalValorActual:resumen.totalValorActual,
                totalRentabilidad:resumen.totalRentabilidad

            } 
        }
        

    },
    methods:{
        getPrice(number){
            number = parseFloat(number)
            var ars = number.toLocaleString(
                'de-DE', { style: 'currency',currency: 'ARS' })
            return ars
        },
        optionsDonut(){
            var arr2 = new Array();
            var myArray = this.$store.getters.getResumen.movimiento
            myArray.forEach(function (value, i) {
                arr2.push(value.crypto_code)
            });
            var options = {
                labels: arr2,
                height: 'auto',
            title: {
              text: 'Cantidad de Cryptomonedas',
              align: 'left',
            },    
            }
            return options

        },
        optionsDonut2(){
            var arr2 = new Array();
            var myArray = this.$store.getters.getResumen.movimiento
            myArray.forEach(function (value, i) {
                arr2.push(value.crypto_code)
            });
            var options = {
                labels: arr2,
            title: {
              text: 'Monto Total Actualizado',
              align: 'left',
            },
        }
            return options

        },
        seriesDonut(){
            var arr = new Array();
            var myArray = this.$store.getters.getResumen.movimiento
            myArray.forEach(function (value, i) {
                arr.push(parseFloat(value.crypto_amount))
            });
            return arr
        },
        seriesDonut2(){
            var arr3 = new Array();
            var myArray = this.$store.getters.getResumen.totalActual
            console.log(this.$store.getters.getResumen.totalActual)
            myArray.forEach(function (value, i) {
                arr3.push(parseFloat(value.precio))
            });
            console.log(arr3)
            return arr3
        }
    }
}
  </script>