import React from 'react';
import AuthGuard from '../../providers/AuthGuard';
import DetailsScreen from '../DetailsScreen';

const GuardedScreen = (props: any) => {
    return (
        <AuthGuard navigation={props.navigation}>
            <DetailsScreen {...props} />
        </AuthGuard>
    );
};

export default GuardedScreen;
