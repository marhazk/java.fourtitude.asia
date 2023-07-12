import React, { Component } from 'react';
import Config from "../Config";

class PFooter extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render() {
        return (
            <div>
                <footer className='footer'>
                    <span className='text-muted'><p class=" text-center">{Config.Disclaimer}</p></span>
                </footer>
            </div>
        );
    }
}

export default PFooter;