import React from 'react';
import { useState } from 'react';
import Globe from '../img/globe.png';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Typography} from '@mui/material';
import VI from '../../src/img/vietnamese.png'
import EN from '../../src/img/english.png'
import './comp.styles/LangOption.css'
import { changeLanguage, reloadResources } from 'i18next';

function Multi_Lang() {
    const [open, setOpen] = useState(false);
    const handleOpen=() => {
        setOpen(!open);
    };
    //let loc = window.location.pathname;
    // const check = Changer({inp:'Login'});
    // console.log(check);
    var [lang, setLang] = useState(''+localStorage.lng);
    if (!localStorage.lng) {
        localStorage.setItem('lng', 'EN');
        lang='EN'
    } else {
        lang=localStorage.lng;
    } 
    // if (check==='Login') {
    //     lang = 'EN';
    // } else {
    //     lang = 'VI';
    // }
    const handleLang = (lng) => {
        if (lng === 'en') {
            setLang('EN');  
            changeLanguage('en');
            localStorage.lng='EN';
            //window.location.replace(loc + "?lng=en");
        } else {
            setLang('VI');
            //window.location.replace(loc + "?lng=vi");
            changeLanguage('vi');
            localStorage.lng='VI';
        }
    };
    return (
        <div className="lang col-1 dropdown">
            <button className="multi-lang" onClick={handleOpen} type="button" data-bs-toggle="dropdown" aria-expanded="false"><img className="globe" src={Globe} alt="Globe" />
            </button>
            <span className="langbtn">
                {lang}
            </span> 
            {open? (
                <Box component="div" className="box"> 
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label"></FormLabel>
                        <RadioGroup 
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue={lang}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                control={<Radio checked={lang ==="VI"} onChange={() => handleLang('vi')} />}
                                value="vi"
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={VI} alt="Vietnamese" style={{ maxWidth:'25px', marginLeft:'-6px' }} />
                                    <Typography level="body3" style={{marginLeft: '5px', fontSize: '1.2em'}}>VI</Typography>
                                    </div>
                                }
                            />
                            <FormControlLabel 
                                value="en" 
                                control={<Radio checked={lang ==="EN"} onChange={() => handleLang('en')}/>} 
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={EN} alt="English" style={{ maxWidth:'25px', marginLeft:'-6px' }} />
                                    <Typography level="body3" style={{marginLeft: '5px', fontSize: '1.2em'}}>EN</Typography>
                                    </div>
                                }
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            ):null}   
        </div>
    );
}

export default Multi_Lang;
