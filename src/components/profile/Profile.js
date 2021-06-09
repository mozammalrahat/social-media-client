import { Paper, Typography } from '@material-ui/core';
//MUI Stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import { CalendarToday, KeyboardReturn, Link as LinkIcon, LocationOn } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
import EditDetails from './EditDetails';

// import EditDetails from './EditDetails';
const styles = (theme)=>({
  ...theme.spreadThis
   
  });

class Profile extends Component {
  handleImageChange = (event)=>{
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);

  }
  handleEditPicture=()=>{
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  handleLogout = ()=>{
    this.props.logoutUser();
  }
    render() {
        const {classes, user:
             { credentials:
                { handle, createdAt, imageUrl,
                 bio, website, location},loading, authenticated}}
                 = this.props;
        let profileMarkup = !loading?(authenticated?(
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input hidden="hidden" type="file" id="imageInput" onChange={this.handleImageChange}/>
                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture}
                        btnClassName="button">
                          <EditIcon color="primary"/>
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/user/${handle}`} 
                        color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">
                            {bio}
                            </Typography>}
                        <hr/>
                        {location && (
                           <Fragment>
                                <LocationOn color="primary"/>
                            <span>{location}</span>
                            <hr/>
                           </Fragment>
                        )}
                        {
                            website && (
                                <Fragment>
                                    <LinkIcon color="primary"/>
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                      {" "}{website}
                                    </a>
                                    <hr/>
                                </Fragment>
                            )
                        }
                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                    </div>
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                      <KeyboardReturn color="primary"/>
                    </MyButton>
                   <EditDetails/>
                </div>
            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Typography variant="body1" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )):(<ProfileSkeleton/>)

        return profileMarkup;
    }
}

const mapStateToProps = (state)=>({
    user:state.user
})
const mapActionsToProps={logoutUser,uploadImage};

Profile.propTypes={
    logoutUser:PropTypes.func.isRequired,
    uploadImage:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));