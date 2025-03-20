import { useEffect, useState } from "react";

// to ye apnne custom hook banaya hai darkMode ka ab isko muiltiple pages me use kr skte hai


export default function useDarkMode(){
    
    const [isDark , setIsDark] = useState(() => {
        return document.documentElement.classList.contains("dark") || localStorage.getItem("theme") == "dark"; // to apane idhae useState me ye kya hai ki jo bhi userne last theme select kr rakhi thi whi theme rhegi agar wo baad me hbi login krega to 
    })

    useEffect(() => {
        if(isDark){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }else{
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    },[isDark])

    return [isDark, setIsDark]; 

}

