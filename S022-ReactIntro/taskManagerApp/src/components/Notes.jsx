import { useState } from "react";
import {faker} from '@faker-js/faker'
import TextNote from "./textNote";
//Componente para añadir notas al final

function Notes() {

    //Estos son los denominados "estados" del componente, que son variables que pueden cambiar a lo largo del tiempo y que al cambiar, hacen que el componente se vuelva a renderizar
    //Los hooks son funciones especiales que permiten usar el estado y otras características de React en componentes funcionales
    //useState es el hook más común, que permite agregar estado a un componente funcional. Devuelve un par de valores: el estado actual y una función para actualizarlo.
    const [notes, setNotes] = useState([])
    const [text, setText] = useState('')
    const [id, setId] = useState(0)

    const generarNota = () =>{
        const notaFalsa = `${faker.person.fullName()}: ${faker.lorem.sentence()}`
        setText(notaFalsa)
    }

    //agregar nota con id incremental, y el texto de la nota
    const agregarNota = () =>{
        setNotes([...notes,{id: id, text: text}])
        setId(id+1)
    }

    return (
        <>
            <div className="notes">
                <h2>Notas</h2>
                <textarea id="area-texto" 
                    type="text"          
                    value={text}      
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe una nota..."/>
            </div>  
                <button onClick={generarNota}>Nota fake</button>
                <button onClick={agregarNota}>Agregar Nota</button>

            <div className="notes-grid">
                {
                    notes.map((note) => (
                        <TextNote key={note.id} text={note.text}/>
                    ))
                }
            </div>
        </>
    );
}

export default Notes;