import { api } from "./client";

export function getPlannedCourses(semester) {
    return api(`/planned-courses/${semester}`);
}

export function getAllPlannedCourses() {
    return api("/planned-courses");
}

export function addPlannedCourse({courseId, semester, basket}) {
    return api("/planned-courses", {
        method: "POST",

      body: JSON.stringify({
        userId: 1,
        courseId,
        semester,
        basket
      })
    });
}

export function deletePlannedCourse(courseId) {
    return api("/planned-courses", {
        method: "DELETE",

      body: JSON.stringify({
        courseId
      })
    });
}