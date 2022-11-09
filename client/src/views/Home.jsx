import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPelis, deletePeli } from "../services/peli-services";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';



function Home() {
  const [pelis, setPelis] = useState([]);    
  const navigate = useNavigate();

  const getPelisFromService = async () => {
    try {
        const pelisFromService = await getAllPelis();
        setPelis(pelisFromService.data.pelis);
    } catch(err) {
        console.log("Error:", err)

    }
};

useEffect(() => {
  getPelisFromService();
}, []);

useEffect(() => {
  console.log("pelis", pelis)
}, [pelis]);


const delPelicula = async (id) => {
  try {
        const peliculaBorrada = await deletePeli(id);
        console.log("Pelicula Elminada", peliculaBorrada);
        setPelis(pelis.filter(peli=>peli._id !== id))
      
      

  } catch(err) {

  }
};

const goToForm = (id) => {
  navigate(`/update-peli/${id}`)
}

const redirectToAddPeliReview = id => navigate(`/agregar-review/${id}`)

  return (
    <div>
       <h1>PELICULAS ADICIONADAS</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NOMBRE DE LA PELICULA</th>
                        <th>PAIS</th>
                        <th>DIRECTOR</th>
                        <th>AÑO</th>
                        <th>RATING</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                          pelis?.map(peli => (
                            <tr key={peli._id}>
                                <td>{peli.name}</td>
                                <td>{peli.country}</td>
                                <td>{peli.director}</td>
                                <td>{peli.year}</td>
                                <td>{peli.avg ? parseFloat(peli.avg.toFixed(2)) : 0}</td>
                                <td>
                                    <Button variant="danger" className="action-btn" onClick={() => delPelicula(peli._id)} >Eliminar</Button>
                                    <Button variant="info" className="action-btn" onClick={() => goToForm(peli._id)} >Editar</Button>
                                    <Button variant="link" className="action-btn" onClick={() => redirectToAddPeliReview(peli._id)} >Agregar review</Button>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
    </div>
  )
}

export default Home