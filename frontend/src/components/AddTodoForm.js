import React, { useRef } from 'react';
import styles from './AddTodoForm.module.css';
import Modal from './UI/Modal';

const AddTodoForm = (props) => {
  const dateInputRef = useRef();
  const noteInputRef = useRef();
  const userInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();  // prevent page overload on form submission
    // callback - passes submitted data to parent
    props.onAddTodo({
        date: dateInputRef.current.value,
        note: noteInputRef.current.value,
        user: userInputRef.current.value,
    });  
    // reset all entered values
    dateInputRef.current.value = '';
    noteInputRef.current.value = '';
    userInputRef.current.value = '';
  }

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        <div className={styles['form-controls']}>
          <div className={styles['form-control']}>
              <label>date</label>
              <input ref={dateInputRef} type="text" />
          </div>
          <div className={styles['form-control']}>
              <label>note</label>
              <input ref={noteInputRef} type="text" />
          </div>
          <div className={styles['form-control']}>
              <label>user</label>
              <input ref={userInputRef} type="text" />
          </div>
        </div>
        <div className={styles['form-action']}>
          <button type="submit" className={styles['right-control']}>Add</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTodoForm;