import React ,{useState,useEffect} from 'react'
import './style.css';
const Todo = () => {
    //LocalStorage Data
    const getlocaldata =()=>{
        const list = localStorage.getItem("mytodolist")
        if(list){
            return JSON.parse(list);
        }
        else{
            return [];
        }
    }


    const [inputdata,setInputdata] = useState("");
    const[items,setItems] = useState(getlocaldata);
    const[isEditItem,setIsEditItem] = useState("");
    const [toggleBtn ,setToggleBtn]=  useState(false);
   //ADD Item
    const additem = () =>{
        if(!inputdata)
            {
                alert("Please Input Data");
            }
        else if(inputdata && toggleBtn){
           setItems(
            items.map((curElement)=>{
                if(curElement.id === isEditItem){
                    return {...curElement, name:inputdata};
                }
                    return curElement;
            })
        );
        setInputdata("");
        setIsEditItem(null);
        setToggleBtn(false);
        }
        else{
            const myNewData ={
                id: new Date().getTime().toString(),
                name:inputdata
            };
            setItems([...items,myNewData])
            setInputdata("");
        }
    };
    //Edit Item
    const editItem =(id)=>{
        const item_edit =items.find((curElement)=>{
            return curElement.id === id;
        })
        setInputdata(item_edit.name)
        setIsEditItem(id)
        setToggleBtn(true);

    }
    //Delete Items
    const deleteitem =(id)=>{
            const updateditems = items.filter((curElement)=>{
                    return curElement.id !== id;
            });
            setItems(updateditems);
    }
    //Remove ALL
    const removeAll =()=>{
        setItems([]);
    }
    // Adding Local Storage
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items])



  return (
    <>
      <div className="main-div">
     
            <div className="child-div">
                <figure>
                    
                    <img src="../images/todo.svg" alt="TodoLogo" />
                    <figcaption>Add Your List Here  </figcaption>
                </figure>
                <div className="additems">
                    <input type="text" placeholder='Add Items' className='form-control' 
                    value={inputdata} onChange={(event)=>  setInputdata(event.target.value)  }/>
                    {toggleBtn?<i className="fa fa-edit add-btn" onClick={additem}></i> 
                    :<i className="fa fa-plus add-btn" onClick={additem}></i> }
                    
                    <div>
                        {/* Show All items */}
                            <div className="showItems">
                                {items.map((curElement)=>{
                                    return ( 
                                <div className="eachItem" key={curElement.id}>
                                    <h3>{curElement.name}</h3>
                                    <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={()=>{editItem(curElement.id)}}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteitem(curElement.id)}></i>
                                    </div>
                                </div>)
                                })}
                               
                            </div>
                        {/* Remove All Items */}
                        <div className="showItems">
                            <button className='btn effect04' data-sm-link-text="REMOVE ALL" onClick={removeAll}><span>CHECK LIST</span></button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </>
  )
}

export default Todo
