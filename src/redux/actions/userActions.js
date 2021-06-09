import axios from 'axios';
import { CLEAR_ERRORS, LOADING_UI, LOADING_USER, MARK_NOTIFICATIONS_READ, SET_ERRORS, SET_UNAUTHENTICATED, SET_USER } from '../types';

export const loginUser = (userData, history)=>(dispatch)=>{
    dispatch({type:LOADING_UI});

    axios.post('https://europe-west1-socialape-d081e.cloudfunctions.net/api/login',userData)
        .then(res=>{
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type:CLEAR_ERRORS});
            history.push('/');
        })
        .catch(err=>{
            dispatch({
                type:SET_ERRORS,
                payload:err.response.data
            })
        });
 
}

export const signupUser = (NewUserData, history)=>(dispatch)=>{
    dispatch({type:LOADING_UI});

    axios.post('https://europe-west1-socialape-d081e.cloudfunctions.net/api/signup',NewUserData)
        .then(res=>{
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type:CLEAR_ERRORS});
            history.push('/');
        })
        .catch(err=>{
            dispatch({
                type:SET_ERRORS,
                payload:err.response.data
            })
        });
 
}

export const logoutUser = ()=>(dispatch)=>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type:SET_UNAUTHENTICATED});
}
export const getUserData = () => (dispatch)=>{
        dispatch({type:LOADING_USER});
        axios.get('https://europe-west1-socialape-d081e.cloudfunctions.net/api/user')
        .then(res=>{
            dispatch({
                type:SET_USER,
                payload:res.data
            })
        })
        .catch(err=>console.log(err));
}

const setAuthorizationHeader = (token)=>{
            const FBIdToken = `Bearer ${token}`
            localStorage.setItem('FBIdToken',FBIdToken);
            axios.defaults.headers.common['Authorization']=FBIdToken;
}

export const uploadImage = (FormData)=>(dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.post('https://europe-west1-socialape-d081e.cloudfunctions.net/api/user/image',FormData)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch(err=>console.log(err));
}

export const editUserDetails = (userDetails)=>(dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.post('https://europe-west1-socialape-d081e.cloudfunctions.net/api/user',userDetails)
    .then(()=>{
        dispatch(getUserData());
    })
    .catch((err)=>console.log(err));
}
export const markNotificationsRead = (notificationIds)=>(dispatch)=>{
    axios.post('https://europe-west1-socialape-d081e.cloudfunctions.net/api/notifications',notificationIds)
    .then(res=>{
        dispatch({
            type:MARK_NOTIFICATIONS_READ
        })
    })
    .catch(err=>console.log(err))
}
