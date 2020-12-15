
import client from "../feathersClient";

const enrollments = client.service('enrollments');

// call api to create enrollment
export const createEnrollment = async (enrollment) => {
    return await enrollments.create(enrollment, {});
}

// call api to update enrollment
export const updateEnrollment = async (enrollment) => {
    return await enrollments.update(enrollment._id, enrollment, {});
}

// call api to delete enrollment
export const deleteEnrollment = async (id) => {
    return await enrollments.remove(id, {});
}

// call api to cancel enrollments under a program
export const cancelEnrollmentsByProgramId = async (programId) => {
    const result = await enrollments.find({
        query: {
            programId: programId
        }
    });
    if (result.data && result.data.length) {
        result.data.forEach(e => {
            deleteEnrollment(e._id);
        });
    }
}

// call api to cancel enrollments under a user
export const cancelEnrollmentsByUserId = async (userId) => {
    const result = await enrollments.find({
        query: {
            userId: userId
        }
    });
    if (result.data && result.data.length) {
        result.data.forEach(e => {
            deleteEnrollment(e._id);
        });
    }
}

