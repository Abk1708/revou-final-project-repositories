import { Link } from "react-router-dom"


interface CardItemsProps {
    imageUrl:string;
    title:string;
    description:string;
    to:string
}


function CardItems ({imageUrl,title,description,to}:CardItemsProps) {
  return (
    <div className="flex-none w-64 mr-4 mt-5">
      <div className="card bg-white shadow-md rounded-md overflow-hidden h-full">
          <img
            className="w-full h-56 object-cover object-center"
            src={imageUrl}
            alt="Carousal Item"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-2 text-gray-600">{description}</p>
            <div className="mt-4">
            <Link
              to={to}
              className="bg-blue-500 rounded-lg px-5 py-2 hover:text-white font-semibold"
            >
              Order Our service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CardProps {
  items:CardItemsProps[]
}

function Card({items}:CardProps){
  return (
    <div className="flex flex-wrap">
      {items.map((item, index) => (
        <CardItems key={index} {...item} />
      ))}
    </div>
  )
}

export default Card