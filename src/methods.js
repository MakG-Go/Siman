export const getLiderboard = () =>{
    let liderbord = localStorage.getItem("liderbord")
    let liderItem = JSON.stringify(new Array())
  
  
    if(liderbord===null || liderbord===undefined || liderbord===NaN){
      localStorage.setItem("liderbord", liderItem)
  
      console.log(localStorage.getItem("liderbord"))
      return liderbord
    }
  
    return liderbord
  
  }