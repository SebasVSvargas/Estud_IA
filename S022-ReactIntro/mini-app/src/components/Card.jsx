import './Card.css'

function Card({ title, description, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Me gusta</button>
    </div>
  )
}

export default Card