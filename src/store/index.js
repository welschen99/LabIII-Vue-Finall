import { createStore,createTo, storeKey } from 'vuex'
import cripto from "../services/Cripto.js";
import images from "../services/CriptoImages.js"
import api from "../services/APIlab.js";
//usamos vuex para generar las listas aca y poder usarlas en todas las otras vistas

export default createStore({
  state: {
    username: '',
    coins:[],
    movimientos:[],
    resumen:[],
  },
  mutations: {
    setUser(state, name) {
      state.username = name ;
    },
    pullCripto(state){
        images.getImages()
            .then(response =>{
            state.coinsImages = response.data
        })
        cripto.getPrice('satoshitango','btc')
            .then(response =>{
            state.coins.push({
                coin:state.coinsImages[0].symbol,
                name:state.coinsImages[0].name,
                image:state.coinsImages[0].image.large,
                data:response.data})
        })
        cripto.getPrice('satoshitango','eth')
            .then(response =>{
                state.coins.push({
                    coin:state.coinsImages[1].symbol,
                    name:state.coinsImages[1].name,
                    image:state.coinsImages[1].image.large,
                    data:response.data})
        })
        cripto.getPrice('satoshitango','usdc')
            .then(response =>{
            state.coins.push({
              //cambian las posiciones del array con las imagenes
                coin:'usdc',
                name:'USD Coin',
                image:"https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
                data:response.data})
        })
    },
    pullMovimientos(state){
        api.getUserMovements(state.username)
        .then(response =>{
            state.movimientos=response.data
        })
    }

  },
  getters: {
    getResumen(state){
      var total = 0
      var totalActual=[]
      const movimientos = state.movimientos.reduce((acumulador, valorActual) => {
        total += parseFloat(valorActual.money)
        valorActual.money=parseFloat(valorActual.money)
        const movimientoYaExiste = acumulador.find(movimiento => movimiento.crypto_code === valorActual.crypto_code);
        if (movimientoYaExiste) {
          return acumulador.map((movimiento) => {
            if (movimiento.crypto_code === valorActual.crypto_code) {
              if(valorActual.action=='sale')
              {
                return {
                  ...movimiento,
                  money: parseFloat(movimiento.money)- parseFloat(valorActual.money),
                  crypto_amount:parseFloat(movimiento.crypto_amount)-parseFloat(valorActual.crypto_amount)
                }
              }
              else if(movimiento.action=='purchase'){
                return {
                  ...movimiento,
                  money: parseFloat(movimiento.money)+parseFloat(valorActual.money),
                  crypto_amount:parseFloat(movimiento.crypto_amount)+parseFloat(valorActual.crypto_amount)
                }
              }
            }
            return movimiento;
          });
        }
        else{

        }
        return [...acumulador, valorActual];
      }, []);
      
      var totalValorActual=0
      var totalRentabilidad=0
      var precio =0
      var rentabilidad = 0
      for (let x of movimientos){
        let cantidad =parseFloat(x.crypto_amount)
        const precioActual = state.coins.find(c => c.coin === x.crypto_code);
        precio=parseFloat(precioActual.data.totalBid)*cantidad
        if(x.action=='sale'){
              rentabilidad = parseFloat(precio) -parseFloat(x.money) 
              totalValorActual+=precio
              totalRentabilidad+=rentabilidad
          }else{
              rentabilidad = parseFloat(precio) -parseFloat(x.money )
              totalValorActual+=precio
              totalRentabilidad+=rentabilidad
          }
        totalActual.push({
          cantidad:cantidad,
          precio:precio,
          rentabilidad:rentabilidad.toFixed(2),
        })
        
      }

      return {
        movimiento:movimientos,
        total:total.toFixed(2),
        totalValorActual:totalValorActual.toFixed(2),
        totalActual:totalActual,
        totalRentabilidad:parseFloat(totalRentabilidad)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
