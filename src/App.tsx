import { useReducer } from 'react';
import { initialState } from './store/initialState'
import { reducer } from './store/reducer';
import { BrowserRouter, Routes, Route } from 'react-router'
import FormBuilder from './components/FormBuilder/FormBuilder'
import Forms from './components/Forms'
import { Context } from './context/Context'
import './App.css'
import FormPreview from './components/FormPreview/FormPreview';
import FormFilledSuccess from './components/FormFilledSuccess';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="edit/:formId" element={<FormBuilder />} />
          <Route path="preview/:formId/" element={<FormPreview />} />
          <Route path="preview/:formId/success" element={<FormFilledSuccess/>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
