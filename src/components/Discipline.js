import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Discipline() {
  const [tests, setTests] = useState();
  let [categories, setCategories] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/tests/discipline/${id}`);
    request.then((response) => {
      setTests(response.data);
      response.data.forEach((test) => {
        const category = test["category"]["name"];
        if (!categories[category]) {
          categories = { ...categories, [category]: true };
          setCategories(categories);
        }
      });
    });
    request.catch(() => alert("Houve um erro ao buscar as disciplinas"));
  }, []);

  return (
    <div>
      {!Object.keys(categories) ? "" : Object.keys(categories)?.map((category, index) => (
        <div key={index}>
          {category}
          {tests?.map((tests, index) => category === tests.category.name ? (
            <div key={index}>
              <a href={tests.pdf} key={index}>
                {tests.semester.name} - {tests.professor.name}
              </a>
            </div>
          ): "")}
        </div>
      ))}
    </div>
  );
}