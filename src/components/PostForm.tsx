import { ChangeEvent, useState } from "react";


type Props = {
    onAdd: (title: string, body:string) => void
}

export const PostForm = ({ onAdd }: Props) => {
   

    const[addTitleText, setAddTitleText] = useState('');
    const[addBodyText, setAddBodyText] = useState('');
    
    const handleAddChange = (e: ChangeEvent<HTMLInputElement>) => {

        setAddTitleText(e.target.value)
    }

    const handleAddBodyChange =(e: ChangeEvent<HTMLTextAreaElement>) => {
        setAddBodyText(e.target.value)

    }

    const handleClick = () => {
        if(addBodyText&&addTitleText){
            onAdd(addBodyText,addTitleText);
            alert("Adcionado Post com sucesso")
        }else{
            alert("Preencha os campos")
        }

    }


    return (

        <fieldset className="border-2 mb-3 p-3">
       
        <legend> Adicionar novo Post </legend>
        <input type="text" value={addTitleText}
        onChange={handleAddChange} className="block border"
        placeholder="Digiteum titulo" />
        
        <textarea className="black border"
        value={addBodyText}
        onChange={handleAddBodyChange} >

        </textarea>

        <button className="block border" onClick={handleClick}> Adicionar </button>

        
        
        </fieldset>

    );

}