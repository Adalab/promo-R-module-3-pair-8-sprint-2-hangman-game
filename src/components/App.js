// import monigota from '../images/monigota.png';
import '../styles/main.scss';
import {useState, useEffect} from 'react';
import React from 'react';
import callToApi from '../services/api';

import Header from './Header';
import Dummy from './Dummy';



function App() {
  // VARIABLES ESTADO

  // Varible estado para incrementar el número de fallos
  // const [numberOfErrors, setNumberOfErrors] = useState(0);
  //Variable estado para guardar el carácter introducido en el input
  const [lastLetter, setLastLetter] = useState('');
  // Variable estado para almacenar la palabra que se deberá adivinar.
  const [word, setWord] = useState('Katakroker');
  // Variable estado para para almacenar y pintar las letras que introduce la jugadora.
  const [userLetter, setUserLetter] = useState([]);


// Llamada a al Api 

  useEffect(() => {
    callToApi().then((response) => {
      setWord(response)
      console.log(response);
    });
  },[]);

  
  //------------------------------------ FUNCIONES-----------------------------------------------

  const formSubmit =(e)=>{
    e.preventDefault();
  };

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

  const handleInputLetter = (ev) => {
    // Hemos creado una constante regex para definir los caracteres válidos
    const regex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/;
    // Vamos a hacer una condicional mediante el método .test, para testear un match en un string. Si lo encuentra devuelve true, sino false.
    if (regex.test(ev.target.value)){
      setLastLetter(ev.target.value);
      // ponemos entre corchetes por que es un array sino no lo identificaría como un string lo que cambia en el valor de la constante
      setUserLetter([...userLetter, ev.target.value]);
    }
    else{
      setLastLetter('');
    }
  };

  // Función para pintar las letras, pero no nos pinta las mayusculas buenas

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((eachLetter, index) => {
      const exist = userLetter.includes(eachLetter.toLocaleLowerCase())
   //Gracias a key podemos ver los guiones sin que se vean las letras.
   // Hemos hecho un ternario para pintar las letras si coinciden con la letra de la Api
      return <li key={index} className="letter">{exist ? eachLetter : ''}</li>
    })
  };

  // Con esta función estamos pintando las letras falladas, pero nos pinta la misma letra si se la ponemos en minúscula y si se la ponemos en mayus también la pinta

  const renderErrorLetters = () => {
    const errorLetter = 
    userLetter.filter((eachUserLetter) => !word.toLocaleLowerCase().includes(eachUserLetter.toLocaleLowerCase()) )
        return errorLetter.map((letter, index) => {
          return <li key={index} className="letter">{letter}</li>
        })
      };

      

  return (
    <div className="App">
      <div className="page">
      <Header/>

      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              {renderErrorLetters()}
            </ul>
          </div>
          <form className="form" onSubmit={formSubmit}>
            <label className="title" htmlFor="last-letter">Escribe una letra:</label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              onChange= {handleInputLetter}
              value= {lastLetter}
            />
             {/* Buton de prueba para incrementar los errores en en el ahorcado */}
             {/* <button onClick={increment}>Incrementar</button> */}
          </form>

         

        </section>
        <Dummy numberofErrors= {getNumberOfErrors}/>
      </main>
    </div>
    </div>
  );
}

export default App;
