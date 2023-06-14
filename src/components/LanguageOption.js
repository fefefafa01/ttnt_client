import '../i18n'
import React, { useState } from 'react'
import './comp.styles/LangOption.css'

const languages = [
    { value: '', text: "Default EN" },
    { value: 'en', text: "English" },
    { value: 'vi', text: "Vietnam" },
    { value: 'ja', text: "Japanese" },
  ]
  
  function AppRender () {
    //Multilang
    var [lang, setLang] = useState('');
    const handleChange = e => {
      setLang(e.target.value);
      let loc = "http://localhost:3000/";
      window.location.replace(loc + "?lng=" + e.target.value);
    }
    
      //Export
      return (
        <>
          <select value={lang} onChange={handleChange}>
            {languages.map(item => {
                return (<option key={item.value}
                    value={item.value}>{item.text}</option>);
            })}
        </select>
        </>
      );
  }

  export {AppRender}