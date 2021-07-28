import React, {useState} from "react";
import "./add-product.scss";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Registry} from "../../state/common/store/registry";
import {ADD_PRODUCT} from "../../state/stores/ProductsStore";
import {withStore} from "../../state/withStore";

export const AddProduct = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setIsVisible(true)}>Add product</button>
            <AddProductFormWithStore isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
    );
}



const AddProductForm = (props) => {

    if (!props.isVisible) return null

    const onClose = () => {
        props.setIsVisible(false);
    }

    return (
        <Formik
            initialValues={{title: '', description: '', id: '', price: ''}}
            validate={values => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Required';
                }
                if (!values.description) {
                    errors.description = 'Required';
                }
                if (!values.id) {
                    errors.id = 'Required';
                }
                if (!values.price) {
                    errors.price = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    props.dispatch(ADD_PRODUCT, {product: values})
                    props.setIsVisible(false)
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <div className='addProduct'>
                        <div>Title
                            <Field name="title"/>
                            <ErrorMessage name="title" component="label"/>
                        </div>
                        <div>ID
                            <Field name="id"/>
                            <ErrorMessage name="id" component="label"/>
                        </div>
                        <div>Description
                            <Field name="description"/>
                            <ErrorMessage name="description" component="label"/>
                        </div>
                        <div>Price
                            <Field name="price"/>
                            <ErrorMessage name="price" component="label"/>
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting}>Add</button>
                        </div>
                        <div>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const AddProductFormWithStore = withStore("products", () => {})(AddProductForm);