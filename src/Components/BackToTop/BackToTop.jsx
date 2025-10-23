import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {visible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "5px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
          }}
        >
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default BackToTop;
