<template>
	<div>
		<!-- <button type="buttom" class="btn btn-primary" @click="this.$router.replace({ path: '/coins' })">Volver al menu anterior</button><br> -->
        <div class="card border-primary mb-12 shadow-lg" style="max-width: 80%;margin:auto">
        <div class="card-header"><h1>{{accion}} - {{coins[0].name}}</h1></div>
        <div class="card-body">
        <div v-if="MaxCriptoAmount==0 && accion =='vender'">Usted no posee {{coins[0].name}} para vender</div>
        <div v-else>
            <div v-if="accion == 'comprar'">
                <h5>Precio de Compra ${{getPrice(this.coins[0].data.totalAsk)}}</h5>
            </div>
            <div v-else>
                <h5>Precio Actual de Venta :  ${{getPrice(coins[0].data.totalBid)}}<br></h5>
                <h5><span style="background:#e70000;color:white">La Cantidad Maxima de venta que tiene el ususario {{ username }} es de : <strong style="background:yellow;color:black">{{ MaxCriptoAmount }} {{coins[0].name}}</strong></span></h5>
            </div>
            <form class="col-xl-9" style="margin:auto;text-align:left" v-on:submit.prevent="submitForm">
            <div class="form-group">
                <label for="exampleInputEmail1">Cantidad</label>
                <div v-if="accion == 'vender'">
                <input input type="number" class="form-control" :max='MaxCriptoAmount' min="0" step="0.0000000001" v-model.number="criptoAmount" @input="adjustMoneyAmount">
                </div>
                <div v-else>
                <input input type="number" class="form-control" min="0" step="0.0000000001" v-model.number="criptoAmount" @input="adjustMoneyAmount">
                </div>
            </div><br>
            <div class="form-group">
                <label for="exampleInputPassword1">Precio</label>
                <input  v-model.number="moneyAmount" @input="adjustCriptoAmount" class="form-control">
            </div><br>
            <div v-if="accion == 'vender'">
                <button type="buttom" class="btn btn-success" :disabled="criptoAmount<0 || moneyAmount<0 ||  criptoAmount>MaxCriptoAmount">{{accion}}</button>
            </div>
            <div v-else>
                <button type="buttom" class="btn btn-success" :disabled="criptoAmount<0 || moneyAmount<0">{{accion}}</button>
            </div>
            </form>
        </div>

    </div>   
    </div>  
    </div>
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
	data() {
        return { 
            moneyAmount: 0, 
            criptoAmount: 0,
            accion:this.accion, 
            array:{
                user_id: 'agu123',
                action: '',
                crypto_code: this.id,
                crypto_amount:'',
                money: '',
                datetime: '',
            },
            };            
	},
    beforeCreate() {//antes de que cargue todo, llama la lista de vuex
        this.$store.commit("pullMovimientos")},
    computed:{
        movimientos(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            let x = this.$store.state.movimientos
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        },
        coins(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            let coins = this.$store.state.coins.filter((tech) => tech.coin == this.id)
            console.log(coins)
            loader.hide()
            return coins
        },
        MaxCriptoAmount(){
            let loader = this.$loading.show({container: false,canCancel: true});
            let coin = this.coins[0].coin
            let x = this.$store.getters.getResumen.movimiento
            if(x.length==0){
                var buscar =0
                loader.hide()
                return buscar
            }else{
                console.log(this.$store.getters.getResumen.movimiento)
                try{                    
                    var buscar = x.find(b=>b.crypto_code==coin)
                    loader.hide()
                    return buscar.crypto_amount
                }
                catch{
                    var buscar =0
                    loader.hide()
                    return buscar
                }
            }
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
        adjustMoneyAmount() {
			if (this.accion == "comprar") {
				this.moneyAmount = (
					this.coins[0].data.totalAsk * this.criptoAmount
				).toFixed(2);
			} else {
				this.moneyAmount = (
					this.coins[0].data.totalBid * this.criptoAmount
				).toFixed(2);
			}
		},
		adjustCriptoAmount() {
			if (this.accion == "comprar") {
				this.criptoAmount = (
					this.moneyAmount / this.coins[0].data.totalAsk
				).toFixed(2);
			} else {
				this.criptoAmount = (
					this.moneyAmount / this.coins[0].data.totalBid
				).toFixed(2);
			}
		},
        submitForm(){
            let loader = this.$loading.show({container: false,canCancel: true});
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
                
            })
            .catch((error)=> console.error(error));
        },
    }
}
</script>