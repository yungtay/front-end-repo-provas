import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Professors() {
  const [professors, setProfessors] = useState();
  useEffect(() => {
    const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/professors`);
    request.then((response) => setProfessors(response.data));
    request.catch(() => alert("Houve um erro ao buscar os professores"));
  }, []);

  console.log(professors)

  return (
    <ul>
      {professors?.map((professor, index) => (
        <li key={index}>
          <Link to={`/professor/${professor.id}`} key={index}>
            {professor.name} - {professor.numberTests}
          </Link>
        </li>
      ))}
    </ul>
  );
}
