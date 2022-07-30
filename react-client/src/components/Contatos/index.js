import React from "react";
import Item from "../Item";
import { gql, useQuery } from "@apollo/client";

const GET_CONTATOS = gql`
  query {
    contatos {
      id
      nome
      email 
      telefone
    }   
  }
`

function Contatos() {
  const { data, loading } = useQuery(GET_CONTATOS)

  if(loading) return <div className="contatos">Carregando...</div>

  return (
    <div className="contatos">
      {data.contatos.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
}

export default Contatos;