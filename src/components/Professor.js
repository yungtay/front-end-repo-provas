import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Professor() {
  const [tests, setTests] = useState();
  let [categories, setCategories] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const request = axios.get(`http://localhost:4000/tests/professor/${id}`);
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
    request.catch(() => alert("Houve um erro ao buscar os professores"));
  }, []);

  return (
    <div>
      {Object.keys(categories)?.map((category, index) => (
        <div key={index}>
          {category}
          {tests?.map((tests, index) => category === tests.category.name ? (
            <div key={index}>
              <a href={tests.pdf} key={index}>
                {tests.semester.name} - {tests.discipline.name}
              </a>
            </div>
          ): "")}
        </div>
      ))}
    </div>
  );
}
