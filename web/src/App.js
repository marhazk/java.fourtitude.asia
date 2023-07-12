import './App.css';
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route} from "react-router-dom";
import Config from "./Config";

//Import all the components
import PForm from './components/PForm';
import PFooter from './components/PFooter';
import PHeader from './components/PHeader';
import PList from './components/PList'
import PView from './components/PView';
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  width: 90%;
  margin: 0 auto;
`;

const Text = styled.p`
  font-size: 16px;
  color: #333;
`;

function App() {
    return (
        <Wrapper>
            <div>
                <Router>
                    <PHeader/>
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={PList}></Route>
                            <Route path={Config.pList} component={PList}></Route>
                            <Route path={Config.pForm + "/:id"} component={PForm}></Route>
                            <Route path={Config.pView + "/:id"} component={PView}></Route>
                            <PList/>
                        </Switch>
                    </div>

                    <PFooter/>
                </Router>
            </div>
        </Wrapper>
    );
}

export default App;
