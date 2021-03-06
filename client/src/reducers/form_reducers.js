import validate from "../utils/validator"

const formStateReducer = (state,action)=>{
    switch (action.type) {
        case "ON_BLUR":{
            const name = action.payload
            const newState =  {
                ...state,
                [name]:{
                    ...state[name],
                    isBlurred:true,
                }
            }
            return newState
        }
        case "ON_CHANGE":{
            const {name,value,file} = action.payload
            const {parameters} = state[name]
            let isFormValid = true
            const _isValid = name==="repeatPassword" ? (value === state.password.value) :validate(value,parameters);
            const newState = {
                ...state,
                [name]:{
                    ...state[name],
                    value:value,
                    isValid:_isValid
                }
            }
            if(name==="image"){
                newState[name].file = file
            }
            for (const key in newState) {
                if (newState.hasOwnProperty(key) && key!=="isValid") {
                       const element = newState[key]
                       const isValid = element.isValid
                       isFormValid = isValid && isFormValid            
                }
            }
            newState.isValid = isFormValid
            return newState
        }
        case "SET_MY_POST":{
            const {image,caption} = action.payload;
            const {value,file}= image
            const newState = {
                ...state,
                "image":{
                    ...state["image"],
                    file:file,
                    value:value,
                    isValid:true,
                    isBlurred:true
                },
                "caption":{
                    ...state["caption"],
                    isValid:true,
                    isBlurred:true,
                    value:caption

                },
                "isValid":true
            }
            return newState


        }
        default:
            return state;
    }
}

export default formStateReducer;