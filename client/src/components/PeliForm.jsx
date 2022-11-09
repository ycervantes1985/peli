import React, { useState, useEffect } from "react";
import moment from 'moment';
import { createPeli, getPeli, updatePeli } from "../services/peli-services";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function PeliForm() {

    const [peli, setPeli] = useState({
        name: '',
        country: '',
        director: '',
        year: '',
        
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const getOnePeli = async () => {
        try {
            const peliFromService = await getPeli(id);
            setPeli({ ...peliFromService.data.peli});
        } catch(err) {
            console.log("Errorr", err);
        }
    }

    useEffect(() => {
        console.log("Peli", peli)
        id && getOnePeli();
    }, [id])

    useEffect(() => {
        console.log("Peli", peli)

    }, [peli])

    const addPeli = async (values) => {
        try {
            const createPeliInService = !id ? await createPeli(values) : await updatePeli(id, values);
            alert(createPeliInService.data.message)
            navigate('/home')
            return createPeliInService;
        } catch(err) {
            console.log("Error", err);
        }
    }

    const peliSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "El nombre de la pelicula no puede tener menos de 2 caracteres")
            .required("Este campo es obligatorio"),

        country: Yup.string()
            .required("Este campo es obligatorio"),

        director: Yup.string()
            .max(20, "El nombre del director no puede superar los 20 caracteres")
            .required("Este campo es obligatorio"),

        year: Yup.number()
            .required("Este campo es obligatorio")

         });



  return (
    <div className="card">
            <Formik
                enableReinitialize
                initialValues={peli}
                validationSchema={peliSchema}
                onSubmit={(values) => addPeli(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor='name'>Nombre de la pelicula </label>
                            <Field type='text' name='name' />
                            {errors.name && touched.name ? <p>{errors.name}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='country'>Pais </label>
                            <Field type='text' name='country' />
                            {errors.country && touched.country ? <p>{errors.country}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='director'>Director </label>
                            <Field type='text' name='director' />
                            {errors.director && touched.director ? <p>{errors.director}</p> : null}
                        </div>


                        <div>
                            <label htmlFor='year'>Año</label>
                            <Field type='number' name='year' />
                            {errors.year && touched.year ? <p>{errors.year}</p> : null}
                        </div>


                        <div>
                            <button type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Agregar</button>
                        </div>


                    </Form>
                )}

            </Formik>
        </div>
  )
}

export default PeliForm