import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { addCommentToPeli } from '../services/peli-services';
import { useNavigate } from "react-router-dom";

const CommentForm = () => {
    const navigate = useNavigate();
    const [comment, setComment] = useState({
        review: '',
        rating: 0
    })
    const { id } = useParams();
    
    const commentSchema = Yup.object().shape({
        review: Yup.string()
            .min(3, "La review no debe tener menos de 3 caracteres")
            .required("Este campo es obligatorio"),

        rating: Yup.number()
            .required("Este campo es obligatorio")
            .max(5, "No puede tener más de 5 estrellas")
            .min(0, "No puede tener menos de 0 estrellas"),

    });

    const addComment = async (values) => {
        try {
            console.log("Values", values)
            const updatedPeli = await addCommentToPeli(id, values)
            console.log("Peli Actualizada", updatedPeli)
            navigate('/home')

        } catch(err) {
            console.log("Error", err)
            
        }
    }

    return (
        <div className="card">
            <Formik
                enableReinitialize
                initialValues={comment}
                validationSchema={commentSchema}
                onSubmit={(values) => addComment(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor='review'>Agrega tu review</label>
                            <Field type='text' name='review' />
                            {errors.review && touched.review ? <p>{errors.review}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='rating'>Rating </label>
                            <Field type='text' name='rating' as="select">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Field>
                            {errors.origin && touched.origin ? <p>{errors.origin}</p> : null}
                        </div>                        
                        <div>
                            <button type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0} >Agregar</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default CommentForm;