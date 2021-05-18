import React from 'react';
const images = require.context('../../images', true);

const About: React.FC = () => {
  return(
    <div className="about-container">
      <div className="about-section">
        <h2 className="about-title">The Project</h2>
        <p className="about-paragraphe">
          The project was first published during a hackathon, and is now a prototype for a real case application.
          Irrigate is a platform that aims to gather NGOs and associatons with donors from around the world.
          NGOs and associations can apply to appear in the main page after going through a validation process.
          Donors can register and see all the NGOs and associations available for donations. Because its purpose is global,
          the donations are meant to be sent via crypto currencies like Dai and xDai.
          </p>
      </div> 
      <div className="about-section">
        <h2 className="about-title">Road Map</h2>
        <p className="about-paragraphe">
          <input type="checkbox" id="0" disabled checked></input>
          <label htmlFor="0"> Deploy server and database</label><br></br>
          <input type="checkbox" id="1" disabled checked></input>
          <label htmlFor="1"> Deploy client</label><br></br>
          <input type="checkbox" id="2" disabled></input>
          <label htmlFor="2"> Develop responsive version</label><br></br>
          <input type="checkbox" id="3" disabled></input>
          <label htmlFor="3"> Add DAI payment module (Polygon)</label><br></br>
          <input type="checkbox" id="4" disabled></input>
          <label htmlFor="4"> Add onboarding module for associations</label><br></br>
          <input type="checkbox" id="6" disabled></input>
          <label htmlFor="6"> Purchase design</label><br></br>
          <input type="checkbox" id="7" disabled></input>
          <label htmlFor="7"> Start registering associations campaign</label><br></br>
        </p>
      </div> 
      <div className="about-section">
        <h2 className="about-title">The Team</h2>
        <p className="about-paragraphe">
          <div className="about-person-container">
            <img className="about-person-picture" src={images(`./Raphael_Pinto_small.png`)} alt="Raphael Pinto"></img>
            <div className="about-person-name">Raphael Pinto Gregorio</div>
            <div className="about-person-role">Full Stack Developer</div>
          </div>
        </p>
      </div> 
    </div>
  );
};

export default About;