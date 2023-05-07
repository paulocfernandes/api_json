import { useState, useEffect, ChangeEvent } from 'react'
import { Post } from './types/Post';

function App() {

  const[posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const[addTitleText, setAddTitleText] = useState('');
  const[addBodyText, setAddBodyText] = useState ('');
 
  useEffect(() => {
   loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
    setLoading(true)
    let response =await fetch ('https://jsonplaceholder.typicode.com/posts')
    let json = await response.json();
    setLoading(false)
    setPosts(json);
   }  catch(e){
      setLoading(false)
     alert('Error!Tente mas tarte')
   }  
  }

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setAddTitleText(e.target.value);
  }

    const handleBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setAddBodyText(e.target.value)

  }

  const hadleAdd  = async ( ) => {

    if(addTitleText && addBodyText) {
      let response = await fetch ('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify ({
          title:addTitleText,
          body:addBodyText,
          userId: 1 
        }),
        headers: {
          'Content-Type ' : 'aplication/json'
        }
      });
      let json = await response.json();
      
      if(json.id){
        alert('Post adicionado com sucesso');
      }else {
        alert('Algo errado')
      }

    } else {
      alert('Preencha os dados!')
    }

  }

  return (
    <div >  
      {loading && posts.length > 0 &&
      <div>Carregando</div>
      } 

      <fieldset className='border-2 mb-3 mt-4 p-3'>
        
        <legend>Adicionar novo post</legend>
        <input value={addTitleText}
        onChange={handleTitle}
         type="text" 
         placeholder='Digite um título'
          className='block border' />
        
        <textarea 
        value={addBodyText}
       onChange={handleBody}
       className='block border'
         ></textarea>

        <button
        onClick={hadleAdd}
         className='block border'>
          Adicionar
          </button>
      
      </fieldset>

      
        {!loading && posts.length > 0 &&
        <>
        <div className='mr-1'>Total de Posts: {posts.length}</div>
        <div className='mr-1'>
          {posts.map((item, index) => (
            <div key={index} className='ml-4 mb-4'>
              <h4 className='font-bold'>{item.title}</h4>
            <small># {item.id} - Usuário: {item.userId}</small> 
            <p>{item.body}</p>
            </div>
          ))}
        </div>

        </>
}

    {!loading && posts.length === 0 && 
    <div>Não há posts para exibir  </div>
    
    } 
       

     
    </div>
  )
}

export default App
