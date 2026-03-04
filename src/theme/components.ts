import { Components, CssVarsTheme, Theme } from "@mui/material/styles";


export const components = (): Components<Omit<Theme, "components" | "palette"> & CssVarsTheme> => ({
   MuiCssBaseline: {
    styleOverrides: {
      /* "::-webkit-scrollbar": { 
        width: '11px',
        backgroundColor: '#6f6f6fff',
        borderRadius: "10px"
      },
      '::-webkit-scrollbar-thumb':{
        backgroundColor: "#b5b5b5ff",
        borderRadius: "10px"
      } */
    },
  },
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: 0,
        height: 20,
        fontSize: 9,
       "& .MuiChip-label": {
          paddingLeft: 4,
          paddingRight: 4
        } 
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        "&.MuiPickersPopper-paper": {
           boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
           borderRadius: "12px"
        }
      }
    }
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "16px",
        boxShadow: "7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)"
      }
    }
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: "30px"
        /*"& span": {
          //fontSize:tema.fontSize.menu
        }, */
      }
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {}
    }
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        alignItems: "center",
        borderRadius: "0 14px 14px 0",
        transition: "all 0.02s linear",
        "&.Mui-selected": {
          borderLeft: `4px solid `
        },
        "&:hover": {
          /* backgroundColor: colores[tema.colors].primary.light,
          "& span": {
            color:
              tema.mode === "light"
                ? colores[tema.colors].primary.main
                : colorText,
             fontWeight:"bold", 
          }, */
          borderRadius: "0 14px 14px 0"
        }
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      sx: {
        borderRadius: "8px"
      },
      variant: "outlined",
      size: "small"
    },
    styleOverrides: {
      root: {
        borderRadius: "8px",
        "&:hover": {
          border: "none",
          outline: "none"
        }
      }
    }
  },
  MuiInputBase: {
    defaultProps: {
      size: "small"
    },
    styleOverrides: {
      root: {
        borderRadius: "8px",
        backgroundColor: "background.paper"
      }
    }
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {}
    }
  },
  MuiInput: {
    styleOverrides: {
      root: {
        //borderRadius: "8px",
       // padding: "18px"

        "& input": {}
      }
    }
  },

  MuiOutlinedInput: {
    defaultProps: {
      size: "small"
    },
    styleOverrides: {
      root: {
        backgroundColor: "background.paper",
        borderRadius: "8px",
        borderWidth: 0,

        "& input": {}
      }
    }
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        /* marginRight: '0'
         "& svg": {
          fontSize: 18
        } */
        "& svg": {}
      }
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {}
    }
  },
  MuiButton: {
    defaultProps: {
      variant: "contained"
    },
    styleOverrides: {
      root: {
        borderRadius: "8px",
        "&:hover": {}
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: 4
      }
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: 8
      }
    }
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: "0 !important",
        paddingRight: "0 !important"
      }
    }
  },
  MuiDialog: {
    defaultProps: {
      fullWidth: true,
      disableRestoreFocus: true
    },
    styleOverrides: {
      paper: {
        borderRadius: "0"
      }
    }
  },
  MuiSelect: {
    defaultProps: {
      size: "small"
    },
    styleOverrides: {
      root: {}
    }
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backdropFilter: "blur(3px)"
      }
    }
  },
});