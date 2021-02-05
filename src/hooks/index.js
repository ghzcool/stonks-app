import { useEffect, useState } from "react";

export const useSubject = (subject, callback) => {
  const [value, setValue] = useState((subject && subject.getValue) ? subject.getValue() : null);
  useEffect(() => {
    const subscription = subject.subscribe((value) => {
      setValue(value);
      !!callback && callback(value);
    });
    return () => subscription.unsubscribe();
  }, [subject]);
  return value;
};

export const hookFromSubject = (subject) => () => useSubject(subject);
