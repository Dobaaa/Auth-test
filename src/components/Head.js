import "./Head.css";

export default function Head(props) {
  return (
    <div className="head">
      <h1>softa Task</h1>
      <h2>{props.title}</h2>
    </div>
  );
}
