import {useEffect, useState} from 'react';
import List from './components/List/List';
import Alert from './components/Alert/Alert';
import './App.css';

function App() {
  const getLocalStorage = _ => {
    let list = localStorage.getItem('item');
    if (list) {
      return list = JSON.parse(localStorage.getItem('item'));
    }
    return [];
  }

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', msg: ''});

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'Please Enter Value');
    } else if (name && isEditing) {
      setList(
        list.map(item => {
          if (item.id === editID) {
            return {...item, title: name}
          }
          return item;
        })
      );
      setEditID(null);
      setName('');
      showAlert(true, 'success', 'value changed');
    } else {
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'success', 'Item Added To The List')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, type, msg});
  }

  const deleteItem = id => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    showAlert(true, 'danger', 'Item Removed');
  }

  const editItem = id => {
    const spcItem = list.find(item => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(spcItem.title);
  }

  const clearList = _ => {
    setList([]);
    showAlert(true, 'danger', 'Empty List');
  }

  useEffect(_ => {
    localStorage.setItem('item', JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <div className='container'>
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} 
            removeAlert={showAlert}
            list={list}/>}
          <h3 className='title'>Grocery Bud</h3>
          <div className='inputBox'>
            <input type='text'
              placeholder='e.g eggs'
              value={name}
              onChange={e => setName(e.target.value)} />
              <input type='submit'
                value={isEditing ? 'Edit Item' : 'Add Item'} />
          </div>
        </form>
        {list.length > 0 && (
          <div className='items'>
            <List list={list} editItem={editItem} deleteItem={deleteItem} />
            <button className='clearBtn'
              onClick={clearList}>
              Clear Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
