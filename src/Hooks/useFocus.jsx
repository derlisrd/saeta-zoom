function useFocus() {
    const focusTo = (id )=>{
        window.setTimeout(()=>{
            document.getElementById(id).focus()
        },300)
    }
    return {focusTo}
}

export default useFocus;