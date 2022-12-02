// import monigota from '../images/monigota.png';
import '../styles/main.scss';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import callToApi from '../services/api';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';
import Loading from './Loading';

function App() {
  // VARIABLES ESTADO

  // Varible estado para incrementar el número de fallos
  // const [numberOfErrors, setNumberOfErrors] = useState(0);
  // Variable estado para guardar el carácter introducido en el input
  const [lastLetter, setLastLetter] = useState('');
  // Variable estado para almacenar la palabra que se deberá adivinar.
  const [word, setWord] = useState('katakroker');
  // Variable estado para para almacenar y pintar las letras que introduce la jugadora.
  const [userLetter, setUserLetter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Llamada a al Api

  useEffect(() => {
    setIsLoading(true);
    callToApi().then((response) => {
      setIsLoading(false);
      setWord(response);
    });
  }, []);

  //------------------------------------ FUNCIONES-----------------------------------------------

  // Incrementar el numero de fallos en el ahorcado, para que se pinten
  // const increment = () => {
  //   setNumberOfErrors(numberOfErrors+1);
  //   if(numberOfErrors === 13){

  //   }
  // };

  //funcion para pintar en el ahorcado los errores

  const getNumberOfErrors = () => {
    const numberError = userLetter.filter((letter) => !word.includes(letter));
    return numberError.length;
  };

  // función para almacenar letra introducida por el usuario

  const handleInputLetter = (value) => {
    // Hemos creado una constante regex para definir los caracteres válidos
    const regex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/;
    // Vamos a hacer una condicional mediante el método .test, para testear un match en un string. Si lo encuentra devuelve true, sino false.
    if (regex.test(value)) {
      setLastLetter(value);
      // ponemos entre corchetes por que es un array sino no lo identificaría como un string lo que cambia en el valor de la constante
      setUserLetter([...userLetter, value]);
    } else {
      setLastLetter('');
    }
  };

  const handleChange = (value) => {
    setLastLetter('');
    setUserLetter([]);
    setWord(value);
  };

  // Función para pintar las letras, pero no nos pinta las mayusculas buenas

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((eachLetter, index) => {
      const exist = userLetter.includes(eachLetter.toLocaleLowerCase());
      //Gracias a key podemos ver los guiones sin que se vean las letras.
      // Hemos hecho un ternario para pintar las letras si coinciden con la letra de la Api
      return (
        <li key={index} className='letter'>
          {exist ? eachLetter : ''}
        </li>
      );
    });
  };

  // Con esta función estamos pintando las letras falladas, pero nos pinta la misma letra si se la ponemos en minúscula y si se la ponemos en mayus también la pinta

  const renderErrorLetters = () => {
    const errorLetter = userLetter.filter(
      (eachUserLetter) =>
        !word.toLocaleLowerCase().includes(eachUserLetter.toLocaleLowerCase())
    );
    return errorLetter.map((letter, index) => {
      return (
        <li key={index} className='letter'>
          {letter}
        </li>
      );
    });
  };

  return (
    <div className='App'>
      <div className='page'>
        <Header />

        <main className='main'>
          <Loading loading={isLoading} />
          <Routes>
            <Route
              path='/'
              element={
                <section>
                  <SolutionLetters
                    renderSolutionLetters={renderSolutionLetters}
                    userLetters={userLetter}
                    word={word}
                  />
                  <ErrorLetters
                    renderErrorLetters={renderErrorLetters}
                    userLetters={userLetter}
                    word={word}
                  />
                  <Form
                    handleInputLetter={handleInputLetter}
                    lastLetter={lastLetter}
                  />
                </section>
              }
            />
            <Route path='/instructions' element={<Instructions />} />
            <Route
              path='/options'
              element={<Options handleChange={handleChange} word={word} />}
            />
          </Routes>
          <Dummy numberofErrors={getNumberOfErrors} />
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
