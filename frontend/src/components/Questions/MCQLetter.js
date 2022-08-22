import React from "react";
import Sign from "../Sign";
import BackendManager from "../../utils/BackendManager";


function MCQLetter({answer, options, variant, callback })
{
    // props:
    // answer: string
    // options: [string]
    // variant: 'identify' (identify sign) or 'select' (select sign)



    return(
        <div className="flex flex-col items-center gap-12">
            {/* Prompt */}
            <div className="mt-10 thick-outline w-4/5 p-10 flex justify-center">
                {variant === 'select' ? <p>{answer}</p> : <Sign className="w-full max-w-[350px]" value={answer}/>}
            </div>

            {/* What letter is this? */}
            <div className="text-center gap-4">
                
                <p className="text-2xl">What letter is this?</p>
                {/* Group of options */}
                <div className="grid grid-cols-2 gap-8 mt-3 lg:flex lg:flex-row">
                    
                    {options.map((option, index) => {
                        return(
                            <button key={index} className="alphabet-outline-dark p-5 w-36 expand-btn" onClick={() => callback(option, answer)}>
                                <p className="text-7xl p-0 m-0">{option}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default MCQLetter;