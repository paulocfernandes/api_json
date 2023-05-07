import { useState, useEffect } from 'react'
import { Post } from './types/Post';

function App() {

  const[posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
 
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

  return (
    <div >  
      {loading && posts.length > 0 &&
      <div>Carregando</div>
      } 

      
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
