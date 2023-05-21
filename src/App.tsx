import { useState, useEffect } from 'react'
import { Post } from './types/Post';
import { PostForm } from './components/PostForm';
import { PostItem } from './components/PostItem';
import { api } from './api';


function App() {

  const[posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  
 
  useEffect(() => {
   loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
    setLoading(true)
    let json= await api.getAllPost()
    setLoading(false)
    setPosts(json);
   }  catch(e){
      setLoading(false)
     alert('Error!Tente mas tarte')
   }  
  }


      const handleAddPost = async (title: string, body:string) => {
        let json = await api.addNewPost(title, body, 1);
        
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
