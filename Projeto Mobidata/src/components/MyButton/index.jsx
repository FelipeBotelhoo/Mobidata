import Button from 'react-bootstrap/Button';
export const MyButton = ({functionClicked,nameButton,color}) =>{
    return(
        
        <Button variant={color} onClick={functionClicked}>{nameButton}</Button>
    )
}