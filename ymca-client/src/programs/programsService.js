
import { ERROR } from "../errorHandling";
import client from "../feathersClient";

const programs = client.service('programs');

// call api to create program
export const createProgram = async (program) => {
    return await programs.create(program, {});
}

// call api to update a program
export const updateProgram = async (program) => {
    return await programs.update(program._id, program, {});
}

// call api to delete a program
export const deleteProgram = async (id) => {
    return await programs.remove(id, {});
}
