export const Adiciones = {
    flechas: (e,param)=>{
        const {value,name} = e.target
        let antiguo_valor = parseFloat(value) 
        let nuevo_param = {...param}
        let nuevo_valor = 0;

        if(e.key==='ArrowDown'){
            nuevo_valor = antiguo_valor - 0.25
        }
        if(e.key==='ArrowUp'){
            nuevo_valor = antiguo_valor + 0.25
        }
        let cerca_esf_derecho = parseFloat(nuevo_param.cerca_derecho_esferico)
        let cerca_esf_izquierdo = parseFloat(nuevo_param.cerca_izquierdo_esferico)
        
        nuevo_param[name] = nuevo_valor

        if(name ==='adicion_derecho'){
            nuevo_param.cerca_derecho_esferico = nuevo_valor + ( parseFloat(nuevo_param.lejos_derecho_esferico) )
            return nuevo_param; 
        }
        if(name === 'cerca_derecho_esferico'){
            nuevo_param.adicion_derecho = nuevo_valor - ( parseFloat(nuevo_param.lejos_derecho_esferico) )
            return nuevo_param; 
        }
        if(name === 'lejos_derecho_esferico' && cerca_esf_derecho !==0 ){
            nuevo_param.adicion_derecho = cerca_esf_derecho - ( nuevo_valor )
            return nuevo_param; 
        }
        if(name ==='adicion_izquierdo'){
            nuevo_param.cerca_izquierdo_esferico = nuevo_valor + ( parseFloat(nuevo_param.lejos_izquierdo_esferico) )
            return nuevo_param; 
        }
        if(name === 'cerca_izquierdo_esferico'){
            nuevo_param.adicion_izquierdo = nuevo_valor - ( parseFloat(nuevo_param.lejos_izquierdo_esferico) )
            return nuevo_param; 
        }
        if(name === 'lejos_izquierdo_esferico' && cerca_esf_izquierdo !==0 ){
            nuevo_param.adicion_izquierdo = cerca_esf_izquierdo - ( nuevo_valor )
            return nuevo_param; 
        }
        return nuevo_param;
    },

    cambio: (e,param)=>{
        const {value,name} = e.target
        let nuevo_param = {...param}
        let nuevo_valor = parseFloat(value);
        
        let cerca_esf_derecho = parseFloat(nuevo_param.cerca_derecho_esferico)
        let cerca_esf_izquierdo = parseFloat(nuevo_param.cerca_izquierdo_esferico)
        
        nuevo_param[name] = nuevo_valor

        if(name ==='adicion_derecho'){
            nuevo_param.cerca_derecho_esferico = nuevo_valor + ( parseFloat(nuevo_param.lejos_derecho_esferico) )
            return nuevo_param; 
        }
        if(name === 'cerca_derecho_esferico'){
            nuevo_param.adicion_derecho = nuevo_valor - ( parseFloat(nuevo_param.lejos_derecho_esferico) )
            return nuevo_param; 
        }
        if(name === 'lejos_derecho_esferico' && cerca_esf_derecho !==0 ){
            nuevo_param.adicion_derecho = cerca_esf_derecho - ( nuevo_valor )
            return nuevo_param; 
        }
        if(name ==='adicion_izquierdo'){
            nuevo_param.cerca_izquierdo_esferico = nuevo_valor + ( parseFloat(nuevo_param.lejos_izquierdo_esferico) )
            return nuevo_param; 
        }
        if(name === 'cerca_izquierdo_esferico'){
            nuevo_param.adicion_izquierdo = nuevo_valor - ( parseFloat(nuevo_param.lejos_izquierdo_esferico) )
            return nuevo_param; 
        }
        if(name === 'lejos_izquierdo_esferico' && cerca_esf_izquierdo !==0 ){
            nuevo_param.adicion_izquierdo = cerca_esf_izquierdo - ( nuevo_valor )
            return nuevo_param; 
        }
        return nuevo_param;
    }

}
