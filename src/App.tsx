import { useState, useEffect, ChangeEvent } from 'react'
import { Post } from './types/Post';
import { PostForm } from './components/PostForm';
import { PostItem } from './components/PostItem';


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


      const handleAddPost = async (title: string, body:string) => {
        let response = await fetch ('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify ({title, body, userId: 1  }),
          headers: { 'Content-Type ': 'application/json'}
        });
        let json = await response.json();
        
        if(json.id) {
          alert("Post adicionado com sucesso");
        }else {
          alert("Algo errado")
        }
      }

  
  return (
    <div >  
      {loading && posts.length > 0 &&
      <div>Carregando</div>
      } 
        <PostForm onAdd={handleAddPost} />
        

      
        {!loading && posts.length > 0 &&
        <>
        <div className='mr-1'>Total de Posts: {posts.length}</div>
        <div className='mr-1'>
          {posts.map((item, index) => (
           < PostItem data={item} />
            
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
