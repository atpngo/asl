import React from "react";
import { motion } from "framer-motion";

function OptionButton({callback, children, correct})
{
    return(
        <motion.div 
            whileHover={{scale: 1.1}} 
            whileTap={ correct ? { scale: 0.9 } : { rotate: [0, 10, -10, 10, -10, 10, -10, 0] }} 
            className="alphabet-outline-dark p-5 w-36" 
            onMouseDown={callback}
        >
            {children}
        </motion.div>
    )
}

export default OptionButton;
