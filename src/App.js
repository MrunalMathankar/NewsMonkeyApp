import React , {useState} from 'react'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';

const App  = ()=> {
  const [progress, setProgress] = useState(0)
  

    return (
      <Router>
          <div>
            <Navbar></Navbar>
            <LoadingBar
              height={2}
              color='#f11946'
              progress={progress}
            />
            <Switch>
            <Route exact path="/"><News  setProgress={setProgress}    key="general"  pageSize={6} country={'in'} category={'general'}></News   ></Route>
            <Route exact path="/business"><News  setProgress={setProgress}   key="business"  pageSize={6} country={'in'} category={'business'}></News  ></Route>
            <Route exact path="/entertainment"><News  setProgress={setProgress}   key="entertainment"  pageSize={6} country={'in'} category={'entertainment'}></News  ></Route>
            <Route exact path="/general"><News  setProgress={setProgress}    key="general"  pageSize={6} country={'in'} category={'general'}></News   ></Route>
            <Route exact path="/health"><News  setProgress={setProgress}   key="health"  pageSize={6} country={'in'} category={'health'}></News   ></Route>
            <Route exact path="/science"><News  setProgress={setProgress}   key="science"  pageSize={6} country={'in'} category={'science'}></News  ></Route>
            <Route exact path="/sports"><News  setProgress={setProgress}    key="sports"  pageSize={6} country={'in'} category={'sports'}></News  ></Route>
            <Route exact path="/technology"><News  setProgress={setProgress}   key="technology"  pageSize={6} country={'in'} category={'technology'}></News  ></Route>
          </Switch>
        </div>
      </Router>
      
    )
  
}

export default App;