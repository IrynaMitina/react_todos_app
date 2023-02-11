import React from 'react';

import styles from './TodoNote.module.css';

const TodoNote = (props) => {
  return (
    <li className={styles.todo}>
      <h2>{props.date}</h2>
      <h3>{props.note}</h3>
      <p>{props.user}</p>
    </li>
  );
};

export default TodoNote;