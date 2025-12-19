import React from 'react';

const Calendar = () => {
  return (
    <div className="container py-5">
      <div className="card" style={{ borderRadius: '0.75rem', backgroundColor: '#eff1f2' }}>
        <div className="card-body py-4 px-4 px-md-5">
          <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
            <u>Calendar View</u>
          </p>
          <div id="calendar-container" className="text-center">
            <p className="text-muted">
              Calendar functionality will be implemented here.
              <br />
              This will show your todos in a calendar view.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
