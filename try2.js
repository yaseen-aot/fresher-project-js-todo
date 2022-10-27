let form = document.getElementById("form")
let titleInput = document.getElementById("titleinput")
let descInput = document.getElementById("descinput")
let dateInput = document.getElementById("dateinput")
let allTasks = document.getElementById("activecol")
let deletebtn = document.getElementById("dltbtn")
let countAll = document.getElementById("countall")
let CountCompleted = document.getElementById("countcompleted")
let CountActive = document.getElementById("countactive")
let completeCol = document.getElementById("completeCol")
let value
let iedit
let indexcb
let output
let fiindex
let fiarray = []
let arr = []

getlocal()
// dategetlocal()

//addeventlistener for modal button to add task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});


//checking title is empty
function formValidation() {
  if (titleInput.value === "" ) {
    console.log("failure");
    alert("sorry :) please enter a title") 
  } else {
    console.log("success"); 
    dataStore()
  } 
};

 //creating array and objects
let todoobj = {};
var arrlength = arr.length


function setlocal(){
  localStorage.setItem("arr", JSON.stringify(arr)) 
}
function getlocal(){
   arr = JSON.parse(localStorage.getItem("arr")) || []
 }
displaytask()
displayComplete()


//pushing object into array and declaring keys to objects
function dataStore(){
 todoobj = {
            titleobj : titleInput.value ,
            descobj : descInput.value ,
            dateobj :  dateInput.value ,
            ischeck : false     
     }
    
    arr.push(todoobj)  
    console.log(arr)
    displaytask()
    resetinput()
    countfunc()
    // dateclosest()
    //  datefunc()
    setlocal()
    // datesetlocal()
   
}
//displaying active tasks 
function displaytask(){

    // let activeRow  = document.querySelectorAll(".activerow")
    // console.log(activeRow)
    
    let activeCol  = document.querySelector(".activecolumn")
    activeCol.innerHTML = ""

    for(i= 0 ; i < arr.length; i++) {
      if(arr[i].ischeck == false){
        console.log(arr[i].ischeck)

allTasks.innerHTML +=  `    <div class="activerow my-3" id="rowdiv">
<div class="todoactive d-flex justify-content-between" >
    <span class="todoactiveone  d-flex gap-3 ">
          <input class="form-check-input rounded-circle check" onclick = "checkTask(this.id);displayComplete();displaytask()" id= "${i}" style="width: 40px; height : 40px" type="checkbox">
              <p class="titleactive mt-1" id = "titletodo">${arr[i].titleobj}<p>
              <img class="mt-1" src="/yellow.png" alt="">
     </span>
    </div>
      
    <div class="todoactivefour d-flex justify-content-between px-4 ">

        <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
            <img src="/blackcalender.png" style="height: 20px;" alt="">
            <p class="dateclass " id="thedate">${"By" +" " + arr[i].dateobj}</p>
        </span>

        <span class= "todoactivetwo mb-3  ">
        <button   class = "btntodo border-0"><i data-bs-toggle="modal" data-bs-target="#edit"   class="bi bi-pencil-fill border border-0 bg-light pe-3" onclick = "editinputvalue(${i})"></i></button>
        <button  id="${i}" onclick = "buttoncall(this.id)"  class = "btntodo border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
      </span>
    
</div>
</div>  `
      }
      
}
}



//checking the checkbox is true or false 
function checkTask(indexcb){
    chkbox = document.getElementById(indexcb) 
    arr[indexcb].ischeck = chkbox.checked
    console.log(arr)
    countfunc()
    setlocal()
  }
  
  //if checkbox is true,active task to completed tasks
  function displayComplete(){
  
    document.querySelector(".completecolumn").innerHTML = ""
  
    for(i= 0 ; i < arr.length; i++) {
      if(arr[i].ischeck == true){
  
     
        console.log(arr[i].ischeck)
        
        document.querySelector(".completecolumn").innerHTML +=  `<div class="activerow my-3" id="rowdiv">
  <div class="todoactive d-flex justify-content-between" >
    <span class="todoactiveone  d-flex gap-3 ">
          <input class="form-check-input rounded-circle check" onclick = "checkTask(this.id);displayComplete();displaytask()" id= "${i}" style="width: 40px; height : 40px" type="checkbox" checked>
              <p class="titleactive mt-1" id = "titletodo">${arr[i].titleobj}<p>
              <img class="mt-1" src="/green.png" alt="">
     </span>
    </div>
      
    <div class="todoactivefour d-flex justify-content-between px-4 ">
  
        <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
            <img src="/blackcalender.png" style="height: 20px;" alt="">
            <p class="dateclass " id="thedate">${"By" +" " +arr[i].dateobj}</p>
        </span>
  
      <span class= "todoactivetwo mb-3  ">
        <button  onclick = "editinputvalue(${i})"  class = "btntodo border-0"><i data-bs-toggle="modal" data-bs-target="#edit"   class="bi bi-pencil-fill border border-0 bg-light pe-3" onclick = "editinputvalue(${i})"></i></button>
        <button  id="${i}" onclick = "buttoncall(this.id)"   class = "btntodo border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
      </span>
    
      
   
  </div>
  </div>
  
  `
      }
    }
  }

function buttoncall(x) {
    value = x;
}


//resetting input in addtask form after inputting
function resetinput() {
    titleInput.value = ""
    descInput.value = ""
    dateInput.value = ""  
}
//delete operation
function deleteTask(){
    arr.splice(value,1)
    displaytask()
    displayComplete()
    countfunc()
    console.log("delete opereation" )
    console.log(arr)
    setlocal()  
 }
 function editinputvalue(index){
    console.log(index)
    iedit = index;
    document.getElementById("titleinputupdate").value = arr[index].titleobj
    document.getElementById("descinputupdate").innerText = arr[index].descobj
    document.getElementById("dateinputupdate").value = arr[index].dateobj
 }

 //edit operation on tasks
function editTask(){
    console.log("working edit2")
    if( !document.getElementById("titleinputupdate").value )
    {
        alert("Sorry:)please enter a title")
    }
    else{
        arr[iedit].titleobj = document.getElementById("titleinputupdate").value
        arr[iedit].descobj = document.getElementById("descinputupdate").innerText
        arr[iedit].dateobj = document.getElementById("dateinputupdate").value
        displaytask()
        displayComplete()
        console.log("edited")
        setlocal()
}  
}

//sorting with title value
function sortTitle(){
  arr.sort(function(a,b){
    if (a.titleobj.toLowerCase() < b.titleobj.toLowerCase())return -1;
    if (a.titleobj.toLowerCase() > b.titleobj.toLowerCase())return 1;
      return 0;
      
    
  }
  );
 document.querySelector("#activecol").innerHTML = ""
  displaytask();
  displayComplete()
  setlocal()

}

//sort with date values
function sortDate(){
  arr.sort(function(a,b){
    const dateA = new Date(a.dateobj)
    const dateB = new Date(b.dateobj)
    if (dateA < dateB)return -1;
    if (dateA > dateB)return 1;
      return 0;
    
  }
  );
 document.querySelector("#activecol").innerHTML = ""
  displaytask();
  displayComplete()
  setlocal()
}


//displaying active task only
function ActiveTasks(){
  document.getElementById("completecol").style.display = "none"
  document.getElementById("completepara").style.display = "none"
  document.getElementById("activecol").style.display = "block"
  document.getElementById("activepara").style.display = "block"

}
//displaying completed tasks only
function CompleteTasks(){
  document.getElementById("activecol").style.display = "none"
  document.getElementById("activepara").style.display = "none"
  document.getElementById("completecol").style.display = "block"
  document.getElementById("completepara").style.display = "block"

}
//displaying all tasks 
function visibleTasks (){
  document.getElementById("activecol").style.display = "block"
  document.getElementById("activepara").style.display = "block"
  document.getElementById("completecol").style.display = "block"
  document.getElementById("completepara").style.display = "block"

}

//deleting all completed tasks
function clearCompleted(){
  
   for( k=0 ; k<arr.length; k++){ 
    if(arr[k].ischeck == true){
      
      arr.splice(k,1)
      k--
      // console.log("control inside")
      
    }
  }
  displaytask()
  displayComplete()
  countfunc()
  setlocal()



}



function countfunc(){
    countAll.innerText = 0
    CountActive.innerText = 0
    CountCompleted.innerText = 0
  for( i=0 ; i<arr.length; i++){
    countAll.innerText++
    if(arr[i].ischeck == true){
        CountCompleted.innerText++
    }
    if(arr[i].ischeck == false){
        CountActive.innerText++
    }
}
}


function searching(){
    let searchBox = document.getElementById("searchbox").value
    console.log(searchBox)

    output = arr.filter(function(e,index) {
        fiindex = (e.titleobj.toLowerCase().includes(searchBox))
        if(fiindex){
            fiarray.push(index)
        }
       })
        
    //    document.querySelector('#duplicater').innerHTML = ""
    //    document.querySelector('#completed').innerHTML = ""
        document.querySelector(".activecolumn").innerHTML = ""
        document.querySelector(".completecolumn").innerHTML = ""
        for(i=0;i<fiarray.length;i++){
        searchdisplaytask()
        searchdisplayComplete()

    }
    fiarray = []
            
}

function searchdisplaytask(){

    // let activeRow  = document.querySelectorAll(".activerow")
    // console.log(activeRow)
    
    let activeCol  = document.querySelector(".activecolumn")
    activeCol.innerHTML = ""

    for(i= 0 ; i < fiarray.length; i++) {
      if(arr[fiarray[i]].ischeck == false){
        console.log(arr[i].ischeck)

allTasks.innerHTML +=  `    <div class="activerow my-3" id="rowdiv">
<div class="todoactive d-flex justify-content-between" >
    <span class="todoactiveone  d-flex gap-3 ">
          <input class="form-check-input rounded-circle check" onclick = "checkTask(this.id);displayComplete();displaytask()" id= "${fiarray[i]}" style="width: 40px; height : 40px" type="checkbox">
              <p class="titleactive mt-1" id = "titletodo">${arr[fiarray[i]].titleobj}<p>
              <img class="mt-1" src="/yellow.png" alt="">
     </span>
    </div>
      
    <div class="todoactivefour d-flex justify-content-between px-4 ">

        <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
            <img src="/blackcalender.png" style="height: 20px;" alt="">
            <p class="dateclass " id="thedate">${"By" +" " + arr[fiarray[i]].dateobj}</p>
        </span>

        <span class= "todoactivetwo mb-3  ">
        <button   class = "btntodo border-0"><i data-bs-toggle="modal" data-bs-target="#edit"   class="bi bi-pencil-fill border border-0 bg-light pe-3" onclick = "editinputvalue(${fiarray[i]})"></i></button>
        <button  id="${fiarray[i]}" onclick = "buttoncall(this.id)"  class = "btntodo border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
      </span>
    
</div>
</div>  `
      }
      
}
}



function searchdisplayComplete()
{
    for(i=0;i<fiarray.length;i++){
    if(arr[fiarray[i]].ischeck == true){
        document.querySelector(".completecolumn").innerHTML =  `<div class="activerow my-3" id="rowdiv">
        <div class="todoactive d-flex justify-content-between" >
          <span class="todoactiveone  d-flex gap-3 ">
                <input class="form-check-input rounded-circle check" onclick = "checkTask(this.id);displayComplete();displaytask()" id= "${fiarray[i]}"  style="width: 40px; height : 40px" type="checkbox" checked>
                    <p class="titleactive mt-1" id = "titletodo">${arr[fiarray[i]].titleobj}<p>
                    <img class="mt-1" src="/green.png" alt="">
           </span>
          </div>
            
          <div class="todoactivefour d-flex justify-content-between px-4 ">
        
              <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
                  <img src="/blackcalender.png" style="height: 20px;" alt="">
                  <p class="dateclass " id="thedate">${"By" +" " + arr[fiarray[i]].dateobj}</p>
              </span>
        
            <span class= "todoactivetwo mb-3  ">
              <button  onclick = "editinputvalue(${fiarray[i]})"  class = "btntodo border-0"><i data-bs-toggle="modal" data-bs-target="#edit"   class="bi bi-pencil-fill border border-0 bg-light pe-3" onclick = "editinputvalue(${i})"></i></button>
              <button  id="${i}" onclick = "buttoncall(${fiarray[i]})"   class = "btntodo border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
            </span>
          
            
         
        </div>
        </div>
        
        `
    }
    }
}


//search
// function searchValue(){
//   let searchBox = document.getElementById("searchbox").value
//   // console.log(searchBox)
//   var result = null;
// for (var i = 0; i < arr.length; i++) { 
//   if (arr[i].titleobj === searchBox) { 
//     result = `<div class="activerow my-3" id="rowdiv">
//     <div class="todoactive d-flex justify-content-between" >
//         <span class="todoactiveone  d-flex gap-3 ">
//               <input class="form-check-input rounded-circle check" onclick = "checkTask(${i});displayComplete();displaytask();completeValue()" id= "checkid${i}" style="width: 40px; height : 40px" type="checkbox">
//                   <p class="titleactive mt-1" id = "titletodo">${arr[i].titleobj}<p>
//                   <img class="mt-2" src="/yellow.png" alt="">
//          </span>
//         </div>
          
//         <div class="todoactivefour d-flex justify-content-between px-4 ">
    
//             <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
//                 <img src="/blackcalender.png" style="height: 20px;" alt="">
//                 <p class="dateclass " id="thedate">${arr[i].dateobj}</p>
//             </span>
    
//           <span class= "todoactivetwo mb-3  ">
//             <button id="editbtn"  class = "border-0"><i data-bs-toggle="modal" data-bs-target="#edit${i}"   class="bi bi-pencil-fill border border-0 bg-light pe-3"></i></button>
//             <button  id="dltbtn"  class = "border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete${i}"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
//           </span>
        
          
       
//     </div>
//     </div>`;
//     displayComplete()
    
    
//     console.log(result)
//     allTasks.innerHTML = result
//     break;
    
//   } 
//   else{
//     alert("element not found")
//   }
// }

// }



// let rowDiv = document.getElementById('rowdiv');
// let titletodo = document.getElementById('titletodo');
// let theDate =  document.getElementById('theDate');
// let addTask = document.getElementById('addtask');
// let adddesc  = document.getElementById('thedesc');
// var date =  document.getElementById("theDate")

// var arr = []
// var arrlength = arr.length


// if(arr.length == 0) 
//     {
//         for(var i = 0 ; i <= arrlength ; i++ )
//         {
//        let rowd = document.querySelector('#rowdiv');
//         // rowd.style.display = "none"
        
//         }
        
//     }










//     addTask.addEventListener("click", addTaskpress);

//     function addTaskpress(){
//         arraypush()
//     }

//     // function taskEnter(){


        
//     // }

//     function arraypush(){
//         let titletodo = document.getElementById('titletodo').value;
//         let theDate =  document.getElementById('theDate').value;
//         let adddesc  = document.getElementById('thedesc').value;
        
        
//         var todoobj = {
//             titleobj : titletodo ,
//             descobj : adddesc ,
//             dateobj : theDate 
//         }
//         arr.push(todoobj)
//         console.log(todoobj)
        
        



//     }
    

        
    //     if(titletodo.value.length == 0)
    // {
    //     alert("empty")
    //     return 
    // }



    // arrlength = arr.length
    // for(var i = 0; i <= arrlength; i++)
    // {
    

    // }

    
    // var todoActive = document.createElement('div')
    // todoActive.classList.add("todoactive")
    // rowDiv.appendChild(todoActive)

    // var todoActiveThird = document.createElement('div')
    // todoActiveThird.classList.add("todoactiveThird")
    // todoActive.appendChild(todoActiveThird)

    // var todoActiveFirst = document.createElement('div')
    // todoActiveFirst.classList.add("todoactivefirst")
    // todoActiveThird.appendChild(todoActiveFirst)

    // var checkActive = document.createElement('input')
    // checkActive.setAttribute("type", "checkbox");
    // checkActive.classList.add("checkbox-round")
    // todoActiveFirst.appendChild(checkActive)


    // var paragraphTitle = document.createElement('p')
    // paragraphTitle.innerText = titletodo.value;
    // paragraphTitle.classList.add("titlepara")
    // todoActiveFirst.appendChild(paragraphTitle);

    // var yellowDot = document.createElement('IMG')
    // yellowDot.setAttribute("src", "yellow.png");
    // yellowDot.classList.add("yellowdot")
    // todoActiveFirst.appendChild(yellowDot)

    // var todoActiveSecond = document.createElement('div')
    // todoActiveSecond.classList.add("todoactivesecond")
    // todoActive.appendChild(todoActiveSecond)

    // var addEdit = document.createElement('IMG')
    // addEdit.setAttribute("src", "edit.png");
    // addEdit.classList.add("editbtn")
    // todoActiveSecond.appendChild(addEdit)

    // var addDelete = document.createElement('IMG')               
    // addDelete.setAttribute("src", "delete.png");
    // addDelete.classList.add("deletebtn")
    // todoActiveSecond.appendChild(addDelete)

    // var todoActiveFour = document.createElement('div')
    // todoActiveFour.classList.add("todoactivefour")
    // todoActiveThird.appendChild(todoActiveFour)


    // var activeCalender = document.createElement('IMG')
    // activeCalender.setAttribute("src", "blackcalender.png");
    // activeCalender.classList.add("activecalender")
    // todoActiveFour.appendChild(activeCalender)

    // var addDate = document.createElement('p')
    // addDate.innerHTML = date.value
    // todoActiveFour.appendChild(addDate)
    




//     <div class="modal fade" id="delete${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog"> 
//       <div class="modal-content">
//         <button type="button" class="btn-close ms-auto me-2 mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
//         <div class="modal-header border-0 pt-4 d-flex justify-content-center">
//           <h1 class="modal-dlt fs-5" id="exampleModalLabel">Delete Task</h1>
          
//         </div>
//         <div class="modal-body d-flex justify-content-center">
//           <p class="dlt-mdlbdy">Are you sure you want to delete this task?</p>
//         </div>
//         <div class="modal-footer border-0 pb-5 d-flex justify-content-center gap-3">
//           <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
//           <button onclick =  "deleteTask(${i})" type="button" data-bs-dismiss="modal" class="dltbtn-red">delete</button>
//         </div>
//       </div>
//     </div>
//   </div>

//   <form class="modal fade" id="edit${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-ed-add" id="exampleModalLabel">Edit Task</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         <p class="pmodal">Title<span class="text-danger">*</span></p>
//         <input type="text" class="form-control" name="" value="${arr[i].titleobj}" id="titleinputupdate${i}">
        
//         <br>
//         <p class="pmodal">Description</p>
//         <textarea name="" class="form-control" id="descinputupdate${i}" cols="30" rows="10">${arr[i].descobj}</textarea>
      
//       <br>
//         <p class="pmodal">Due Date</p>
//         <input type="date" class="form-control" name="" value="${arr[i].dateobj}" id="dateinputupdate${i}">
//       </div>
       
//       <div class="modal-footer">
//           <button type="button" class="btn modaladdcancel" data-bs-dismiss="modal">Cancel</button>
//           <button onclick =  "editTask(${i})" type="submit" data-bs-dismiss="modal"  class="btn modaladdtask" id="addtask">Update</button>

//           </div>
//           </div>
//         </div>
//       </form>


// let mydate = new Date();
// let daydtest = mydate.getDate() 
// let yeardt = mydate.getFullYear() 
// let monthdt = mydate.getMonth() + 1
// let todaydate = daydtest +"-" + monthdt+"-" + yeardt
// console.log(todaydate)
// console.log(daydtest)

//date decoration : By dd month yyyy


 

//   var bydatee = "By" + ' '+ daydt+ " " + monthname+ " " + yeardt
//    console.log(bydatee) 
// }


// // console.log(daydt)
// // console.log(yeardt)
// // console.log(monthname) 
// }


// function dateclosest(){
//   for(i= 0 ; i < arr.length; i++) {
    
     
//     console.log(todaydate);
//     let dueday = arr[i].dateobj
//     console.log(dueday)

//   let diffDays = parseInt((todaydate - dueday) / (1000 * 60 * 60 * 24), 10)
//     console.log(diffDays)
//   }
 

// }




// const array = JSON.parse(localStorage.getItem('arr')) || []
// function dategetlocal(){
//   datearr = JSON.parse(localStorage.getItem("datearr")) || []
// }

// function datesetlocal(){
//   localStorage.setItem("datearr", JSON.stringify(datearr)) 
// }


// function datefunc() {
//   for(var i = 0; i< arr.length; i++){
//     let mydate = new Date(arr[i].dateobj);
//     console.log(mydate)
//     let monthdt = mydate.getMonth() + 1
//     let month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
//     let monthname = month[monthdt]
//     let daydt = mydate.getDate() 
//     let yeardt = mydate.getFullYear() 
//     // if (daydt < 10)  {
//     //    daydt = '0' + daydt;
//     //}
//     datearr = []
//     date2obj = {  mday : daydt,
//                   mmonth : monthname,
//                   myear : yeardt
//     }
//     datearr.push(date2obj)
//     console.log(datearr)
  
//   }
//   }