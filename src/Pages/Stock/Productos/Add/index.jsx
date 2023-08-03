import Add from "./Add";
import AddProvider from "./AddProvider";
import Main from "./Main";



function AddProducto() {

  return (<AddProvider>
    <Add />
    <Main />
  </AddProvider>)

}

export default AddProducto;
