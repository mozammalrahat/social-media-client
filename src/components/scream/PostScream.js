import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { clearErrors, postScream } from '../../redux/actions/dataActions';
import MyButton from '../../util/MyButton';

const styles = (theme)=>({
    // ...theme.spreadThis,
    submitButton:{
        position:'relative',
        float:'right',
        marginTop:10
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position:"absolute",
        left: '91%',
        top: '6%'
    }

})
class PostScream extends Component {

    state = {
        open:false,
        body:'',
        errors:{}
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:'',open:false, errors:{}});
        }
    }
    handleOpen = ()=>{
        this.setState({open:true});
    }
    handleClose = ()=>{
        this.setState({open:false, errors:{}});
        this.props.clearErrors();
    }
    handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.props.postScream({body:this.state.body});
    }

    
    render() {
        const {errors} = this.state;
        const {classes, UI:{loading}} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Scream!">
                    <AddIcon color="primary"/>
                </MyButton>
                <Dialog
                open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>

                    <DialogTitle>Post a New Scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            name="body"
                            type="text"
                            label="Scream!!"
                            multiline
                            rows="3"
                            placeholder="Scream at your fellow apes"
                            error={errors.body?true:false}
                            helperText={errors.body}
                            className = {classes.TextField}
                            onChange={this.handleChange}
                            fullWidth
                            />

                            <Button type="submit" variant="contained" color="primary"
                                className={classes.submitButton} disabled={loading}>
                                    Submit
                                    {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                    )}
                                </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}
PostScream.propTypes = {
    postScream:PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired

}

const mapStateToProps = (state)=>({
    UI : state.UI
})
export default connect(mapStateToProps, {postScream, clearErrors})(withStyles(styles)(PostScream));