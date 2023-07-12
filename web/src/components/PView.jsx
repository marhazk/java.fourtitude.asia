import React, {Component} from 'react';
import ProductService from '../services/ProductService';
import Config from "../Config";

class PView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            product: {}
        }
    }

    componentDidMount() {
        ProductService.getProductById(this.state.id).then(res => {
            this.setState({product: res.data});
        });
    }

    editProduct(id) {
        this.props.history.push(Config.pForm + '/' + id);
    }

    backButton() {
        this.props.history.push(Config.pList);
    }

    render() {
        return (
            <div>
                <div>
                    <h3>View Product Details > {this.state.product.name}</h3>
                    <div>
                        <div className='frecord'>
                            <label>Id: </label>
                            <div>{this.state.product.id}</div>
                        </div>
                        <br></br>
                        <div className='frecord'>
                            <label>Code: </label>
                            <div>{this.state.product.code}</div>
                        </div>
                        <br></br>
                        <div className='frecord'>
                            <label>Name: </label>
                            <div>{this.state.product.name}</div>
                        </div>
                        <br></br>
                        <div className='frecord'>
                            <label>Type: </label>
                            <div>{this.state.product.type}</div>
                        </div>
                        <br></br>
                        <div className='frecord'>
                            <label>Brand: </label>
                            <div>{this.state.product.brand}</div>
                        </div>
                        <br></br>
                        <div className='frecord'>
                            <label>Category: </label>
                            <div>{this.state.product.category}</div>
                        </div>
                        <br></br>
                        <div className='frecord'>
                            <label>Description: </label>
                            <div>{this.state.product.description}</div>
                        </div>
                        <br></br>
                    </div>
                    <div className="center">
                        <button className="btn" onClick={() => this.editProduct(this.state.product.id)}
                                style={{marginLeft: "10px", marginBottom: "10px"}}>Edit this Product
                        </button>
                        <button className="btn" onClick={this.backButton.bind(this)}
                                style={{marginLeft: "10px", marginBottom: "10px"}}>Back to List
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PView;