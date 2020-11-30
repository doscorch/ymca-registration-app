
import { ERROR } from "../errorHandling";
import client from "../feathersClient";

const users = client.service('users');

export const registerUser = async (email, password, firstName, lastName) => {
    return await users.create({ "email": email, "password": password, "firstName": firstName, "lastName": lastName, userRole: "nonmember" }, {});
}

export const getUsers = async () => {
    return users.find().then(u => u.data)
}

export const getUser = async (email) => {
    return users.find({
        query: {
            email: email
        }
    }).then(u => u.data.length ? u.data[0] : undefined)
}

export const updateUser = async (user) => {
    return await users.update(user._id, user, {});
}

export const patchUser = async (userPartial) => {
    return await users.patch(userPartial._id, userPartial, {})
}

export const loginUser = async (email, password) => {
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

