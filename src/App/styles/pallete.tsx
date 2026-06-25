

function pallete(mode) {
    
    const paper = mode === 'light' ? '#fff' : '#1f262e'
    const defaultcolor = mode === 'light' ? '#f7f7f7' : '#161c24' 

    const textPrimary = mode === 'light' ? '#212b36' : '#fff'

    return {
        mode: mode,
        background:{
            paper,
            default:defaultcolor
        },
        text:{
            primary: textPrimary
        }
    }

}

export default pallete;