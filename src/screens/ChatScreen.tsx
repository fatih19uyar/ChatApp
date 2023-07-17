import React from 'react';
import TopBar from '../components/TopBar';
import Background from '../components/Background';
import ChatScreenForms from '../forms/ChatScreenForms';

type Props = {
  navigation: any;
  route: any;
};

const ChatScreen: React.FC<Props> = ({navigation, route}) => {
  const {selectedName} = route.params;
  return (
    <>
      <TopBar navigation={navigation} profileStatus={true} backStatus={true} />
      <ChatScreenForms name={selectedName} />
    </>
  );
};

export default ChatScreen;
