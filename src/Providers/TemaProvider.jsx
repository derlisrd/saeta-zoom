import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext,  useState,useEffect } from 'react';
import typography from '../App/styles/typography';
import components from '../App/styles/components';
import pallete from '../App/styles/pallete';
import shadows from '../App/styles/shadows';

const TemaContext = createContext()

function TemaProvider({children}) {
  
  

  const [mode,setMode] = useState(()=>{
    let sto = JSON.parse(localStorage.getItem('tema'))
    if(sto){
      return sto.mode
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
     return 'light'
  })

  const toggleTheme = ()=>{ 
    let nuevo_modo = mode==='light' ? 'dark' : 'light'
    let tema = {mode:nuevo_modo}
    localStorage.setItem('tema',JSON.stringify(tema))
    setMode( nuevo_modo )
 }

  const checkTheme = ()=>{
    const storage = JSON.parse(localStorage.getItem('tema'))
    //console.log(storage);
    if(!storage){
      let tema 
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        tema = {mode:'dark'}
      }
      else{
        tema = {mode:'light'}
      }
      localStorage.setItem('tema',JSON.stringify(tema))
    }
  }

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {checkTheme()}
    return () => {isActive = false;ca.abort();};
  }, [checkTheme]);
    
  const customTheme = createTheme({
      palette:pallete(mode),
      shadows:shadows(mode),
      typography,
      components,
    });
    //customTheme.components = ComponentsOverrides(customTheme)
    const values = { toggleTheme,mode }
    
    return <TemaContext.Provider value={values}><ThemeProvider theme={customTheme}><CssBaseline />{children}</ThemeProvider></TemaContext.Provider>
}

export function useTema (){
  const {toggleTheme,mode} = useContext(TemaContext)
  return {toggleTheme,mode}
}


export default TemaProvider;