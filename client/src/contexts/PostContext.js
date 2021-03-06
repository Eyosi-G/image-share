import React, { createContext, useEffect, useState } from 'react'
import { baseUrl } from '../utils/server'
export const PostContext = createContext()
const PostContextProvider = ({children}) => {
    const [posts, setPosts] = useState([])
    
    
    return (
        <PostContext.Provider value={{posts,setPosts}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
