
<template>
	<div>
        <div class="card border-primary mb-12 shadow-lg" style="max-width: 80%;margin:auto">
        <div class="card-header"><h1 v-show="accion && id">{{accion}} {{id}} </h1></div>
         <div class="card-body">
        <!-- <div v-if="MaxCriptoAmount==0 && accion =='vender'">Usted no posee {{coins[0]?.name}} para vender</div> -->
        <!--<div>
            <div v-if="accion == 'comprar'">
                <h5>Precio de Compra ${{getPrice(totalAsk)}}</h5>
            </div>
            <div v-else>
                <h5>Precio Actual de Venta :  ${{getPrice(totalBid)}}<br></h5>
                <h5><span style="background:#e70000;color:white">La Cantidad Maxima de venta es de : <strong style="background:yellow;color:black">{{ MaxCriptoAmount}} {{coins[0]?.name}}</strong></span></h5>
            </div> -->
            <form class="col-xl-9" style="margin:auto;text-align:left" @submit.prevent="submitForm">
                <div class="form-group">
                    <label>Cantidad</label>
                    <input   v-model.number="criptoAmount" @input="adjustMoneyAmount" ref="criptoAmount" type="number" class="form-control" min="0" step="0.0000000001">
                    <!--:max='MaxCriptoAmount'--> 
        
                </div>
                <div class="form-group">
                    <label >Precio</label>
                    <input  v-model="moneyAmount"  @input="adjustCriptoAmount"  class="form-control" ref="moneyAmount" >
                </div>
                <br> 
            <div v-if="accion == 'vender'">
                <button type="button" class="btn btn-success" @click="submitForm()"  :disabled="criptoAmount<=0 || moneyAmount<=0">{{accion}}</button>
            </div>
            <div v-else>
                <button type="button" class="btn btn-success" @click="submitForm()"   :disabled="criptoAmount<=0 || moneyAmount<=0">{{accion}}</button>
            </div>
            </form>
        </div>
    </div>   
     </div>  
    <!--</div> -->
</template>

<script>
import Movimiento from '../services/APIlab.js';
export default {
	name: "newMovimiento",
    props:{
        id:{
            require:true,
        },
        accion:{
            require:true,
        }
    },
    // beforeCreate() {//antes de que cargue todo, llama la lista de vuex
    //     this.$store.commit("setUser")
    // },
	data() {
        return { 
            criptoAmount:0,
            moneyAmount: 0, 
            totalAsk:0,
            totalBid:0,
            accion:this.accion, 
            array:{
                user_id: '',
                action: '',
                crypto_code: this.id,
                crypto_amount:'',
                money: '',
                datetime: '',
            },
            };            
	},
    computed:{
        // movimientos(){//accede la bbdd de vuex(busca en el store)
        //     var loader = this.$loading.show({container: false,canCancel: true});
        //     var x = this.$store.state.movimientos
        //     console.log('llego mov')
        //     loader.hide()
        //     return x;//una computer propierty que busca de vuex la lista de technologies
        // },
        coins(){//accede la bbdd de vuex(busca en el store)
            var loader = this.$loading.show({container: false,canCancel: true});
            var coins = this.$store.state.coins.filter((tech) => tech.coin == this.id)
            loader.hide()
            return coins
        },
        // username() {
        //     debugger
        //     var loader = this.$loading.show({container: false,canCancel: true});
        //     var user = this.$store.state.username;
        //     this.array.user_id = user
        //     console.log(user)
        //     console.log(this.array.user_id)
        //     loader.hide()
        //     return user
        // },
        // MaxCriptoAmount(){
        //     try{
        //         debugger
        //     let loader = this.$loading.show({container: false,canCancel: true});
        //     if(this.accion=='vender'){
        //             let coin = this.coins[0].coin
        //             let x = this.$store.getters.getResumen.movimiento
        //             if(x.length==0){
        //                 var buscar =0
        //                 loader.hide()
        //                 return buscar
        //             }else{
        //                 try{                    
        //                     var buscar = x.find(b=>b.crypto_code==coin && b.accion=='purchase' && parseFloat(b.crypto_amount)>0)
        //                     loader.hide()
        //                     return buscar.crypto_amount
        //                 }
        //                 catch{
        //                     var buscar =0
        //                     loader.hide()
        //                     return buscar
        //                 }
        //             }
        //     }else{
        //         let buscar = Number.MAX_VALUE
        //         loader.hide()
        //         return buscar
        //     }
        // } catch (error) {
        //     console.error(error);
        //     }
        // },
        
        
    },
    methods:{
        getPrice(number){
            var ars = number.toLocaleString(
                'de-DE', { style: 'currency',currency: 'ARS' })
            return ars
        },
        adjustMoneyAmount() {
            this.totalAsk=this.coins[0].data.totalAsk
            this.totalBid=this.coins[0].data.totalBid
            var loader = this.$loading.show({container: false,canCancel: true});
            if(this.criptoAmount>0){
                if (this.accion == "comprar") {
                     this.moneyAmount = (
                        parseFloat(this.totalAsk) * parseFloat(this.criptoAmount)
                    ).toFixed(2);
                } else {
                     this.moneyAmount = (
                        parseFloat(this.totalBid) * parseFloat(this.criptoAmount)
                    ).toFixed(2);
                }
            }
            loader.hide()
		},
	     adjustCriptoAmount() {
            this.totalAsk=this.coins[0].data.totalAsk
            this.totalBid=this.coins[0].data.totalBid
            if(this.moneyAmount>0 ){
                if (this.accion == "comprar") {
                    this.criptoAmount = (
                        parseFloat(this.moneyAmount) / parseFloat(this.totalAsk)
                    ).toFixed(4);
                } else {
                    this.criptoAmount = (
                        parseFloat(this.moneyAmount) / parseFloat(this.totalBid)
                    ).toFixed(4);
                }
            }

		},
        getPrice(number){
            var ars = number.toLocaleString(
                'de-DE', { style: 'currency',currency: 'ARS' })
            return ars
        },
        submitForm(event){
            debugger
            let loader = this.$loading.show({container: false,canCancel: true});
            this.array.user_id=this.$store.state.username
            this.array.crypto_amount=this.criptoAmount.toString()
            this.array.money=this.moneyAmount.toString()
            this.array.datetime = new Date().toLocaleString('en-US', {timeZone: 'America/Buenos_Aires',})
            this.accion == "comprar" ? this.array.action="purchase" : this.array.action="sale",
            console.log(this.array)
            Movimiento.postOperation(
                this.array)
            .then(response => {
                alert('Accion realizada con exito')
                console.log(response.data)
                loader.hide()
                
            }
            )
            .catch((error)=> console.error(error)
            );event.target.reset();
        },
    }
}
</script>