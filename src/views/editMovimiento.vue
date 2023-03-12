<template>
    <br>
	<div class="card border-primary mb-12 shadow-lg" style="max-width: 80%;margin:auto">
        <div class="card-header"><h1>Editar Movimiento</h1></div>
        <div class="card-body">
		<form v-on:submit.prevent="submitForm" class="col-xl-10" style="margin:auto;text-align:left">
            <div v-if="Item._id!=null">
                <div class="form-group" >
                    <label for="1">Usuario </label>     
                        <input class="form-control" id="1" disabled type="text" v-model="Item.user_id"/>
                    </div><br>
                <div class="form-group">
                    <label for="exampleInputEmail1" style="text-align:center">Crypto </label>
                        <input class="form-control" disabled type="text" v-model="Item.crypto_code"/>
                </div><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Cantidad </label>
                        <input class="form-control" type="number" min="0" step="0.0000000001" v-model="Item.crypto_amount" @input="adjustMoneyAmount"/>
                </div><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Precio </label>
                        <input class="form-control" type="text" v-model.number="Item.money" @input="adjustCriptoAmount"/>
                </div><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Accion </label>
                        <input class="form-control" disabled type="text" v-model="Item.action" />
                </div><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Fecha Registro </label>
                        <input class="form-control" disabled type="text" v-model="Item.datetime"/>
                </div><br> 
                <div class="form-group">
                 <button class="btn btn-primary" :disabled="Item.crypto_amount<0 || Item.money<0 || Item.crypto_amount>maxValue ">Guardar</button> 
                </div><br>
            </div>
        <div v-else>Cargando</div>
        </form>
    </div>
        {{movimiento}}
    </div>
</template>

<script>
import Movimiento from '../services/APIlab.js';
export default {
	name: "editMovimiento",
    props:{
        id:{
            require:true,
        }
    },
	data() {
        return { 
            Item: {
				_id: "",
				action: "",
				crypto_amount: null,
				crypto_code: "",
				money: null,
				datetime: "",
			},
            array:{
                _id:null,
                crypto_amount:'',
                money: '',
                datetime: ''
            },
            };            
  },
    computed:{
        movimientos(){//accede la bbdd de vuex(busca en el store)
            let loader = this.$loading.show({container: false,canCancel: true});
            var x = this.$store.state.movimientos
            loader.hide()
            return x;//una computer propierty que busca de vuex la lista de technologies
        },
        movimiento(){
            let loader = this.$loading.show({container: false,canCancel: true});
            Movimiento.getMovimentsById(this.id)
            .then((response) => {
                    this.Item.user_id = response.data.user_id;
					this.Item.action = response.data.action === "purchase" ? "compró" : "vendió";
					this.Item.crypto_amount = parseFloat(response.data.crypto_amount);
					this.Item.crypto_code = response.data.crypto_code;
					this.Item.money = parseFloat(response.data.money);
					this.Item.datetime = response.data.datetime.slice(0, 10)  +'  '+response.data.datetime.slice(11, 16)//response.data.datetime;
                    this.div = this.Item.money / this.Item.crypto_amount
                console.log(response.data)
                loader.hide()
				})
				.catch(() => {
					console.log("Ocurrió un error durante la conexión con el servidor.");
				});
        },
        maxVenta(){
            let loader = this.$loading.show({container: false,canCancel: true});
            var x = this.$store.getters.getResumen.movimiento
            var buscar = x.find(b=>b.crypto_code=='btc')
            console.log(buscar.crypto_amount)
            loader.hide()
            return buscar.crypto_amount
        }
        
    },
    methods:{
        adjustMoneyAmount() {
            var loader = this.$loading.show({container: false,canCancel: true});
            debugger
			if (this.Item.action == "purchase") {
				this.Item.money = (
					parseFloat(this.div) * parseFloat(this.Item.crypto_amount)
				).toFixed(2);
			} else {
				this.Item.money = (
					parseFloat(this.div) * parseFloat(this.Item.crypto_amount)
				).toFixed(2);
			}
            loader.hide()
		},
		adjustCriptoAmount() {
            debugger
            var loader = this.$loading.show({container: false,canCancel: true});
			if (this.Item.action == "purchase") {
				this.Item.crypto_amount = (
					parseFloat(this.Item.money) / parseFloat(this.div)
				).toFixed(2);
			} else {
				this.Item.crypto_amount = (
					parseFloat(this.Item.money) / parseFloat(this.div)
				).toFixed(2);
			}
            loader.hide()
		},
        submitForm(){
            let loader = this.$loading.show({container: false,canCancel: true});
            this.array._id =this.id
            this.array.crypto_amount=this.Item.crypto_amount.toString()
            this.array.money=this.Item.money.toString()
            this.array.datetime = new Date().toLocaleString('en-US', {timeZone: 'America/Buenos_Aires',})
            console.log(this.array.datetime)
            console.log(this.array)
            Movimiento.editOperation(
                this.array)
            .then(response => {
                console.log(response.data)
                loader.hide()
                this.$swal(  'OK',
                                'Movimiento '+response.data._id+' editado con Exito',
                                'success');
                
            })
            .catch((error)=> console.error(error));
        },
        
    }
}
</script>