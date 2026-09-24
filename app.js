import React from "react";
import ReactDom from "react-dom";



const div=document.getElementById('box')
const h1=React.createElement('h1',{},"this is react ") 
const virtualDom=ReactDom.createRoot(div)
virtualDom.render(h1)