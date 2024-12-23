//this script is to make the image slider for the best seller section of the courses.html file
const courseColl = Array.from(document.querySelector('#course_container').children);

const previous = document.querySelector('#pre_btn');
const next = document.querySelector('#next_btn');

let z_Index = [];

for(let i =0; i<courseColl.length; i++){//loop to assign the z-index value to the collection of courses
  z_Index.push(i);
  courseColl[i].style.zIndex = `${z_Index[i]}`;
}

previous.addEventListener('click',e=>{//event listener for the previous btn
  let temp = z_Index[0];//storing the first value in a temporary variable
  for(let i=0; i<courseColl.length-1; i++){
    z_Index[i] = z_Index[i+1];//left shifting of the rest of the value
  }
  z_Index[courseColl.length-1] = temp;// last element should have the value of the previous first element stored in the temp variable
  for(let i =0; i<courseColl.length; i++){
    courseColl[i].style.zIndex = `${z_Index[i]}`;//assigning the new values to the 
  }
})

next.addEventListener('click',e=>{//event listener for the next button
  let temp = z_Index[courseColl.length-1];
  for(let i=courseColl.length-1; i>=1; i--){
    z_Index[i] = z_Index[i-1]//right shifting of the rest of the value
  }
  z_Index[0] = temp;
  for(let i =0; i<courseColl.length; i++){
    courseColl[i].style.zIndex = `${z_Index[i]}`;
  }
})

//this section is for the faq section of courses.html

const faqCont = document.getElementById('faq_container');
const faqArr = Array.from(faqCont.children);

faqArr.forEach((element)=>{
  element.addEventListener('click',(e)=>{
   
   if(e.target.tagName == 'IMG'){
    e.target.style.transform = 'rotate(90deg)';
    const faqAns = e.target.parentElement.parentElement.nextElementSibling
      if(faqAns.dataset.showing == 'false'){ 
       faqAns.style.height = 'auto';
       faqAns.style.padding = '8px';
       faqAns.dataset.showing = 'true';
      }else{
       faqAns.style.height = '0px';
       faqAns.style.padding = '0px';
       faqAns.dataset.showing = 'false';
       e.target.style.transform = 'rotate(0deg)';
      }
   }
  })
})