import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/api';
import { showNotification } from '../services/notifications';
import { parseDateString, getTimeDifferenceInSeconds } from '../services/dateUtils';

const Daily = () => {
  const [todayTodos, setTodayTodos] = useState([]);
  const [weekRecap, setWeekRecap] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  const quotes = [
    "Kebiasaan baik adalah sebuah kebiasaan yang akan membawa Anda ke sukses.",
    "Konsistensi adalah kunci untuk mencapai sukses.",
    "Kebiasaan buruk adalah kebiasaan yang akan menjauhkan Anda dari kesuksesan.",
    "Manajemen waktu adalah kunci untuk mencapai tujuan Anda.",
    "Kebiasaan baik akan membantu Anda mencapai tujuan dalam waktu yang lebih singkat.",
    "Jangan biarkan kebiasaan buruk menghalangi Anda dari mencapai tujuan Anda.",
    "Berusahalah untuk terus konsisten dalam mengembangkan kebiasaan baik.",
    "Manajemen waktu yang baik akan membantu Anda menjadi lebih produktif dan efektif.",
    "Jadilah konsisten dalam membangun kebiasaan baik dan jangan menyerah meskipun ada kendala.",
    "Manajemen waktu yang baik akan membantu Anda meraih keberhasilan dalam hidup Anda."
  ];

  // Check and sync local storage
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

  // Fetch today's todos
  const fetchTodayTodos = useCallback(async () => {
    try {
      const data = await ApiService.getTodayTodos();
      setTodayTodos(data);
      
      // Update local storage
      const allTodos = await ApiService.getAllTodos('All');
      localStorage.setItem('todos', JSON.stringify(allTodos));
    } catch (error) {
      console.error('Failed to fetch today todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch week recap
  const fetchWeekRecap = useCallback(async () => {
    try {
      const data = await ApiService.getThisWeekRecap();
      setWeekRecap(data);
    } catch (error) {
      console.error('Failed to fetch week recap:', error);
    }
  }, []);

  // Complete a todo
  const handleComplete = async (id) => {
    try {
      await ApiService.completeTodo(id);
      await fetchTodayTodos();
    } catch (error) {
      console.error('Failed to complete todo:', error);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await ApiService.deleteTodo(id);
      await fetchTodayTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
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

        // Reminder for tasks due in 5 minutes or less
        if (diff <= 300 && diff > 0 && todo.status !== 'Complete') {
          showNotification(
            'Reminder',
            `Task Due Date is In 5 Minutes or Less! Please Complete Task ${todo.title}`
          );
        }
        // Notification for missed tasks
        else if (diff <= 0 && todo.status !== 'Complete' && !todo.notified) {
          showNotification('Task Missed', `You Missed Task ${todo.title}`);
          ApiService.updateNotification(todo.id).catch(console.error);
        }
      });
    } catch (error) {
      console.error('Failed to check reminders:', error);
    }
  }, []);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize component
  useEffect(() => {
    // Set random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    // Load data
    const initializeData = async () => {
      await checkLocalStorage();
      await fetchTodayTodos();
      await fetchWeekRecap();
      await checkReminders();
    };

    initializeData();

    // Set up reminder interval (every 5 minutes)
    const reminderInterval = setInterval(checkReminders, 300000);

    return () => clearInterval(reminderInterval);
  }, [checkLocalStorage, fetchTodayTodos, fetchWeekRecap, checkReminders]);

  // Get emoticon based on performance
  const getEmoticon = () => {
    if (!weekRecap) return '';
    const total = (weekRecap.completionRate + weekRecap.complianceRate) / 2;
    
    if (total <= 25) return <i className="icon fas fa-sad-cry"></i>;
    if (total <= 50) return <i className="icon fas fa-sad-tear"></i>;
    if (total <= 75) return <i className="icon fas fa-laugh-wink"></i>;
    return <i className="icon fas fa-laugh-squint"></i>;
  };

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
      <div 
        id="quotes" 
        style={{ 
          textAlign: 'center', 
          fontSize: '2em', 
          color: 'blue',
          padding: '20px'
        }}
      >
        {quote}
      </div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div 
            id="span" 
            className="float-left" 
            style={{ fontWeight: 'bold', marginBottom: '20px' }}
          >
            Current Time : {currentTime}
            <a style={{ float: 'right' }} href="/calendar">
              <i className="fa fa-solid fa-calendar"></i>
            </a>
          </div>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div 
                className="card" 
                id="list1" 
                style={{ borderRadius: '0.75rem', backgroundColor: '#eff1f2' }}
              >
                <div className="card-body py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <u>Today's Todo</u>
                  </p>

                  <div id="todaybox">
                    {todayTodos.length === 0 ? (
                      <p className="text-center text-muted">No todos for today</p>
                    ) : (
                      todayTodos.map((todo) => (
                        <ul 
                          key={todo.id} 
                          className="list-group list-group-horizontal rounded-0"
                        >
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
                          <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                            <p className="lead fw-normal mb-0">{todo.title}</p>
                          </li>
                          {todo.status !== 'Complete' ? (
                            <>
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
                              <li 
                                onClick={() => handleComplete(todo.id)} 
                                className="list-group-item p-0 d-flex align-items-center border-0 bg-transparent"
                              >
                                <div className="btn btn-primary rounded-3 d-flex align-items-center hidden-sm hidden-xs visible-md-block visible-lg-block">
                                  <p className="small mb-0">Complete</p>
                                </div>
                                <div className="hidden-md hidden-lg visible-sm-block visible-xs-block">
                                  <i className="fa fa-solid fa-check"></i>
                                </div>
                              </li>
                            </>
                          ) : (
                            <li 
                              onClick={() => handleDelete(todo.id)} 
                              className="list-group-item p-0 d-flex align-items-center border-0 bg-transparent"
                            >
                              <div className="btn btn-danger rounded-3 d-flex align-items-center hidden-sm hidden-xs visible-md-block visible-lg-block">
                                <p className="small mb-0">Delete</p>
                              </div>
                              <div className="hidden-md hidden-lg visible-sm-block visible-xs-block">
                                <i className="fa fa-solid fa-trash"></i>
                              </div>
                            </li>
                          )}
                        </ul>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {weekRecap && (
              <div className="row" id="thisWeekProgress">
                <div className="col-md-6 col-sm-12">
                  <div id="taskCompletion">
                    <b>This Week Completion Rate :</b>
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${weekRecap.completionRate}%` }}
                      >
                        {weekRecap.completionRate}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div id="complianceCompletion">
                    <b>This Week Compliance Rate :</b>
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${weekRecap.complianceRate}%` }}
                      >
                        {weekRecap.complianceRate}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 text-center">
                  <div id="tipsEmote">{getEmoticon()}</div>
                </div>
                <div className="col-md-6 col-sm-12 text-center">
                  <h3 className="font-weight-bold" id="weekTips">
                    {weekRecap.tips}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Daily;
