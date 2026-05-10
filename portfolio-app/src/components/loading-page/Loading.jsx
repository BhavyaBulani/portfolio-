import { useEffect, useState } from "react";
import "./Loading.css";

const Loading = ({ percent, onComplete, onExitStart }) => {
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        const t2 = setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
      }, 600);
      return () => clearTimeout(t1);
    }
  }, [percent]);

  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      const t1 = setTimeout(() => {
        setExiting(true);
        if (onExitStart) onExitStart();
      }, 600);
      const t2 = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isLoaded, onComplete]);

  function handleMouseMove(e) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className={`loading-header ${clicked && "loader-out"}`}>
        <a href="/#" className="loader-title" data-cursor="disable">
          Logo
        </a>
        {/* Pancake animation replaces the old stair/loaderGame */}
        <div className={`pancake-wrapper ${clicked && "loader-out"}`}>
          <h1 className="cooking-label">Loading in process..</h1>
          <div className="cooking-area">
            <div className="cooking-bubble"></div>
            <div className="cooking-bubble"></div>
            <div className="cooking-bubble"></div>
            <div className="cooking-bubble"></div>
            <div className="cooking-bubble"></div>
            <div className="cooking-inner-area">
              <div className="cooking-sides">
                <div className="cooking-pan"></div>
                <div className="cooking-handle"></div>
              </div>
              <div className="cooking-pancake">
                <div className="cooking-pastry"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`loading-screen ${exiting && "exiting"}`}>
        <div className="loading-marquee">
          <div className="loading-marquee-track">
            <span>Web Developer</span>
            <span>Frontend Designer</span>
            <span>Web Developer</span>
            <span>Frontend Designer</span>
            <span>Web Developer</span>
            <span>Frontend Designer</span>
          </div>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
