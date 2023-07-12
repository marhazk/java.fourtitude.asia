import React, { Component } from 'react';
import Config from "../Config";
class PHeader extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render() {
        return (
            <div>
                <header>
                    <div><h1><a href={Config.HomePath} className="navbar-brand">{Config.Title}</a></h1></div>
                </header>
            </div>
        );
    }
}

export default PHeader;