import React, {Component} from 'react';
import ProductService from '../services/ProductService';
import ReactPaginate from 'react-paginate';
import Config from "../Config";

class PList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            firstID: -1,
            lastID: -1,
            currentPage: 0,
            totalPages: 0,
            pageSize: 5
        };
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.viewProduct = this.viewProduct.bind(this);
    }

    componentDidMount() {
        ProductService.getFirstProduct().then((res) => {
            let productFirst = res.data;
            this.setState({
                firstID: productFirst.id
            });
        });

        ProductService.getLastProduct().then((res) => {
            let productLast = res.data;
            this.setState({
                lastID: productLast.id
            });
        });
        this.fetchProducts(this.state.currentPage, this.state.pageSize);
    }

    fetchProducts(page, pageSize) {
        ProductService.getProductPageable(page, pageSize)
            .then((response) => {
                const {content, totalPages} = response.data;
                this.setState({product: content, totalPages});
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }

    handlePageChange = (selectedPage) => {
        this.fetchProducts(selectedPage.selected, this.state.pageSize);
        this.setState({currentPage: selectedPage.selected});
    };

    addProduct() {
        this.props.history.push(Config.pForm+"/"+Config.pNewParam);
    }

    editProduct(id) {
        this.props.history.push(Config.pForm+'/'+id);
    }

    deleteProduct(product) {
        if (window.confirm("Are you sure want to remove "+product.name+" (Product Code: "+product.code+")?\nPress OK to continue or Cancel.") === true)
        {
            ProductService.deleteProduct(product.id).then((res) => {
                this.setState({product: this.state.product.filter((_product) => _product.id !== product.id)});
            });
            alert(product.name + " (Product Code: "+product.code+") has successfully deleted.");
        }
    }

    viewProduct(id) {
        this.props.history.push(Config.pView+'/'+id);
    }

    render() {
        const {product, totalPages} = this.state;
        return (

            <div>
                <h2 className="text-center">Product List</h2>
                <div className="left">
                    <button className="btn" onClick={this.addProduct}>
                        Add Product
                    </button>

                    <button onClick={() => this.viewProduct(this.state.firstID)}
                            className="btn">
                        View First Product
                    </button>

                    <button onClick={() => this.viewProduct(this.state.lastID)}
                            className="btn">
                        View Last Product
                    </button>

                </div>
                <br></br>
                <div className="row">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>CODE</th>
                            <th>PRODUCT NAME</th>
                            <th>BRAND</th>
                            <th>TYPE</th>
                            <th>CATEGORY</th>
                            <th>DESCRIPTION</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {product.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.type}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button style={{marginLeft: '10px'}} onClick={() => this.editProduct(product.id)}
                                            className="btn">
                                        Edit
                                    </button>
                                    <button style={{marginLeft: '10px'}} onClick={() => this.deleteProduct(product)}
                                            className="btn">
                                        Delete
                                    </button>
                                    <button style={{marginLeft: '10px'}} onClick={() => this.viewProduct(product.id)}
                                            className="btn">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination-container">
                    <ReactPaginate
                        firstLabel={'First'}
                        lastLabel={'Last'}
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );
    }
}

export default PList;