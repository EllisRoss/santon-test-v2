import React from "react";
import "./state/stores/ProductsStore";
import './index.scss';

import ProductList from "./components/productList";
import {AddProduct} from "./components/addProduct";

export class App extends React.Component {
    render() {
        return (
            <main>
                <h1>Frontend Test Task</h1>
                <AddProduct/>
                <ProductList/>
            </main>
        );
    }
}
