import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <ul>
        {" "}
        <li><Link to="/professors">Listar por Professor</Link></li>
        <li><Link to="/disciplines">Listar por Disciplina</Link></li>
      </ul>
    </div>
  );
}
