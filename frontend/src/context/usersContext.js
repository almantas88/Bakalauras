import { createContext, useState } from "react";
export const UsersContext = createContext([]);

export const UsersProvider = (props) => {
  const [allUserslist, setAllUsersList] = useState([]);

  const handleDeleteUserContext = (cardID) => {
    console.log(allUserslist);
    const userListAfterDeletion = allUserslist.filter((element) =>  element.cardID !== cardID  )
    setAllUsersList(userListAfterDeletion);
  };

  // cia padaryt update funkcija

  const handleUpdateUserContext = (cardID, values) => {
    const userListAfterUpdate = allUserslist.filter((element) =>  element.cardID !== cardID   )
    setAllUsersList([
      {
        firstName: values.firstName,
        lastName: values.lastName,
        cardID: values.cardID,
        grade: values.grade,
      },
      ...userListAfterUpdate,
    ]);
  };

  const handleUpdateUserBooksCountContext = (cardID, values, operator, count) => {
    const userListAfterUpdate = allUserslist.filter((element) =>  element.cardID !== cardID   )
    console.log(cardID, values, operator, count);
    var newBooksLength = values.booksLength;

    if(operator === "+"){
      newBooksLength = newBooksLength + count;
    }
    else if( operator === "-"){
      newBooksLength = newBooksLength - count;
    }
    console.log(newBooksLength);
    setAllUsersList([
      {
        firstName: values.firstName,
        lastName: values.lastName,
        cardID: values.cardID,
        grade: values.grade,
        booksLength: newBooksLength
      },
      ...userListAfterUpdate,
    ]);
  };

  return (
    <UsersContext.Provider
      value={{allUserslist, setAllUsersList, handleDeleteUserContext, handleUpdateUserContext, handleUpdateUserBooksCountContext}}
    >
      {props.children}
    </UsersContext.Provider>
  );
};
