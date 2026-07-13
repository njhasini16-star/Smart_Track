export function calculateBasketCredits(
    completedCourses,
    plannedCourses,
    filters
) {
    const grouped = {};

    completedCourses.forEach(course => {
        grouped[course.basket] =
            (grouped[course.basket] || 0) + Number(course.credits);
    });

    plannedCourses.forEach(course => {
        grouped[course.basket] =
            (grouped[course.basket] || 0) + Number(course.credits);
    });

    filters.forEach(filter => {
        grouped[filter] ??= 0;
    });

    grouped["All / Open Electives"] = grouped["Open Electives"];

    return grouped;
}