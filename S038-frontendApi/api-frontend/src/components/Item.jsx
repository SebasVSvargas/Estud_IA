
import { useState } from "react";


function ListItem({ item }){

    return (
        <li className="list-group-item">
            <h5>{item.name}</h5>
            <p className="mb-1">{item.description}</p>
            <span className="badge bg-info">{item.status}</span>
        </li>
    )

}

export default ListItem;