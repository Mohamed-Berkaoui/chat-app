import axios from "axios";

export const baseURL="http://localhost:5000"
const appAxios=axios.create({
    baseURL:"http://localhost:5000/api",

})

export default appAxios