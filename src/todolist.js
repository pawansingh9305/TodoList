
import './App.css';
import React,{useEffect, useState} from 'react'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function TodoList({username,succes,setSuccess}) {

  const [isCompleteScreen,SetcompleteScreen] = useState(false);
  const [allTodos,setallTodos] = useState([]);
  const [completetdTodos,setcompletedTodos] = useState([]);
  const [newTitle,setnewTitle] = useState("");
  const [newDescription,setnewDescription] = useState("");
  let userCompleted=username+'completed';
  

  const handleCompleted = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let CompletedOn = dd+'-'+mm+'-'+yy+'at'+h+':'+m+':'+s;

    let filteredItem = {
      ...allTodos[index],
      CompletedOn:CompletedOn
    } 

    let updateCompleted = [...completetdTodos];
    updateCompleted.push(filteredItem);
    setcompletedTodos(updateCompleted);
    localStorage.setItem(userCompleted,JSON.stringify(updateCompleted));
    handleDelete(index);
  }

  const handleLogout=()=>{
    setSuccess(false);

    
  }

  const handleCompletedDelete = (index)=>{
    let reducedcompleteTodo = [...completetdTodos];
    reducedcompleteTodo.splice(index,1);
    localStorage.setItem(userCompleted,JSON.stringify(reducedcompleteTodo))
    setcompletedTodos(reducedcompleteTodo);
  }
  const handleDelete = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem(username,JSON.stringify(reducedTodo))
    setallTodos(reducedTodo);
  }

  const handleAddList  = ()=> {
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setallTodos(updateTodoArr);
    localStorage.setItem(username,JSON.stringify(updateTodoArr));
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem(username));
    let savedCompletedTodo = JSON.parse(localStorage.getItem(userCompleted));
    if(savedTodo){
      setallTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setcompletedTodos(savedCompletedTodo);
    }
  },[])

  


  return (
    <>

      <h1>TODO LIST</h1>
        <div className='login-button'>
          
            <button className='secondaryBtn logout' onClick={handleLogout} >
            Log Out
            </button>
            

        </div>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=> setnewTitle(e.target.value)} placeholder="What's the task title " />
          </div>
          <div className="todo-input-item">
            <label>Desciption</label>
            <input type="text" value={newDescription} onChange={(e)=> setnewDescription(e.target.value)} placeholder="What's the task's description " />
          </div>
          
          <div className="todo-input-item">
            <button type="button" onClick={handleAddList} className="primary-btn" >Add</button>
          </div>
          
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>SetcompleteScreen(false)} >Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>SetcompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">

          {
            isCompleteScreen ===false && allTodos.map((item,index)=>{
              return (
              <div className="todo-list-item" key={index} >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDelete(index)} title="Delete?"/>
                  <BsCheckLg className='check-icon' onClick={()=>handleCompleted(index)} title="Completed?"/>
                </div>
              </div>
              )
            })
          }


          {
            isCompleteScreen === true && completetdTodos.map((item,index)=>{
              return (
              <div className="todo-list-item" key={index} >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On:{item.CompletedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleCompletedDelete(index)} title="Delete?"/>
                </div>
              </div>
              )
            })
          }


        </div>



      </div>

    </>
  );
}

export default TodoList;
