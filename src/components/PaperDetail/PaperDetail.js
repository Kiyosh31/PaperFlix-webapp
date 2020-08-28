import React from "react";
import "./PaperDetail.css";

const PaperDetail = (props) => {
  return (
    <div>
      PDF DESCRIPCION AUTOR AÑO DE PUBLICACION IDIOMA NUMERO DE PAGINAS
      RECOMENDADO DESCRIPCION MAS TITULOS SIMILARES
      {props.paper.id_paper}
      {props.paper.title}
    </div>
  );
};

export default PaperDetail;
