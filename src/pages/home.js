import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../components/profile/Profile';
import Scream from '../components/scream/Scream';
import { getScreams } from '../redux/actions/dataActions';
import ScreamSkeleton from '../util/ScreamSkeleton';
class home extends Component {
    state={
        screams:null
    }
    componentDidMount(){
        this.props.getScreams();
    }

    render() {
        const {screams, loading} = this.props.data;
        let recentScreamsMarkup = !loading?(
            screams.map((scream)=> <Scream key={scream.scremId} scream={scream}/>)):
            <ScreamSkeleton/>
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p><Profile/></p>
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getScreams:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    data:state.data
})

export default connect(mapStateToProps, {getScreams})(home);