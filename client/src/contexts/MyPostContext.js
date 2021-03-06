import React, { createContext, useState } from 'react'
export const MyPostContext = createContext()
const MyPostContextProvider = ({children}) => {
    const [myPosts,setMyPosts] = useState([])

    return (
        <MyPostContext.Provider value={{myPosts,setMyPosts}}>
            {children}
        </MyPostContext.Provider>
    )
}

export default MyPostContextProvider
