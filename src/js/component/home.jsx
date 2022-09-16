import React from "react";
import { Input} from "reactstrap";
import { useState,useEffect } from "react";

//include images into your bundle
//import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const[Todolist,setTodoList] = useState([]);
    const[nuevaTask,setnuevaTask] = useState(" ");

	

	const GURL = "https://assets.breatheco.de/apis/fake/todos/user/glasaqui";
    
    const INI_POST = {
        method: "POST",
        body: JSON.stringify(Todolist),
        headers: {
          "Content-Type": "application/json"
        }
      }
    
    const DEL_DELETE = {                                                                                                                
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
      
	      //Carga la lista guardada previamente 
		  const getApilist = async () =>{

			let resp = await fetch(GURL);
			if(resp.ok){
				let APIList = await resp.json();
				setTodoList(APIList);
				setnuevaTask("");
				console.log("Lista guardada cargada con exito")
				}else{
				let createuser = await fetch(GURL , INI_POST)
				if(createuser.ok){
					console.log("usuario iniciado con exito");
				}
			}
			return console.log("iniciado")
		}
	
	const handleChange =(evento) => {
		setnuevaTask(evento.target.value);
	};
	const handlerKeypress = async (evento) => {
		//event.preventDefault();
		if(evento.key=='Enter') {
			
			if(nuevaTask!=' '){
				
				setTodoList([...Todolist,nuevaTask])
				
				let newList = Todolist;     
            
            	newList.push({
                label: nuevaTask,
                done: false
            });

			let response = await fetch(GURL, {
                method: "PUT",
                body: JSON.stringify(newList),
                headers: {
                    "Content-Type": "application/json"
                }
            });

			if (response.ok) {
                let resp = await fetch(GURL);
                let APIList = await resp.json();
                setTodoList(APIList);
                setnuevaTask(' ');
            } else {
                alert("intenta de nuevo, tienes un error");
            }           
				
			}
		}
	};
	const borrar =(id) => {
		const listafiltrada = Todolist.filter((e,index) => index !==id); 
		setTodoList(listafiltrada);
	};

	    
		  
  	return (
		<div className="text-center">
			<h1>ToDo List</h1>
			
			<div className="row">
				<div className="col-md-6">
					<div className="card card-white">
						<div className="card-body">

						<div className="todo-list">
                        	<div className="todo-item">
                            	
									<Input 
									type="text"
									placeholder="Tarea por hacer"
									className="form-control"
									id="floatingInput"
									onChange={handleChange} 
									value={nuevaTask}
									onKeyDown={handlerKeypress}
									/>
									
									{Todolist.map((tarea,i)=>{
										return(
											<div className="todo-list">
												<div className="todo-item">
													
													<span key={i}>{tarea}
													</span>
													
													<button className="add-btn"  on  onClick={( )=> borrar(i)}>X</button>		
												</div>
											</div>
										)
									})
									}	
									
									</div>
									</div>
								
					</div>
				</div>
			</div>
		</div>	
		
    </div>
  
	);
};

export default Home;
