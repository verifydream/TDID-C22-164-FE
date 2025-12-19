import React from 'react';

const Recap = () => {
  return (
    <div className="container py-5">
      <div className="card" style={{ borderRadius: '0.75rem', backgroundColor: '#eff1f2' }}>
        <div className="card-body py-4 px-4 px-md-5">
          <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
            <u>Report & Recap</u>
          </p>
          <div className="text-center">
            <p className="text-muted">
              Weekly and monthly reports will be displayed here.
              <br />
              You can track your productivity and progress over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recap;
