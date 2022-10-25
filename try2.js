//declaring global variables
let form = document.getElementById("form")
let titleInput = document.getElementById("titleinput")
let descInput = document.getElementById("descinput")
let dateInput = document.getElementById("dateinput")
let allTasks = document.getElementById("activecol")
let deletebtn = document.getElementById("dltbtn")
let countAll = document.getElementById("countall")
let completeCol = document.getElementById("completeCol")


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
let arr = []
var arrlength = arr.length

// const array = JSON.parse(localStorage.getItem('arr')) || []

//pushing object into array and declaring keys to objects
let dataStore = () => {
var todoobj = {
            titleobj : titleInput.value ,
            descobj : descInput.value ,
            dateobj :  dateInput.value ,
            ischeck : false     
     }
    arr.push(todoobj)  
    console.log(arr)
    countAll .innerHTML++
    displaytask()
    resetinput()
    datefunc()
   
}

//date decoration : By dd month yyyy

// function datefunc() {
// for(var i = 0; i< arr.length; i++){
//   var mydate = new Date(arr[i].dateobj);
//   console.log(mydate)
//   var daydt = mydate.getDate() 
//   var yeardt = mydate.getFullYear() 
//   var monthdt = mydate.getMonth() + 1
//   if (daydt < 10)  {
//      daydt = '0' + daydt;
//   }
 
//   var month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
//  var monthname = month[monthdt]
//   var bydatee = "By" + ' '+ daydt+ " " + monthname+ " " + yeardt
//    console.log(bydatee) 
// }


// // console.log(daydt)
// // console.log(yeardt)
// // console.log(monthname) 
// }



// localStorage.setItem('arr',JSON.stringify(arr))


//displaying active tasks 
function displaytask(){

    // let activeRow  = document.querySelectorAll(".activerow")
    // console.log(activeRow)
    
    let activeCol  = document.querySelector(".activecolumn")
    activeCol.innerHTML = ""

    for(i= 0 ; i < arr.length; i++) {
      if(arr[i].ischeck == false){
        console.log(arr[i].ischeck)

allTasks.innerHTML +=  `<div class="activerow my-3" id="rowdiv">
<div class="todoactive d-flex justify-content-between" >
    <span class="todoactiveone  d-flex gap-3 ">
          <input class="form-check-input rounded-circle check" onclick = "checkTask(${i});displayComplete();displaytask();completeValue()" id= "checkid${i}" style="width: 40px; height : 40px" type="checkbox">
              <p class="titleactive mt-1" id = "titletodo">${arr[i].titleobj}<p>
              <img class="mt-2" src="/yellow.png" alt="">
     </span>
    </div>
      
    <div class="todoactivefour d-flex justify-content-between px-4 ">

        <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
            <img src="/blackcalender.png" style="height: 20px;" alt="">
            <p class="dateclass " id="thedate">${arr[i].dateobj}</p>
        </span>

      <span class= "todoactivetwo mb-3  ">
        <button id="editbtn"  class = "border-0"><i data-bs-toggle="modal" data-bs-target="#edit${i}"   class="bi bi-pencil-fill border border-0 bg-light pe-4"></i></button>
        <button  id="dltbtn"  class = "border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete${i}"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
      </span>
    
</div>
</div>


<div class="modal fade" id="delete${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog"> 
        <div class="modal-content">
          <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-header border-0 pt-4 d-flex justify-content-center">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            
          </div>
          <div class="modal-body d-flex justify-content-center">
            <p>Are you sure you want to delete this task?</p>
          </div>
          <div class="modal-footer border-0 pb-5 d-flex justify-content-center gap-3">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button onclick =  "deleteTask(${i})" type="button" data-bs-dismiss="modal" class="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    </div>



          
<!-- modal edit      -->

<form class="modal fade" id="edit${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Task Title<span class="text-danger">*</span></p>
          <input type="text" class="form-control" name="" value="${arr[i].titleobj}" id="titleinputupdate${i}">
          
          <br>
          <p>Description</p>
          <textarea name="" class="form-control" id="descinputupdate${i}" cols="30" rows="10">${arr[i].descobj}</textarea>
        
        <br>
          <p>Due Date</p>
          <input type="date" class="form-control" name="" value="${arr[i].dateobj}" id="dateinputupdate${i}">
        </div>
         
        <div class="modal-footer">
            <button type="button" class="btn modaladdcancel" data-bs-dismiss="modal">Cancel</button>
            <button onclick =  "editTask(${i})" type="submit" data-bs-dismiss="modal"  class="btn modaladdtask" id="addtask">Update</button>

            </div>
            </div>
          </div>
        </form>`

      }
      
}

// onclick= "deleteTask(this)"

}

//resetting input in addtask form after inputting
function resetinput() {

    titleInput.value = ""
    descInput.value = ""
    dateInput.value = ""
    
}

//delete operation
function deleteTask(i){

    arr.splice(i,1)
    displaytask()
    displayComplete()
    console.log("delete opereation" )
    console.log(arr)
    countAll.innerHTML--
    completeValue()
    
 }

 //edit operation on tasks
function editTask(i){
  // let updateTitle = document.getElementById("titleinputupdate").value
  // let updatedesc = document.getElementById("descinputupdate").value
  // let updateDate = document.getElementById("dateinputupdate").value
   arr[i].titleobj = document.getElementById(`titleinputupdate${i}`).value
   arr[i].descobj = document.getElementById(`descinputupdate${i}`).value
   arr[i].dateobj = document.getElementById(`dateinputupdate${i}`).value
    console.log(arr )
    displaytask()
    displayComplete()
    console.log("edited")
    
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
}

//checking the checkbox is true or false 
function checkTask(i){
  chkbox = document.getElementById(`checkid${i}`) 
  arr[i].ischeck = chkbox.checked
  console.log(arr)
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
        <input class="form-check-input rounded-circle check" onclick = "checkTask(${i});displayComplete();displaytask();completeValue()" id= "checkid${i}" style="width: 40px; height : 40px" type="checkbox" checked>
            <p class="titleactive mt-1" id = "titletodo">${arr[i].titleobj}<p>
            <img class="mt-2" src="/green.png" alt="">
   </span>
  </div>
    
  <div class="todoactivefour d-flex justify-content-between px-4 ">

      <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
          <img src="/blackcalender.png" style="height: 20px;" alt="">
          <p class="dateclass " id="thedate">${arr[i].dateobj}</p>
      </span>

    <span class= "todoactivetwo mb-3  ">
      </button id="editbtn"  class = "border-0"><i data-bs-toggle="modal" data-bs-target="#edit${i}"   class="bi bi-pencil-fill border border-0 bg-light pe-3"></i></>
      <button  id="dltbtn"  class = "border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete${i}"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
    </span>
  
    
 
</div>
</div>



<div class="modal fade" id="delete${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog"> 
        <div class="modal-content">
          <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-header border-0 pt-4 d-flex justify-content-center">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            
          </div>
          <div class="modal-body d-flex justify-content-center">
            <p>Are you sure you want to delete this task?</p>
          </div>
          <div class="modal-footer border-0 pb-5 d-flex justify-content-center gap-3">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button onclick =  "deleteTask(${i})" type="button" data-bs-dismiss="modal" class="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    </div>

    <form class="modal fade" id="edit${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Task Title<span class="text-danger">*</span></p>
          <input type="text" class="form-control" name="" value="${arr[i].titleobj}" id="titleinputupdate${i}">
          
          <br>
          <p>Description</p>
          <textarea name="" class="form-control" id="descinputupdate${i}" cols="30" rows="10">${arr[i].descobj}</textarea>
        
        <br>
          <p>Due Date</p>
          <input type="date" class="form-control" name="" value="${arr[i].dateobj}" id="dateinputupdate${i}">
        </div>
         
        <div class="modal-footer">
            <button type="button" class="btn modaladdcancel" data-bs-dismiss="modal">Cancel</button>
            <button onclick =  "editTask(${i})" type="submit" data-bs-dismiss="modal"  class="btn modaladdtask" id="addtask">Update</button>

            </div>
            </div>
          </div>
        </form>`
    }
  }
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
      countAll.innerHTML--
    }
  }
  
  displaytask()
  displayComplete()


}

// let count = 0

// let completeValue = () => {
//   for( j=0 ; j<arr.length; j++){
//   if(arr[j].ischeck == true){
//     count++ //invoked in checkbox and delete function
//   }
//   document.getElementById("countcompleted").innerHTML = count
// }
// }

// let searchValue = () => {
//   for(v=0;i < arr.length;i++){
//     let searchBox = document.getElementById("searchbox").value
//     let index = arr[i].titleobj.indexOf(searchBox)
  
//     if(index == -1){
//       console.log("exist")
//     }
//   }
 
// }

//search
function searchValue(){
  let searchBox = document.getElementById("searchbox").value
  // console.log(searchBox)
  var result = null;
for (var i = 0; i < arr.length; i++) { 
  if (arr[i].titleobj === searchBox) { 
    result = `<div class="activerow my-3" id="rowdiv">
    <div class="todoactive d-flex justify-content-between" >
        <span class="todoactiveone  d-flex gap-3 ">
              <input class="form-check-input rounded-circle check" onclick = "checkTask(${i});displayComplete();displaytask();completeValue()" id= "checkid${i}" style="width: 40px; height : 40px" type="checkbox">
                  <p class="titleactive mt-1" id = "titletodo">${arr[i].titleobj}<p>
                  <img class="mt-2" src="/yellow.png" alt="">
         </span>
        </div>
          
        <div class="todoactivefour d-flex justify-content-between px-4 ">
    
            <span class="twdoactivethree d-flex gap-3 mt-2 ps-4">
                <img src="/blackcalender.png" style="height: 20px;" alt="">
                <p class="dateclass " id="thedate">${arr[i].dateobj}</p>
            </span>
    
          <span class= "todoactivetwo mb-3  ">
            <button id="editbtn"  class = "border-0"><i data-bs-toggle="modal" data-bs-target="#edit${i}"   class="bi bi-pencil-fill border border-0 bg-light pe-3"></i></button>
            <button  id="dltbtn"  class = "border-0"> <i  data-bs-toggle="modal" data-bs-target="#delete${i}"  class="bi bi-trash  me-4 border border-0 bg-light"></i> </button>
          </span>
        
          
       
    </div>
    </div>`;
    displayComplete()
    
    
    console.log(result)
    allTasks.innerHTML = result
    break;
    
  } 
  else{
    alert("element not found")
  }
}

}








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
    


