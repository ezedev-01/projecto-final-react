import { useState } from 'react';

export function useChatInput(onSubmit) {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText);
      setInputText("");
    }
  };

  return {
    inputText,
    handleChange,
    handleSubmit
  };
}