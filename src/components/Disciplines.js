import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState([]);
  useEffect(() => {
    const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/disciplines`);
    request.then((response) => setDisciplines(response.data));
    request.catch(() => alert("Houve um erro ao buscar as disciplinas"));
  }, []);

  return (
    <ul>
      {disciplines?.map((discipline, index) => (
        <li key={index}>
          <Link to={`/discipline/${discipline.id}`} key={index}>
            {discipline.name} - {discipline.numberTests}
          </Link>
        </li>
      ))}
    </ul>
  );
}
