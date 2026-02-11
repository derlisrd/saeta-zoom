import { availableColorsType } from "@/core/types/available-colors";





export const availableColors : Array<availableColorsType> = [
  { name: "green", color: "#00a76f", secondary : "#74ccae", mode:'system' },
    { name: "violet", color: "#734ad5", secondary : "#acd549", mode:'system' },
    { name: "bluelight", color: "#2187ab", secondary : "#f6ab4d", mode:'system' },
    { name: "bluesky", color: "#2189e4", secondary : "#f6ab4d", mode:'light' },
    { name: "orange", color: "#d76a16", secondary : "#8298cf", mode:'system' },
    { name: "red", color: "#c52f6f", secondary : "#7d2eaa", mode:'system' },
    { name: "new", color: "#2065D1", secondary : "#d18c20", mode:'dark' },
    {name : "black", color: "#000000", secondary : "#646464", mode:'light'},
    {name : "insta", color: "#517fa4", secondary : "#535d5e", mode:'light'},
  ];
  
  export const colorsMode = {
    light: {
      textPrimary:'#2c2c2c',
      textSecondary:'#6C737F',
      divider:'#F2F4F7',
      bgpaper:"#fff",
      bgdefault:"#f1f1f1",
      transparent:'#ffffff3d'
    },
    dark:{
      textPrimary:'#EDF2F7',
      textSecondary:'#A0AEC0',
      divider:'#2D3748',
      bgpaper: "#1f262e",
      bgdefault: "#161c24",
      transparent:'#0d11176e'
    },
  }
  
  
  export const colors  = {
    
    new: {
      primary:{
        lighter: '#D1E9FC',
        light: '#76B0F1',
        main: '#2065D1',
        dark: '#103996',
        darker: '#061B64',
        contrastText: '#fff',
      },
      secondary:{
        lighter: '#D6E4FF',
        light: '#84A9FF',
        main: '#3366FF',
        dark: '#1939B7',
        darker: '#091A7A',
        contrastText: '#fff',
      }
    },
  
    violet: {
      primary: {
        light: "#512da81f",
        main: "#734ad5",
        dark: "#381f75",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ceec87",
        main: "#acd549",
        dark: "#69852a",
        contrastText: "#000",
      },
    },
    green: {
      primary: {
        lighter:'#C8FACD',
        light: "#5BE584",
        main: "#00AB55",
        dark: "#007B55",
        darker:'#005249',
        contrastText: "#fff",
      },
      secondary: {
        lighter:'#D6E4FF',
        light: "#84A9FF",
        main: "#3366FF",
        dark: "#1939B7",
        darker:'#091A7A',
        contrastText: "#fff",
      },
    },
    bluelight: {
      primary: {
        light: "#66b6d21f",
        main: "#2187ab",
        dark: "#1a6985",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffeb8c",
        main: "#f6ab4d",
        dark: "#d76a16",
        contrastText: "#000",
      },
    },
    bluesky: {
      primary: {
        light: "#2189e41f",
        main: "#2189e4",
        dark: "#0d52a4",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffeb8c",
        main: "#f6ab4d",
        dark: "#d76a16",
        contrastText: "#000",
      },
    },
    orange: {
      primary: {
        light: "#d76a161f",
        main: "#d76a16",
        dark: "#923108",
        contrastText: "#fff",
      },
      secondary: {
        light: "#d3deff",
        main: "#8298cf",
        dark: "#647baf",
        contrastText: "#000",
      },
    },
    red: {
      primary: {
        light: "#FF48381f",
        main: "#FF4838",
        dark: "#931127",
        contrastText: "#fff",
      },
      secondary: {
        light: "#FFC9AF",
        main: "#FF4838",
        dark: "#931127",
        contrastText: "#000",
      },
    },
    black: {
      primary: {
        light: "#0000001f",
        main: "#000000",
        dark: "#000000",
        contrastText: "#fff",
      },
      secondary: {
        light: "#a5a5a5",
        main: "#6b6b6b",
        dark: "#3f3f3f",
        contrastText: "#000",
      },
    },
    insta: {
      primary: {
        light: "#517fa41f",
        main: "#517fa4",
        dark: "#306088",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffeb8c",
        main: "#a56b2a",
        dark: "#d76a16",
        contrastText: "#000",
      },
    }
  };