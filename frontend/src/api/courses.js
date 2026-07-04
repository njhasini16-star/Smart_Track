import { api } from "./client";

export function getCourses() {
    return api("/courses");
}