import React, { useEffect } from 'react'

const Totopbtn = () => {
  useEffect(()=>{
    const a= (e)=>{
     
      let k=document.getElementById("totop");

      if(window.scrollY >= 90){
        
        k.classList.remove("hiddenbtn");
        
      }
      else{
        
        k.classList.add("hiddenbtn");
      }
    }
    window.addEventListener("scroll",a)


    return ()=>{
      window.removeEventListener("scroll",a)

    }
  },[])
  return (
    <div className="totopbtn hiddenbtn" id="totop" onClick={()=>{window.scrollTo(0, 0)}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      viewBox="0 0 630 700"
    >
      <path
        fill="currentColor"
        d="M0 352L311 41l311 311l-66 65l-245-245L65 417z"
      />
    </svg>
  </div>
  )
}

export default Totopbtn