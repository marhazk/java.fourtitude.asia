import React, {Component} from 'react';
import ProductService from '../services/ProductService';
import Config from "../Config";

class PForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            code: '',
            name: '',
            category: '',
            brand: '',
            type: '',
            description: ''
        }
        this.codeHandler = this.codeHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.catHandler = this.catHandler.bind(this);
        this.brandHandler = this.brandHandler.bind(this);
        this.typeHandler = this.typeHandler.bind(this);
        this.descHandler = this.descHandler.bind(this);
        this.onSaveUpdate = this.onSaveUpdate.bind(this);
    }

    componentDidMount() {
        if (this.state.id === Config.pNewParam) {
            ProductService.generateNewProduct().then((res) => {
                let product = res.data;
                this.setState({
                    code: product.code,
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    type: product.type,
                    description: product.description
                });
            });
        }
        else {
            ProductService.getProductById(this.state.id).then((res) => {
                let product = res.data;
                this.setState({
                    code: product.code,
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    type: product.type,
                    description: product.description
                });
            });
        }
    }
    onSaveUpdate = (e) => {
        e.preventDefault();
        let product = {
            code: this.state.code,
            name: this.state.name,
            category: this.state.category,
            brand: this.state.brand,
            type: this.state.type,
            description: this.state.description
        }
        if (
            this.state.code.trim() === '' ||
            this.state.name.trim() === '' ||
            this.state.category.trim() === ''
        ) {
            alert('Required * field cannot be empty');
            return;
        } else {
            if (this.state.id === Config.pNewParam) {
                ProductService.createProduct(product).then(res => {
                    this.props.history.push(Config.pList);
                });
            } else {
                ProductService.updateProduct(product, this.state.id).then(res => {
                    this.props.history.push(Config.pList);
                });
            }
        }
    }
    codeHandler = (event) => {
        this.setState({code: event.target.value});
    }
    nameHandler = (event) => {
        this.setState({name: event.target.value});
    }
    catHandler = (event) => {
        this.setState({category: event.target.value});
    }
    brandHandler = (event) => {
        this.setState({brand: event.target.value});
    }
    typeHandler = (event) => {
        this.setState({type: event.target.value});
    }
    descHandler = (event) => {
        this.setState({description: event.target.value});
    }

    cancel() {
        this.props.history.push(Config.pList);
    }

    getTitle() {
        if (this.state.id === Config.pNewParam) {
            return <h3>Add Product</h3>
        } else {
            return <h3>Update Product</h3>
        }
    }
    getInput() {
        if (this.state.id === Config.pNewParam) {
            return <div className="frecord"  style={{backgroundColor: "lightgray"}} >
                <label>Code (Auto-Generated) : </label>
                <input maxLength='4'
                       readOnly={true}
                       style={{backgroundColor: "lightgray"}}
                       placeholder='Code'
                       name='code'
                       className='form-control'
                       value={this.state.code}
                       onChange={this.codeHandler}
            />
            </div>
        } else {
            return <div className="frecord"  style={{backgroundColor: "lightgray"}} >
                <label>Code (Non-Editable) : </label>
                <input maxLength='4'
                       readOnly={true}
                       style={{backgroundColor: "lightgray"}}
                       placeholder='Code'
                       name='code'
                       className='form-control'
                       value={this.state.code}
                       onChange={this.codeHandler}
                />
            </div>
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div>
                            {
                                this.getTitle()
                            }
                            <div>
                                <form>
                                    {
                                        this.getInput()
                                    }
                                    <div className="frecord">
                                        <label>Name* : </label>
                                        <input placeholder='Name' name='name' className='form-control'
                                               value={this.state.name} onChange={this.nameHandler}/>
                                    </div>
                                    <div className="frecord">
                                        <label>Category* : </label>
                                        <input placeholder='Category' name='category' className='form-control'
                                               value={this.state.category} onChange={this.catHandler}/>
                                    </div>
                                    <div className="frecord">
                                        <label>Brand : </label>
                                        <input placeholder='Brand' name='brand' className='form-control'
                                               value={this.state.brand} onChange={this.brandHandler}/>
                                    </div>
                                    <div className="frecord">
                                        <label>Type : </label>
                                        <input placeholder='Type' name='type' className='form-control'
                                               value={this.state.type} onChange={this.typeHandler}/>
                                    </div>
                                    <div className="frecord">
                                        <label>Description : </label>
                                        <input placeholder='Description' name='description' className='form-control'
                                               value={this.state.description}
                                               onChange={this.descHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.onSaveUpdate}
                                            style={{marginTop: "10px"}}>Save
                                    </button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{marginLeft: "10px", marginTop: "10px"}}>Back to List
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PForm;