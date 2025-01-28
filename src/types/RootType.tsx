export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined; // No params expected
    Details: {itemId: string}; // Params expected
};
