import axios from "axios"

const traerCarrito = (products) =>{
    return {
      type: "TRAER_CARRITO",
      products
    }
}

export const fetchCart = () => {
    return (dispatch) => {
      axios.get("/api/cart")
        .then(rta => rta.data)
        .then(products => {
          dispatch(traerCarrito(products))
        })
        .catch(err => res.send(err))

    }
}

export const deleteCart = (idProduct)=>{
  return()=>{
    axios.delete(`/api/cart/${idProduct}`)
      .then(rta => rta.data)
      .catch(err => res.send(err))
  }
}

export const updateCart = (idProduct)=>{
  return()=>{
    axios.put(`/api/cart/${idProduct}` , cantidad)
      .then(rta => rta.data)
      .catch(err => res.send(err))

  }
}