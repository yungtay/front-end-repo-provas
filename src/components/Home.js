import { Link } from "react-router-dom";

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
