export const VALIDATE_EMAIL = "validate_email"
export const VALIDATE_USER_NAME = "validate_user_name"
export const VALIDATE_PASSWORD = "validate_password"
export const VALIDATE_IMAGE = "validate_image"
export const VALIDATE_CAPTION = "validate_caption"

const validate = (inputText,parameters)=>{
    let isValid = true;
    for (const parameter of parameters) {
        switch (parameter) {
            case VALIDATE_EMAIL:
                isValid = validateEmail(inputText) && isValid
                break;
            case VALIDATE_PASSWORD:
                isValid = validatePassword(inputText) && isValid
                break
            case VALIDATE_USER_NAME:
                isValid = validateUserName(inputText) && isValid
                break
            case VALIDATE_IMAGE:
                isValid = validateImage(inputText) && isValid
                break
            case VALIDATE_CAPTION:
                isValid = validateCaption(inputText) && isValid

        }
    }

    return isValid;

}

const validateEmail = (inputText)=>{
    const regex = /^\w*@(gmail|yahoo|microsoft).com$/i
    return regex.test(inputText)
}
const validatePassword = (inputText)=>{
    const regex = /[a-zA-Z]{8,}/i
    return regex.test(inputText)
}
const validateUserName = (inputText)=>{
    const regex = /^[A-Za-z]{5,20}$/
    return regex.test(inputText)
}
const validateImage = (inputPath)=>{
    const validExtensions = ['jpg','jpeg','png']
    if(inputPath){
        const splittedInputPath = inputPath.split('\\')
        const fileName = splittedInputPath[splittedInputPath.length-1]
        const splittedfileName = fileName.split('.')
        const fileExtension = splittedfileName[splittedfileName.length-1]
        const lowerCaseFileExtension = fileExtension.toLowerCase()
        return validExtensions.includes(lowerCaseFileExtension)
        
    }
    return false
}
const validateCaption = (inputText)=>{
    return inputText.length <= 50
}
export default validate