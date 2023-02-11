import React from 'react';

import TodoNote from './TodoNote';
import styles from './TodoList.module.css';

const TodoList = (props) => {
  return (
    <ul className={styles['todos-list']}>
      {props.todos.map((todo) => (
        <TodoNote
          key={todo.id} /* each child in the list should have unique key */
          date={todo.date}
          note={todo.note}
          user={todo.user}
        />
      ))}
    </ul>
  );
};

export default TodoList;