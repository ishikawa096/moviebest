import React, { useState, useEffect } from 'react';
import { lists } from '../components/lists';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleExecTest = async () => {
    const response = await lists();
    if (response.status === 200) {
      setMessage(response.data.data.attributes.comment);
    }
  };

  useEffect(() => {
    handleExecTest();
  }, []);

  return <h1>{message}</h1>;
};

export default App;
