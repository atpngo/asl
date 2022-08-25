import React, { useState, useEffect } from "react";
import MCQLetter from "../components/Questions/MCQLetter";
import correctSound from "../media/correct.mp3";
import wrongSound from "../media/incorrect.mp3";
import { Howl } from 'howler';
import { motion, AnimatePresence } from "framer-motion";


function Practice()
{
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const [current, setCurrent] = useState();
    const [sounds, setSounds] = useState({});

    useEffect(() => {
        setSounds({
            'correct': new Howl({
                src: correctSound,
                html5: true,
                volume: 0.1,
                loop: false
            }),
            'incorrect': new Howl({   
                src: wrongSound,
                html5: true,
                volume: 0.1,
                loop: false
            })
        });

        setCurrent(true);

    }, []);

    const optionSelected = (option, answer) =>
    {
        // if correct, then play the gooood sound
        if (option === answer)
        {
            console.log('Correct!');
            sounds.correct.play();

            // next question
            setCurrent(false);

            setTimeout(() => {
               setCurrent(true);
            }, 500);
        }
        else
        {
            console.log('Incorrect');
            sounds.incorrect.play();
        }
    }

    const getRandomLetter = (exclude=[]) =>
    {
        let alphabetCopy = [...alphabet];
        for (const char of exclude)
        {
            alphabetCopy = alphabetCopy.filter(item => item !== char);
        }
        let randomIndex = Math.floor(Math.random() * alphabetCopy.length);
        return alphabetCopy[randomIndex];
    }

    const generateQuestion = () => 
    {
        let answer = getRandomLetter();
        let options = [];
        options.push(answer);
        for (let i=0; i<3; i++)
            options.push(getRandomLetter([...options]));

        let shuffledOptions = options.sort((a, b) => 0.5-Math.random());

        return <MCQLetter 
                    answer={answer} 
                    options={shuffledOptions} 
                    variant={Math.round(Math.random()) ? "identify" : "select"} 
                    callback={optionSelected}
                />
    }

    return(
        <div>
            <AnimatePresence>
                {current && 
                    <motion.div
                        key="practice"
                        initial={{y: "0", opacity: 0, scale: 0.5}}
                        animate={{y: 0, opacity: 1, scale: 1}}
                        exit={{x: "0%", opacity: 0,}}
                        transition={{duration: 0.3, ease: "easeOut"}}
                    >
                        {generateQuestion()}
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default Practice;