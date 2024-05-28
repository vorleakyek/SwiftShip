import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture';

const config = {
  initialMessages: [
    createChatBotMessage(`Type one of the following words:
  "hi",
  "hello",
  "hey",
  "dog", or
  "bye".`),
  ],
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
};
export default config;
