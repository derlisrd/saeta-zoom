import { createContext } from "react";

const Context = createContext()

export function Provider({children}) {
    const values = {}
    return ( <Context.Provider value={values}>{children}</Context.Provider> );
}

