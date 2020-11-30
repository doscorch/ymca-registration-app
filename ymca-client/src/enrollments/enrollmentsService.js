
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

