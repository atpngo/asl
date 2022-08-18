import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Practice from "./pages/Practice/Practice";
import Landing from "./pages/Landing/Landing";
import './index.css';

function App()
{
  
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/practice" element={<Practice/>}/>
        </Routes>
      </Router>
    </div>
    // <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    //   <p className="text-3xl text-gray-700 font-bold mb-5">
    //     Welcome!
    //   </p>
    //   <p className="text-gray-500 text-lg">
    //     React and Tailwind CSS in action
    //   </p>
    // </div>
  );
  
}

export default App;