import React from "react";
import Sign from "../Sign";
import OptionButton from "./OptionButton";

function MCQLetter({answer, options, variant, callback })
{
    // props:
    // answer: string
    // options: [string]
    // variant: 'identify' (identify sign) or 'select' (select sign)



    return(
        <div className="flex flex-col items-center gap-12 h-screen justify-center">
            {/* Prompt */}
            <div className="thick-outline w-4/5 p-10 flex justify-center">
                {variant === 'select' ? <p className="text-9xl lg:text-12xl p-0 m-0">{answer}</p> : <Sign className="w-full max-w-[300px]" value={answer}/>}
            </div>

            {/* What letter is this? */}
            <div className="text-center gap-4">
                
                <p className="text-2xl">What letter is this?</p>
                {/* Group of options */}
                <div className="grid grid-cols-2 gap-8 mt-3 lg:flex lg:flex-row">
                    
                    {options.map((option, index) => {
                        return(
                            <OptionButton key={index} callback={() => callback(option, answer)} correct={option === answer}>
                                {variant === 'select' ? <Sign className="w-100" value={option}/> : <p className="text-7xl p-0 m-0">{option}</p>}
                            </OptionButton>

                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default MCQLetter;