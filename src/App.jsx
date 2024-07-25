import React from 'react'
import NotePage from './pages/NotePage'
import NoteContenxt from './context/NoteContenxt'
function App() {


  return (
    <>
    <div id="app">
      <NoteContenxt>
   <NotePage />
      </NoteContenxt>
    </div>
    </>
  )
}

export default App
