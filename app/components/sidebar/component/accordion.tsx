import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

interface AccordionInterface {
  title: String;
  children: any;
  icon?: any;
}

const Accordion: React.FC<AccordionInterface> = ({ title, children, icon }) => {
  const { resolvedTheme } = useTheme();
  const accordionContent: any = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? "0px" : `${accordionContent.current.scrollHeight}px`);
  };

  useEffect(() => {
    if (isOpen) {
      setHeight(`${accordionContent.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="">
      <div
        className="flex justify-between items-center py-3 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          {icon}
          <p className="ml-2 tracking-wide capitalize dark:text-light-primary-white">{title}</p>
        </div>
        <svg
          className={`w-6 h-6 ${
            isOpen
              ? "transform rotate-180 transition-all delay-100"
              : "transition-all delay-100"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={resolvedTheme == "light" ? '#000' : '#F0F3FA'}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        ref={accordionContent}
        style={{
          maxHeight: `${height}`,
          transition: "max-height 0.3s ease-in-out",
        }}
        className="overflow-hidden"
      >
        <div className="px-2 py-3">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
