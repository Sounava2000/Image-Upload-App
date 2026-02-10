import { useState } from 'react'
 
import './App.css'
import { Upload } from './Components/Upload.jsx'
  import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
    <Upload></Upload>
    <ToastContainer />
    </>
  )
}

export default App
