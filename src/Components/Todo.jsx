import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";


const getLocalItems = () =>{
    let list = localStorage.getItem('lists');
    // console.log(list);


    if(list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

const Todo = () => {


    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null)


    const addItem = () =>{
        if(!inputData){
            alert("Plz fill Data");
        }
        else if(inputData && !toggleBtn){
            setItems(
                items.map((elem) =>{
                    if(elem.id === isEditItem){
                        return{...elem, name: inputData}
                    }
                    return elem;
                })
            )
            
        setToggleBtn(true)

        setInputData('');

        setIsEditItem(null);
        }
        else{
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('');
        }
    }
    
    const deleteItem = (index) =>{
        const updatedItems = items.filter((elem) =>{
            return index !== elem.id;
        });

        setItems(updatedItems);
    }

    const removeAll = () =>{
        setItems([]);
    }


    const editItem = (id) =>{
        let newEditItem = items.find((elem) =>{
            return elem.id === id;
        })

        setToggleBtn(false)

        setInputData(newEditItem.name);

        setIsEditItem(id);
    }


    useEffect(() => {
        localStorage.setItem('lists',JSON.stringify(items));
    }, [items])
    

  return (
    <>
      <div className="main-div">
        <div className="container">
          <div className="child-div">
            <figure>
              <img src={logo} alt="logo" />
              <figcaption>Add Your List Here ✌</figcaption> 
            </figure>

            <div className="addItems">
              <input type="text" placeholder="Add Items.....✍" value={inputData} onChange={(e) => setInputData(e.target.value)} />
              {
                  toggleBtn ? <i className="fa fa-plus add-btn" onClick={addItem} title="Add Item"></i> : <i className="fa fa-regular fa-pen-to-square add-btn" title="Update Item" onClick={addItem}></i>
              }
              
            </div>
          </div>

          <div className="showItems">
            {
                items.map((elem) =>{
                    return(
                        <div className="eachItem" key={elem.id}>
                        <h3>{elem.name}</h3>
                       <div className="todo-btn">
                       <i className="fa-regular fa-pen-to-square" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                        <i className="fa-solid fa-trash-can" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                           </div>
                        </div>
                        
                    )
                })
            }
       
                
                

          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
