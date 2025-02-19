import { reactive } from "vue";

export const jwtState = reactive({
    value: localStorage.getItem("token") || null
})