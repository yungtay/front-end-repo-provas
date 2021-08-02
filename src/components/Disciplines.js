import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState();
  let [periods, setPeriods] = useState({});
  useEffect(() => {
    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/disciplines`
    );
    request.then((response) => {
      setDisciplines(response.data);
      response.data.forEach((discipline) => {
        const period = discipline["period"]["name"];
        if (!periods[period]) {
          periods = { ...periods, [period]: true };
          setPeriods(periods);
        }
      });
    });
    request.catch(() => alert("Houve um erro ao buscar as disciplinas"));
  }, []);

  return (
    <div>
      {Object.keys(periods).map((period, index) => (
        <ul key={index}>
          {period}
          {disciplines?.map((discipline, index) =>
            discipline.period.name === period ? (
              <li key={index}>
                {discipline.numberTests ? (
                  <Link to={`/discipline/${discipline.id}`} key={index}>
                    {discipline.name} - {discipline.numberTests}
                  </Link>
                ) : (
                  <div key={index}>
                    {discipline.name} - {discipline.numberTests}
                  </div>
                )}
              </li>
            ) : (
              ""
            )
          )}
        </ul>
      ))}
    </div>
  );
}
