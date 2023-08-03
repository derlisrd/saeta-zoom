import { useAuth } from "../Providers/AuthProvider";
import Axios from "axios";
import CryptoJS from 'crypto-js';
import { APIURL, XAPITOKEN, SECRETO } from "../App/config";

const DescifrarTexto = t =>  CryptoJS.AES.decrypt(t, SECRETO).toString(CryptoJS.enc.Utf8);

function useQuerys() {
    
    const {userData} = useAuth()

    const token = DescifrarTexto(userData.token_user)

    const borrar = async({table,id})=>{
      try {
        let ID = id !== "" ? id + "/" : "";
        let url = `${APIURL}${table}/${ID}?token=${token}`;
        const res = await Axios({
          url,
          method: "DELETE",
          headers: { "X-Api-Token": XAPITOKEN },
        });
        return await res.data;
      } catch (error) {
        const err = { results: null, response:  false, message: error };
        return err;
      }
    }

    const get = async({table,where})=>{
      try {
        let URLFINAL = `${APIURL}${table}?where=${where}`;
        const res = await fetch(URLFINAL, {
          headers: { "X-Api-Token": XAPITOKEN },
        });
        return await res.json();
      } catch (error) {
        return { results: null, response:  false, message: error };
      }
    }

    const insert = async({table,data})=>{
        try {
            const res = await Axios({
              url: `${APIURL}${table}/?token=${token}`,
              method: "POST",
              data: JSON.stringify(data),
              headers: { "X-Api-Token": XAPITOKEN },
            });
            return await res.data;
          } catch (error) {
            const err = { results: null, response:  false, message: error };
            return err;
          }
    }


    const actualizar = async ({ table, data, id }) => {
      try {
        const res = await Axios({
          url: `${APIURL}${table}/${id}/?token=${token}&operator=`,
          method: "PUT",
          data: JSON.stringify(data),
          headers: { "X-Api-Token": XAPITOKEN },
        });
        return await res.data;
      } catch (error) {
        return { results: null, response:  false, message: error };
      }
    
    }

    return {insert,actualizar,get,borrar}

}

export default useQuerys;