import React from "react";

const AppContext = React.createContext();

function AppProvider({ children })
{
  const isLoggedInExist = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedInState] = React.useState(
    isLoggedInExist
      ? JSON.parse(localStorage.getItem("isLoggedIn"))
      : { state: false }
  );
  const isProfileExist = localStorage.getItem("profile");
  const [profile, setProfileState] = React.useState(
    isProfileExist ? JSON.parse(localStorage.getItem("profile")) : {}
  );

  const setProfile = (user) =>
  {
    setProfileState(user);
    if (profile)
    {
      localStorage.setItem("profile", JSON.stringify(user));
    }
  };

  const setIsLoggedIn = (bool) =>
  {
    setIsLoggedInState({ state: bool });
    localStorage.setItem("isLoggedIn", JSON.stringify({ state: bool }));
  };

  const logout = () =>
  {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("profile");
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useGlobalState()
{
  return React.useContext(AppContext);
}

export { AppProvider, useGlobalState };
