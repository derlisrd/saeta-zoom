const components = {
  
    MuiOutlinedInput:{
      styleOverrides:{
        root: {
          borderRadius: "8px",
          borderWidth: 0,
        },
      }
    }
    ,
    MuiDialogContent:{
      styleOverrides:{
        root:{
          paddingTop:"10px !important"
        }
      }
    },
    MuiCssBaseline:{
      styleOverrides:{
        body: {
          margin:0,
          padding:0,
          boxSizing:"border-box",
          background:'background.paper',
          transition:'all 0.2s',
        },
        
      }
    }
  }
export default components