export default function Stringshortner(inputString) {
    
   


    if (inputString.length <= 200) {
       
        return inputString;
    }

   
    const trimmedString = inputString.slice(0, 200) + "...";

    return trimmedString;
}