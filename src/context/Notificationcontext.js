import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const [book, setBook] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    axios.get(`/my-booking`).then(function (result) {
      setBook(result?.data);
      result?.data?.length > 0 &&
        result?.data?.filter((data) => {
          if (!data?.accept) {
            setNotification((data) => [...data, data]);
            return data;
          }
        });
    });
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        value: [book, setBook],
        value1: [notification, setNotification],
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
