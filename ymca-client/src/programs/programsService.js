
import { ERROR } from "../errorHandling";
import client from "../feathersClient";

const programs = client.service('programs');
// async get(id, params) {},
// async create(data, params) {},
// async update(id, data, params) {},
// async patch(id, data, params) {},
// async remove(id, params) {},

export const createProgram = async (program) => {
    console.log(program);
    return await programs.create(program, {});
}
export const updateProgram = async (program) => {
    console.log(program);
    return await programs.update(program._id, program, {});
}
export const deleteProgram = async (id) => {
    console.log(id);
    return await programs.remove(id, {});
}


