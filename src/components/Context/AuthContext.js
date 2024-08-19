import { createContext, useEffect, useReducer } from "react";

const initial_state = {

    user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,

};

export const AuthContext = createContext(initial_state) 

const AuthReducer = (state, action)=>{

    switch (action.type) {

        case "LOGIN_START":
        return {

            user: null,
            token: null,
            loading: false,
            error: null,

        };

        case "LOGIN_SUCCESS":
        return {

            user: action.payload,
            token: action.token,
            role: action.role,
            loading: false,
            error: null,

        };


        case "LOGIN_FAILURE":
        return {

            user: null,
            loading: false,
            error: action.payload,

        };

        case "REGISTER_SUCCESS":
        return {

            user: null,
            loading: false,
            error: null,

        };

        case "LOGOUT":            
        return {

            user: null,
            role: null,
            token: null,
            loading: false,
            error: null,

        };

        default: 
           return state;     
    }

};

export const AuthContextProvider = ({  children }) => {

const [state, dispatch] = useReducer(AuthReducer, initial_state)


useEffect(() => {

    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);

}, [state]);


   return (
    <AuthContext.Provider
    value={{

       user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        
    }}>
        {children}
    </AuthContext.Provider>
   )

}