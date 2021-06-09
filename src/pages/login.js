import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppIcon from '../images/icon.png';
import { loginUser } from '../redux/actions/userActions';

const styles =(theme)=> ({
   ...theme.spreadThis
})
class login extends Component {
    state={
        email:'',
        password:'',
        errors:{}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors});
        }
    }
    handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        const userData = {
            email:this.state.email,
            password:this.state.password
        }
        
        this.props.loginUser(userData, this.props.history);
        
    };
    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                     <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.TextField}
                        value={this.state.email} onChange={this.handleChange} fullWidth
                        helperText={errors.email}
                        error = {errors.email?true:false}/>

                        <TextField id="password" name="password" type="password" label="Password" className={classes.TextField}
                        value={this.state.password} onChange={this.handleChange} fullWidth
                        helperText={errors.password}
                        error = {errors.password?true:false}/>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                            <small>don't have an account ? sign up <Link to='/signup'>here</Link></small>

                     </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

login.propTypes={
    classes: PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,

}

const mapStateToProps=(state)=>({
    user:state.user,
    UI:state.UI
})

const mapActionsToProps={
    loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles (styles)(login));