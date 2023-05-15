export const getCachedQuestions = () => {
    const cachedQuestions = localStorage.getItem('cachedQuestions');
    return cachedQuestions ? JSON.parse(cachedQuestions) : null;
  };
  
  export const cacheQuestions = (questions) => {
    localStorage.setItem('cachedQuestions', JSON.stringify(questions));
  };