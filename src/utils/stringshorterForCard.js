export default function Stringshortner(inputString) {
    
   


    if (inputString.length <= 60) {
       
        return inputString;
    }

   
    const trimmedString = inputString.slice(0, 60) + "...";

    return trimmedString;
}