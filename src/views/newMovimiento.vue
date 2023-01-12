<template>
	<div>
        <div class="card border-primary mb-12 shadow-lg" style="max-width: 80%;margin:auto">
        <div class="card-header"><h1>{{accion}} {{username}} {{coins[0].name}}</h1></div>
        <div class="card-body">
        <div v-if="MaxCriptoAmount==0 && accion =='vender'">Usted no posee {{coins[0].name}} para vender</div>
        <div v-else>
            <div v-if="accion == 'comprar'">
                <h5>Precio de Compra ${{getPrice(this.coins[0].data.totalAsk)}}</h5>
            </div>
            <div v-else>
                <h5>Precio Actual de Venta :  ${{getPrice(coins[0].data.totalBid)}}<br></h5>
                <h5><span style="background:#e70000;color:white">La Cantidad Maxima de venta es de : <strong style="background:yellow;color:black">{{ MaxCriptoAmount }} {{coins[0].name}}</strong></span></h5>
            </div>
            <form class="col-xl-9" style="margin:auto;text-align:left" v-on:submit.prevent="submitForm">
                <div class="form-group">
                    <label for="exampleInputEmail1">Cantidad</label>
                    <input  type="number" class="form-control" :max='MaxCriptoAmount' min="0" step="0.0000000001" v-model="criptoAmount" @input="adjustMoneyAmount">
                </div><br>
                <div class="form-group">
                    <label for="exampleInputPassword1">Precio</label>
                    <input v-model.number="moneyAmount" @input="adjustCriptoAmount" class="form-control">
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
                user_id: this.username,
                action: '',
                crypto_code: this.id,
                crypto_amount:'',
                money: '',
                datetime: '',
            },
            };            
	},
    computed:{
        movimientos(){//accede la bbdd de vuex(busca en el store)
            var loader = this.$loading.show({container: false,canCancel: true});
            var x = this.$store.state.movimientos
            console.log(x)
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        },
        coins(){//accede la bbdd de vuex(busca en el store)
            var loader = this.$loading.show({container: false,canCancel: true});
            var coins = this.$store.state.coins.filter((tech) => tech.coin == this.id)
            console.log(coins)
            loader.hide()
            return coins
        },
        MaxCriptoAmount(){
            try{
            let loader = this.$loading.show({container: false,canCancel: true});
            if(this.accion=='vender'){
                    let coin = this.coins[0].coin
                    let x = this.$store.getters.getResumen.movimiento
                    if(x.length==0){
                        var buscar =0
                        loader.hide()
                        return buscar
                    }else{
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
            }else{
                let buscar = Number.MAX_VALUE
                loader.hide()
                return buscar
            }
        } catch (error) {
            console.error(error);
            }
        },
        username() {
            var x = this.$store.state.username;
            console.log(x)
            return x;
        },
        
        
    },
    methods:{
        getPrice(number){
            var ars = number.toLocaleString(
                'de-DE', { style: 'currency',currency: 'ARS' })
            return ars
        },
        adjustMoneyAmount() {
            debugger
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