import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function AdminProducts({
  products,
  deleteProducts,
  handleSubmit,
  handleNombre,
  handlePrecio,
  handleFoto,
  handleDescripcion,
}) {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Lista de Productos
        </Typography>

      <Paper id="cart">
        <Table id="cartTable">
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products && products.map((product) => (
              <>
                <TableRow key={product._id}>
                  {/* FOTO */}
                  <TableCell>
                    <Avatar src={product.foto} />
                  </TableCell>

                  {/* NOMBRE */}
                  <TableCell>
                  <form action="">
                      <input
                        type="text"
                        onChange={handleNombre}
                        placeholder={product.nombre}
                        style={{border:"none", width:"100%"}}
                      />
                    </form>
                    </TableCell>

                  {/* PRECIO */}
                  <TableCell>
                    <form action="">
                      <input
                        type="text"
                        onChange={handlePrecio}
                        placeholder={product.precio}
                        style={{border:"none", width:"30%"}}
                      />
                    </form>
                    </TableCell>


                  {/* DESCRIPCION */}
                  <TableCell > 
                  <form >
                      <textarea
                        type="text"
                        onChange={handleDescripcion}
                        placeholder={product.descripcion}
                        style={{border:"none", width: "100%"}}
                        
                      />
                    </form>
                    </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleSubmit(product._id)}
                    >
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      className="botonCarrito"
                      onClick={() => deleteProducts(product._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Paper>
       </div>
</>
  );
}
