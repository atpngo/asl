import React from "react";
import { motion } from "framer-motion";

function OptionButton({callback, children})
{
    return(
        <motion.button 
            whileHover={{scale: 1.1}} 
            whileTap={{ scale: 0.9 }} 
            className="alphabet-outline-dark p-5 w-36" 
            onClick={callback}
        >
            {children}
        </motion.button>
    )
}

export default OptionButton;
