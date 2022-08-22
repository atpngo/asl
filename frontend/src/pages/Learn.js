import React, { useState, useEffect } from "react";
import MCQLetter from "../components/Questions/MCQLetter";
import correctSound from "../media/correct.mp3";
import wrongSound from "../media/incorrect.mp3";
import { Howl } from 'howler';


function Learn()
{
    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const [sounds, setSounds] = useState({});

    useEffect(() => {
        setSounds({
            'correct': new Howl({
                src: correctSound,
                html5: true,
                volume: 0.05,
                loop: false
            }),
            'incorrect': new Howl({   
                src: wrongSound,
                html5: true,
                volume: 0.05,
                loop: false
            })
        });

    }, []);

    const optionSelected = (option, answer) =>
    {
        // if correct, then play the gooood sound
        if (option === answer)
        {
            console.log('Correct!');
            sounds.correct.play();

            // next question
            
        }
        else
        {
            console.log('Incorrect');
            sounds.incorrect.play();
        }
    }
    return(
        <div>
            <MCQLetter answer="S" options={['Q', 'M', 'S', 'A']} variant="identify" callback={optionSelected}/>
        </div>
    )
}

export default Learn;