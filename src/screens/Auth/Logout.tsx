import React from 'react';
import { Button } from 'react-native';
import { useAuthContext } from '../../providers/AuthProvider';

const LogoutButton = () => {
    const { logout } = useAuthContext();

    return <Button title="Logout" onPress={logout} />;
};

export default LogoutButton;
