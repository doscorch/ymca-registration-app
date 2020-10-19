
import { ERROR } from "../errorHandling";
import client from "../feathersClient";

const users = client.service('users');

export const registerUser = async (email, password, firstName, lastName) => {
    console.log(email);
    console.log(password);
    return await users.create({ "email": email, "password": password, "firstName": firstName, "lastName": lastName, userRole: "member" }, {});
}

export const loginUser = async (email, password) => {
    console.log(email);
    console.log(password);
    try {
        if (!email && !password) {
            let auth = await client.reAuthenticate();
            return {
                userId: auth.user?._id,
                email: auth.user?.email,
                error: false,
            }
        } else {
            let auth = await client.authenticate({
                strategy: 'local',
                email: email,
                password: password,
            });
            console.log(auth);
            return {
                user: auth.user,
                error: false,
            }
        }
    } catch (error) {
        console.log(error);
        let message = error?.message ?? ERROR;
        return {
            error: message,
        };
    }
}

export const logout = async () => {
    return await client.logout();
}

