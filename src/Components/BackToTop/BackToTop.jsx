import React, { useState, useEffect } from "react";
import { ImArrowUp2 } from "react-icons/im";

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
          className="hover:bg-green-600 rounded-full fixed p-4 animate-bounce bg-green-500"
          style={{
            bottom: "50px",
            right: "50px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
          }}
        >
          <ImArrowUp2 />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
