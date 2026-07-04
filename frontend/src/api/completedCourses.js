import { api } from "./client";

export function getCompletedCourses(semester) {
 
    return api(`/completed-courses/${semester}`);
}

export function getAllCompletedCourses() {
    return api("/completed-courses");
}

export function addCompletedCourse({courseId, basket, grade, semester}) {
    return api("/completed-courses", {
        method: "POST",
      body: JSON.stringify({
        userId: 1,
        courseId,
        semester,
        basket,
        grade
      })
    });
}

export function deleteCompletedCourse(courseId) {
    return api("/completed-courses", {
        method: "DELETE",
      body: JSON.stringify({
        courseId
      })
    });
}