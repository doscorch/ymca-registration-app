
import client from "../feathersClient";

const enrollments = client.service('enrollments');

export const createEnrollment = async (enrollment) => {
    return await enrollments.create(enrollment, {});
}
export const updateEnrollment = async (enrollment) => {
    return await enrollments.update(enrollment._id, enrollment, {});
}
export const deleteEnrollment = async (id) => {
    return await enrollments.remove(id, {});
}


