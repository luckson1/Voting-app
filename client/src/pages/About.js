import React from 'react';
export const About = () => {
    return(
        <>
        <div className="section">
  <h1 className="text-center">About Us Page</h1>
  <p>Some text about who we are and what we do.</p>
  <p>Resize the browser window to see that this page is responsive by the way.</p>
</div>

<h2 className="text-center">Our Team</h2>
<div className="row">
  <div className="column">
    <div className="card ">
      <div className="text-center">
      <img src="https://picsum.photos/300/300?random=1" alt="Jane" className="justify-content-center" style={{width:"20%"}} />
      </div>
      <div className="container text-center">
        <h2>Jane Doe</h2>
        <p className="title">CEO & Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>jane@example.com</p>
        <p><button className='btn'>Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card justify-content-center">
    <div className="text-center">
      <img src="https://picsum.photos/300/300?random=2" alt="Mike" className="justify-content-center" style={{width:"20%"}} />
      </div>
      <div className="container text-center">
        <h2>Mike Ross</h2>
        <p className="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mike@example.com</p>
        <p><button className='btn'>Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
    <div className="text-center">
      <img src="https://picsum.photos/300/300?random=3" alt="John" className="justify-content-center" style={{width:"20%"}} />
      </div>
      <div className="container text-center">
        <h2>John Doe</h2>
        <p className="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button className='btn'>Contact</button></p>
      </div>
    </div>
  </div>
</div>
        </>
    );
};
