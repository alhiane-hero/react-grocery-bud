import { FaEdit, FaTrash } from 'react-icons/fa';
import './List.css';

function List({list, editItem, deleteItem}) {
    return (
        <>{
            list.map((item) => {
                const {id, title} = item;
                return (
                    <div key={id} className='item'>
                        <h3 className='itemTitle'>{title}</h3>
                        <div className='btns'>
                            <button className='btn editBtn'
                                onClick={_ => editItem(id)}>
                                <FaEdit />
                            </button>
                            <button className='btn deleteBtn'
                                onClick={_ => deleteItem(id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                );
            })
        }</>
    );
}

export default List;
