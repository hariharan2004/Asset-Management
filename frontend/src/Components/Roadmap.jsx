import React from "react";
import '../Styles/Roadmap.css';

const Roadmap = () => {
    const roadmapData = [
        {
            side: "left",
            status: "completed",
            title: "Automated Technical Analysis - Q3 2024",
            description: "Integrating advanced technical analysis tools to enhance market predictions, including Bollinger Bands, Moving Averages, and key support/resistance levels."
        },
        {
            side: "right",
            status: "inprogress",
            title: "User Interface Design - Q4 2024",
            description: "Developing a seamless and intuitive user interface to ensure a smooth trading experience for users."
        },
        {
            side: "left",
            status: "inprogress",
            title: "Deep Learning Model Development - Q4 2024",
            description: "Creating a deep learning model to identify market patterns and dynamically adapt to changing market conditions."
        },
        {
            side: "right",
            status: "inprogress",
            title: "Testnet Launch - Q1 2025",
            description: "Deploying the model on the testnet for real-world testing and feedback collection from users."
        },
        {
            side: "left",
            status: "inprogress",
            title: "Reinforcement Learning Implementation - Q1 2025",
            description: "Integrating reinforcement learning algorithms to optimize investment strategies based on historical performance and market trends."
        },
        {
            side: "right",
            status: "inprogress",
            title: "Strategic Marketing & Partnerships - Q1 2025",
            description: "Establishing partnerships and executing a comprehensive marketing strategy to broaden reach and enhance user engagement."
        },
        {
            side: "left",
            status: "inprogress",
            title: "Mainnet Deployment - Q2 2025",
            description: "Launching the platform on the mainnet for public access, enabling real-time trading and investment functionalities."
        },
    ];
    
    return ( 
        <section className="roadmap">
        <h1 id="heading-roadmap">ROADMAP</h1>
        <div className="roadmap-container">
          {roadmapData.map((item, index) => (
            <div key={index} className={`roadmap-item ${item.side}`}>
              <div className={`dot ${item.status}`}></div>
              <div className={`roadmap-content ${item.side}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        </section>
    )
}

export default Roadmap;
