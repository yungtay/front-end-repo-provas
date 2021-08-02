import axios from "axios";
import { useState, useEffect } from "react";

export default function AddTest() {
  const [semesters, setSemesters] = useState();
  const [categories, setCategories] = useState();
  const [disciplines, setDisciplines] = useState();
  const [professors, setProfessors] = useState();
  const [test, setTest] = useState();

  useEffect(() => {
    getSemesters(setSemesters);
    getCategories(setCategories);
    getDisciplines(setDisciplines);
  }, []);

  function submit(e) {
    e.preventDefault();
    for (const keys in test) {
      if (!test[keys]) {
        alert("É necessário preencher o campo");
        return;
      }
    }

    if (!validURL(test.pdf)) {
      alert("O link precisa ser válido");
      return;
    }

    const request = axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/tests`, test)
      .then(() => alert("A prova foi salva, obrigado !"))
      .catch(() => alert("Erro"));
  }

  return (
    <form onSubmit={submit}>
        <div>Semestre</div>
      <select onChange={(e) => setTest({ ...test, semester: e.target.value })}>
        <option value={""}></option>
        {semesters?.map((semester, index) => (
          <option key={index} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>
      <div>Tipo da prova</div>
      <select onChange={(e) => setTest({ ...test, category: e.target.value })}>
        <option value={""}></option>
        {categories?.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div>Disciplina</div>
      <select
        onChange={(e) => {
          setTest({ ...test, discipline: e.target.value });
          getProfessors(setProfessors, e.target.value);
        }}
      >
        <option value={""}></option>
        {disciplines?.map((discipline, index) => (
          <option key={index} value={discipline.id}>
            {discipline.name}
          </option>
        ))}
      </select>
      <div>Professor</div>
      <select
        onChange={(e) => {
          setTest({ ...test, professor: e.target.value });
        }}
      >
        <option value={""}></option>
        {professors?.map((professor, index) => (
          <option key={index} value={professor.professor.id}>
            {professor.professor.name}
          </option>
        ))}
      </select>
      <div>Insira aqui o pdf</div>
      <input
        type="text"
        onChange={(e) => {
          setTest({ ...test, pdf: e.target.value });
        }}
      />
      <button type="submit">Inserir Prova</button>
    </form>
  );
}

function getSemesters(setSemesters) {
  const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/semesters`);
  request.then((response) => {
    setSemesters(response.data);
  });
  request.catch(() => alert("Houve um erro ao buscar as informações"));
}

function getCategories(setCategories) {
  const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`);
  request.then((response) => {
    setCategories(response.data);
  });
  request.catch(() => alert("Houve um erro ao buscar as informações"));
}

function getDisciplines(setCategories) {
  const request = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/disciplines`
  );
  request.then((response) => {
    setCategories(response.data);
  });
  request.catch(() => alert("Houve um erro ao buscar as informações"));
}

function getProfessors(setProfessors, id) {
  const request = axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/disciplinesProfessors/${id}`
  );
  request.then((response) => {
    setProfessors(response.data);
  });
  request.catch(() => alert("Houve um erro ao buscar as informações"));
}

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + 
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
      "((\\d{1,3}\\.){3}\\d{1,3}))" + 
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
      "(\\?[;&a-z\\d%_.~+=-]*)?" + 
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); 
  return !!pattern.test(str);
}
