import { useEffect,useState,useCallback } from "react";
import DialogZoom from "../../../Components/Dialogo/DialogZoom";
import { useUsuarios } from "./UsuariosProvider";
import { APICALLER } from "../../../Services/api";
import { Button, Checkbox, DialogActions, DialogContent, FormControlLabel, LinearProgress, List, ListItem } from "@mui/material";

function Permisos() {

    const {dialogs,llaveDialog,formSelect,lista,token_user} = useUsuarios()
    
    const [loading,setLoading] = useState(true)
    const close = ()=> llaveDialog('permisos',false)
    const [listaPermisosUsuario,setListaPermisosUsuario] = useState([])

    const setPermisos = async(check,idPermiso,index) => {
        const id_user = formSelect.id_user;

        let array = [...listaPermisosUsuario]
        array[index].checked = !check;
        setListaPermisosUsuario(array)
        if(check===false){
          
          let data = {id_user_permiso:id_user,id_permiso_permiso:idPermiso}
          let res = await APICALLER.insert({table:`permisos_users`,data,token:token_user})
          !res.response && console.log(res)
        }
        else{
          let res = await APICALLER.delete({token:token_user,table:`permisos_users`,namecolumns:`id_user_permiso,id_permiso_permiso`,ids:`${id_user},${idPermiso}`})
          !res.response && console.log(res)
        }
      };

    const getPermisos= useCallback(async()=>{
        let id_user = formSelect.id_user;
        if(id_user!==null && dialogs.permisos){
          setLoading(true)
          let res = await APICALLER.get({table:`permisos_users`,where:`id_user_permiso,=,${id_user}`})
          if(res.response) {
              let result = res.results;
              let listinha = lista.permisos;
              let permisos = [...listinha];
              let array = [];
              permisos.forEach((element)=>{
                  let exist = result.findIndex(item=> item.id_permiso_permiso===element.id_permiso)
                  array.push({...permisos,                    
                      id_permiso:element.id_permiso,
                      checked: exist<0 ? false : true,
                      clave_permiso: element.clave_permiso,
                      descripcion_permiso: element.descripcion_permiso
                      })
              })
              
              setListaPermisosUsuario(array)
          }else{
              console.log(res)
          }
          setLoading(false)
        } 
    },[formSelect])
  
  
      useEffect(()=>{
        const ca = new AbortController()
        let isActive = true;
        if(isActive){getPermisos();}
        return ()=>{isActive = false;ca.abort();}
      },[getPermisos])



    return (<DialogZoom open={dialogs.permisos} onClose={close} fullWidth title='Permisos' >
        <DialogContent >
          {
             loading ? <LinearProgress /> :
          
        <List>
          { listaPermisosUsuario.map((item,index) => (
            <ListItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={item.clave_permiso}
                    onChange={()=>{setPermisos(item.checked,item.id_permiso,index)}}
                    checked={item.checked}
                  />
                }
                label={`${item.clave_permiso} => ${item.descripcion_permiso}`}
              /> 
            </ListItem>
          ))}
        </List>
    }
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="large" onClick={close}>Cerrar</Button>
      </DialogActions>
        </DialogZoom> );
}

export default Permisos;