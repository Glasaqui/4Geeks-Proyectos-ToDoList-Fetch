import React from "react";
import { Input} from "reactstrap";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const[Todolist,setTodoList] = useState([]);
    const[nuevaTask,setnuevaTask] = useState(" ");
	const handleChange =(evento) => {
		setnuevaTask(evento.target.value);
	};
	const handlerKeypress =(evento) => {
		//event.preventDefault();
		if(evento.key=='Enter') {
			
			if(nuevaTask!=' '){
				
				setTodoList([...Todolist,nuevaTask])
				setnuevaTask(' ')
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
