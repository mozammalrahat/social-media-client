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
//Redux stuff
import { signupUser } from '../redux/actions/userActions';


const styles =(theme)=>({
    ...theme.spreadThis
}) 
class signup extends Component {
    state={
        email:'',
        password:'',
        confirmPassword:'',
        handle:'',
        errors:{}
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors});
        }
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({
            loading:true
        });
        const newUserData = {
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    render() {
        const {classes, UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
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

                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="ConfirmPassword" className={classes.TextField}
                        value={this.state.confirmPassword} onChange={this.handleChange} fullWidth
                        helperText={errors.confirmPassword}
                        error = {errors.confirmPassword?true:false}/>

                        <TextField id="handle" name="handle" type="text" label="Handle" className={classes.TextField}
                        value={this.state.handle} onChange={this.handleChange} fullWidth
                        helperText={errors.handle}
                        error = {errors.handle?true:false}/>

                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Signup
                            {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                            <small>Already have an account ? login <Link to='/login'>here</Link></small>

                     </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

signup.propTypes={
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    signupUser:PropTypes.func.isRequired
}
const mapStateToProps = (state)=>({
    user:state.user,
    UI:state.UI
})



export default connect(mapStateToProps, {signupUser})(withStyles (styles)(signup));