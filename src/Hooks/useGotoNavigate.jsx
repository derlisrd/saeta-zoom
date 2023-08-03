import { useNavigate } from "react-router-dom";
import { env } from "../App/config";

function useGotoNavigate() {
    const {BASEURL} = env
    const n = useNavigate()
    const navigate = (url)=> n(BASEURL+url)
    return {navigate}
}

export default useGotoNavigate;