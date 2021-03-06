import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Cart({ products, deleteCart, updateCart, user, handleRefresh }) {
  const parsedLocalCart = JSON.parse(localStorage.getItem("producto"));
  const verif = () => {
    if (parsedLocalCart) {
      const localProducts = products.concat(parsedLocalCart);
      return localProducts;
    } else {
      return products;
    }
  };
  const finalProducts = verif();
  const total = () => {
    let resultado = 0;
    finalProducts[0] &&
      finalProducts.map((product) => {
        resultado +=
          product.productos[0].productos[0].precio * product.cantidad;
      });
    return resultado;
  };

  const classes = useStyles();

  return (
    <>
      <h4 className="titles" id="titleCart">
        CARRITO
      </h4>
      <hr />
      <br />
      <br />
      <Paper id="cart">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Talle</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalProducts[0] &&
              finalProducts.map((product) => (
                <>
                  <TableRow key={product._id}>
                    <TableCell>
                      <Avatar src={product.productos[0].productos[0].foto} />
                    </TableCell>
                    <TableCell>
                      {product.productos[0].productos[0].nombre}{" "}
                    </TableCell>
                    <TableCell> {product.productos[0].color} </TableCell>
                    <TableCell> {product.productos[0].talle} </TableCell>
                    <TableCell>
                      <Icon
                        color="action"
                        onClick={() => {
                          if (product.cantidad > 1) {
                            if (user._id) {
                              updateCart(product._id, product.cantidad - 1);
                            } else {
                              const updateLocal = JSON.parse(
                                localStorage.getItem("producto")
                              );
                              const ind = updateLocal.findIndex(
                                (obj) =>
                                  obj.productos[0]._id ==
                                  product.productos[0]._id
                              );
                              updateLocal[ind].cantidad -= 1;
                              localStorage.setItem(
                                "producto",
                                JSON.stringify(updateLocal)
                              );
                              handleRefresh();
                            }
                          }
                        }}
                      >
                        remove_circle
                      </Icon>
                      {product.cantidad}
                      <Icon
                        color="secondary"
                        onClick={() => {
                          if (product.cantidad < 5) {
                            if (user._id) {
                              updateCart(product._id, product.cantidad + 1);
                            } else {
                              const updateLocal = JSON.parse(
                                localStorage.getItem("producto")
                              );
                              const ind = updateLocal.findIndex(
                                (obj) =>
                                  obj.productos[0]._id ==
                                  product.productos[0]._id
                              );
                              updateLocal[ind].cantidad += 1;
                              localStorage.setItem(
                                "producto",
                                JSON.stringify(updateLocal)
                              );
                              handleRefresh();
                            }
                          }
                        }}
                      >
                        add_circle
                      </Icon>
                    </TableCell>
                    <TableCell>
                      $
                      {product.productos[0].productos[0].precio *
                        product.cantidad}
                    </TableCell>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      id="eliminar"
                      onClick={() => {
                        if (user._id) {
                          deleteCart(product._id);
                        } else {
                          const updateLocal = JSON.parse(
                            localStorage.getItem("producto")
                          );
                          const ind = updateLocal.findIndex(
                            (obj) =>
                              obj.productos[0]._id == product.productos[0]._id
                          );
                          updateLocal.splice(ind, 1);
                          localStorage.setItem(
                            "producto",
                            JSON.stringify(updateLocal)
                          );
                          handleRefresh();
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableRow>
                </>
              ))}
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell align="right">${total()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <div id="cartBoton">
        <Link to="/">
          <Button
            type="submit"
            variant="outlined"
            size="small"
            className={classes.margin}
          >
            SEGUIR COMPRANDO
          </Button>
        </Link>
        <Link to="/checkout">
          <Button
            variant="contained"
            type="submit"
            variant="contained"
            size="small"
            style={{ backgroundColor: "lightpink" }}
            className={classes.margin}
          >
            COMPRAR
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
