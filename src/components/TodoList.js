import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/api';
import { showNotification } from '../services/notifications';
import { parseDateString, getTimeDifferenceInSeconds, isValidDateFormat } from '../services/dateUtils';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      const data = await ApiService.getAllTodos('All');
      setTodos(data);
      localStorage.setItem('todos', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check local storage and sync
  const checkLocalStorage = useCallback(async () => {
    try {
      const localTodos = JSON.parse(localStorage.getItem('todos'));
      if (localTodos && localTodos.length > 0) {
        await ApiService.setTodos(localTodos);
      }
    } catch (error) {
      console.error('Failed to sync local storage:', error);
    }
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!newTitle.trim()) {
      alert('Please Input Title!');
      return;
    }

    if (!isValidDateFormat(newDate)) {
      alert('Please Follow the Date Format!');
      return;
    }

    try {
      await ApiService.createTodo(newTitle, newDate);
      setNewTitle('');
      setNewDate('');
      await fetchTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
      alert('Failed to add todo. Please try again.');
    }
  };

  // Complete todo
  const handleComplete = async (id) => {
    try {
      await ApiService.completeTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error('Failed to complete todo:', error);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await ApiService.deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // Open edit modal
  const handleEditClick = async (id) => {
    try {
      const todo = await ApiService.getTodoById(id);
      setEditTodo(todo);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch todo details:', error);
    }
  };

  // Update todo
  const handleUpdate = async () => {
    if (!editTodo) return;

    try {
      await ApiService.updateTodo(editTodo.id, editTodo.title, editTodo.date);
      setShowModal(false);
      setEditTodo(null);
      await fetchTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Failed to update todo. Please try again.');
    }
  };

  // Check for reminders
  const checkReminders = useCallback(async () => {
    try {
      const pendingTodos = await ApiService.getAllTodos('Pending');
      const today = new Date();

      pendingTodos.forEach((todo) => {
        const todoDate = parseDateString(todo.date);
        if (!todoDate) return;

        const diff = getTimeDifferenceInSeconds(todoDate, today);

        if (diff <= 300 && diff > 0 && todo.status !== 'Complete') {
          showNotification(
            'Reminder',
            `Task Due Date is In 5 Minutes or Less! Please Complete Task ${todo.title}`
          );
        } else if (diff <= 0 && todo.status !== 'Complete' && !todo.notified) {
          showNotification('Task Missed', `You Missed Task ${todo.title}`);
          ApiService.updateNotification(todo.id).catch(console.error);
        }
      });
    } catch (error) {
      console.error('Failed to check reminders:', error);
    }
  }, []);

  // Initialize component
  useEffect(() => {
    const initializeData = async () => {
      await checkLocalStorage();
      await fetchTodos();
      await checkReminders();
    };

    initializeData();

    // Set up reminder interval (every 5 minutes)
    const reminderInterval = setInterval(checkReminders, 300000);

    return () => clearInterval(reminderInterval);
  }, [checkLocalStorage, fetchTodos, checkReminders]);

  // Initialize date picker (using jQuery for compatibility)
  useEffect(() => {
    if (window.$ && window.$.fn.datetimepicker) {
      window.$('#todoDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm:ss',
      });
      window.$('#editTodoDate').datetimepicker({
        format: 'DD/MM/YYYY HH:mm:ss',
      });
    }
  }, []);

  // Categorize todos
  const categorizeTodos = () => {
    const todoList = [];
    const doneList = [];
    const missedList = [];
    const now = new Date();

    todos.forEach((todo) => {
      const todoDate = parseDateString(todo.date);
      
      if (todo.status === 'Complete') {
        doneList.push(todo);
      } else if (todoDate && getTimeDifferenceInSeconds(todoDate, now) <= 0) {
        missedList.push(todo);
      } else {
        todoList.push(todo);
      }
    });

    return { todoList, doneList, missedList };
  };

  const { todoList, doneList, missedList } = categorizeTodos();

  // Render todo item
  const renderTodoItem = (todo, showEdit = true, showComplete = true, showDelete = false) => (
    <ul key={todo.id} className="list-group list-group-horizontal rounded-0 py-3">
      <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
        <div className="form-check">
          <input 
            className="form-check-input me-0" 
            type="checkbox" 
            checked={todo.status === 'Complete'}
            disabled 
          />
        </div>
      </li>
      <li 
        className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent mw-25" 
        style={{ wordBreak: 'break-word' }}
      >
        <p className="lead fw-normal mb-0">
          <b>{todo.title}</b>
        </p>
      </li>
      {!showDelete && (
        <li className="list-group-item rounded-0 border-0 bg-transparent">
          <div className="text-end text-muted">
            <a href="#!" className="text-muted">
              <p className="small mb-0">
                <i className="fas fa-info-circle me-2"></i>
                {todo.date}
              </p>
            </a>
          </div>
        </li>
      )}
      {showEdit && (
        <li 
          onClick={() => handleEditClick(todo.id)} 
          className="list-group-item p-0 d-flex align-items-center border-0 bg-transparent mx-3"
        >
          <div className="btn btn-warning rounded-3 d-flex align-items-center hidden-sm hidden-xs visible-md-block visible-lg-block">
            <p className="small mb-0">
              <i className="fa fa-solid fa-edit"></i>&nbsp;&nbsp;Edit
            </p>
          </div>
          <div className="hidden-md hidden-lg visible-sm-block visible-xs-block">
            <i className="fa fa-solid fa-edit"></i>
          </div>
        </li>
      )}
      {showComplete && (
        <li 
          onClick={() => handleComplete(todo.id)} 
          className="list-group-item p-0 d-flex align-items-center border-0 bg-transparent"
        >
          <div className="btn btn-primary rounded-3 d-flex align-items-center hidden-sm hidden-xs visible-md-block visible-lg-block">
            <p className="small mb-0">
              <i className="fa fa-solid fa-check"></i>&nbsp;&nbsp;Complete
            </p>
          </div>
          <div className="hidden-md hidden-lg visible-sm-block visible-xs-block">
            <i className="fa fa-solid fa-check"></i>
          </div>
        </li>
      )}
      {showDelete && (
        <li 
          onClick={() => handleDelete(todo.id)} 
          className="list-group-item p-0 d-flex align-items-center border-0 bg-transparent"
        >
          <div className="btn btn-danger rounded-3 d-flex align-items-center hidden-sm hidden-xs visible-md-block visible-lg-block">
            <p className="small mb-0">
              <i className="fa fa-solid fa-trash"></i>&nbsp;&nbsp;Delete
            </p>
          </div>
          <div className="hidden-md hidden-lg visible-sm-block visible-xs-block">
            <i className="fa fa-solid fa-trash"></i>
          </div>
        </li>
      )}
    </ul>
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center my-5">
            <div className="col-md-12">
              <div 
                className="card" 
                id="list1" 
                style={{ borderRadius: '0.75rem', backgroundColor: '#eff1f2' }}
              >
                <div className="card-body py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <u>My Todo</u>
                  </p>

                  <div className="pb-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="todoTitle"
                            placeholder="Add New..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                          />
                          <div className="mx-3" style={{ position: 'relative' }}>
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              id="todoDate"
                              value={newDate}
                              onChange={(e) => setNewDate(e.target.value)}
                              placeholder="DD/MM/YYYY HH:mm:ss"
                            />
                          </div>
                          <div>
                            <button
                              type="button"
                              id="todoAddBtn"
                              className="btn btn-primary"
                              onClick={handleAdd}
                            >
                              <i className="fas fa-plus"></i>&nbsp;&nbsp;Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select
                      id="filter"
                      className="select"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Complete">Completed</option>
                      <option value="Pending">Active</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="row d-flex justify-content-center align-items-center my-5" 
            id="TaskProgressBox"
          >
            <div className="col-md-12">
              <div 
                className="card" 
                id="list1" 
                style={{ borderRadius: '0.75rem', backgroundColor: '#eff1f2' }}
              >
                <div className="card-body py-4 px-4 px-md-5">
                  {(filter === 'All' || filter === 'Pending') && (
                    <div className="my-5" id="thingsToDo">
                      <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                        <u>Things to Do</u>
                      </p>
                      <div id="todoBox">
                        {todoList.length === 0 ? (
                          <p className="text-center text-muted">No pending todos</p>
                        ) : (
                          todoList.map(todo => renderTodoItem(todo, true, true, false))
                        )}
                      </div>
                    </div>
                  )}

                  {(filter === 'All' || filter === 'Complete') && (
                    <div className="my-5" id="thingsDone">
                      <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                        <u>Things Done</u>
                      </p>
                      <div id="doneBox">
                        {doneList.length === 0 ? (
                          <p className="text-center text-muted">No completed todos</p>
                        ) : (
                          doneList.map(todo => renderTodoItem(todo, false, false, true))
                        )}
                      </div>
                    </div>
                  )}

                  {(filter === 'All' || filter === 'Pending') && (
                    <div className="my-5" id="thingsMissed">
                      <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                        <u>Things Missed</u>
                      </p>
                      <div id="missedBox">
                        {missedList.length === 0 ? (
                          <p className="text-center text-muted">No missed todos</p>
                        ) : (
                          missedList.map(todo => renderTodoItem(todo, true, true, false))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {showModal && editTodo && (
        <div
          className="modal"
          id="editModal"
          tabIndex="-1"
          style={{ 
            display: 'block', 
            paddingTop: '10%',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Todo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <label>Todo Title</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      value={editTodo.title}
                      onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label>Date</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      id="editTodoDate"
                      value={editTodo.date}
                      onChange={(e) => setEditTodo({ ...editTodo, date: e.target.value })}
                      placeholder="DD/MM/YYYY HH:mm:ss"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
