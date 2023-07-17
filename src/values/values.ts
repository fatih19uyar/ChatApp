import {MessageItemProps} from '../types/type';

export const messages: MessageItemProps[] = [
  {
    id: '1',
    sender: 'John Doe',
    message: 'Hello, how are you?',
    timestamp: '12:30 PM',
    image: require('../assets/profile-picture.png'),
  },
  {
    id: '2',
    sender: 'Jane Smith',
    message: "I'm good, thank you! How about you?",
    timestamp: '12:35 PM',
    image: require('../assets/profile-picture.png'),
  },
  {
    id: '3',
    sender: 'John Doe',
    message: "I'm doing well too. Any plans for the weekend?",
    timestamp: '12:37 PM',
    image: require('../assets/profile-picture.png'),
  },
];
