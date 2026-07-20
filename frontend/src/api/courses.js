import { api } from "./client";

let coursesCache = null;

export async function getCourses() {
  if (coursesCache) {
    return coursesCache;
  }

  const courses = await api("/courses");
  coursesCache = courses;

  return courses;
}