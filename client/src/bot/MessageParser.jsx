// in MessageParser.jsx
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (
      message.includes('hello') ||
      message.includes('hi') ||
      message.includes('hey')
    ) {
      actions.handleHello();
    }

    if (message.includes('dog')) {
      actions.handleDog();
    }

    if (message.includes('bye')) {
      actions.handleBye();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
