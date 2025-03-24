import React from 'react';
import Index from './Pages/Home/page.tsx';



import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App()
{

  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;