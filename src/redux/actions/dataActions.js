import axios from 'axios';
import { CLEAR_ERRORS, DELETE_SCREAM, LIKE_SCREAM, LOADING_DATA, LOADING_UI, POST_SCREAM, SET_ERRORS, SET_SCREAM, SET_SCREAMS, STOP_LOADING_UI, SUBMIT_COMMENT, UNLIKE_SCREAM } from '../types';

export const getScreams=()=>dispatch =>{
    dispatch({type:LOADING_DATA});
    axios.get('https://europe-west1-socialape-d081e.cloudfunctions.net/api/screams')
    .then(res=>{
        dispatch({
            type:SET_SCREAMS,
            payload:res.data.slice(0,10)
        })
    })
    .catch(err=>{
        dispatch({
            type:SET_SCREAMS,
            payload:[]
        })
    })
}

export const likeScream = (screamId)=>dispatch=>{
    axios.get(`https://europe-west1-socialape-d081e.cloudfunctions.net/api/scream/${screamId}/like`)
    .then(res=>{
        dispatch({
            type:LIKE_SCREAM,
            payload:res.data
        })
    })
    .catch(err=>console.log(err));
}

export const unlikeScream = (screamId)=>dispatch=>{
    axios.get(`https://europe-west1-socialape-d081e.cloudfunctions.net/api/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({
            type:UNLIKE_SCREAM,
            payload:res.data
        })
    })
    .catch(err=>console.log(err));
}

export const postScream = (newScream)=>(dispatch)=>{
    dispatch({type:LOADING_UI});
    axios.post('https://europe-west1-socialape-d081e.cloudfunctions.net/api/scream',newScream)
    .then(res =>{
        dispatch({
            type:POST_SCREAM,
            payload:res.data
        });

        dispatch(clearErrors());
    
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const deleteScream = (screamId)=>(dispatch)=>{
    axios.delete(`https://europe-west1-socialape-d081e.cloudfunctions.net/api/scream/${screamId}`)
    .then(()=>{
        dispatch({type:DELETE_SCREAM, payload:screamId})
    })
    .catch(err=>console.log(err));
}

export const clearErrors = ()=>dispatch=>{
    dispatch({type:CLEAR_ERRORS});
}

export const getScream = (screamId)=>(dispatch)=>{

    dispatch({type:LOADING_UI});
    axios
    .get(`https://europe-west1-socialape-d081e.cloudfunctions.net/api/scream/${screamId}`)
    .then(res=>{
        dispatch({
            type:SET_SCREAM,
            payload:res.data
        });
        dispatch({type:STOP_LOADING_UI});
    })
    .catch(err=>console.log(err));
 }
 
 export const submitComment = (screamId, commentData)=>(dispatch)=>{

    axios
    .post(`https://europe-west1-socialape-d081e.cloudfunctions.net/api/scream/${screamId}/comment`, commentData)
    .then(res =>{
        dispatch({
            type:SUBMIT_COMMENT,
            payload:res.data
        });
        dispatch(clearErrors());
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data

        })
    })
 }

 export const getUserData = (userHandle)=> (dispatch)=>{

    dispatch({
        type:LOADING_DATA
    })
    axios
    .get(`https://europe-west1-socialape-d081e.cloudfunctions.net/api/user/${userHandle}`)
    .then(res=>{
        dispatch({
            type:SET_SCREAMS,
            payload: res.data.screams
        })
    })
    .catch(err=>{
        dispatch({
            type: SET_SCREAMS,
            payload:null
        })
    })
 }