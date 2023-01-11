import axios from "axios";

const APIclient = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest",
  headers: { "x-apikey": "60eb09146661365596af552f" },
});

export default {
  getUserMovements(user) {//(user)
    return APIclient.get(`/transactions?q={"user_id": "${user}"}`);
  },
  getMovimentsById(id) {//(user)
    return APIclient.get("/transactions/"+id);
  },
  postOperation(movimiento) {
    return APIclient.post("/transactions", movimiento);
  },
  deleteOperation(id) {
    return APIclient.delete("/transactions/" + id);
  },
  getOperation(id) {
    return APIclient.get("/transactions/" + id);
  },
  editOperation(movimiento) {
    return APIclient.patch("/transactions/" + movimiento._id, movimiento);
  },
};
