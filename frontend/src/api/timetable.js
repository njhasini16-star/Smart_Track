import { api } from "./client";

const courseOfferingsCache = new Map();

export async function getCourseOfferings(academicYear, term) {
  const cacheKey = `${academicYear}(${term})`;

  if (courseOfferingsCache.has(cacheKey)) {
    return courseOfferingsCache.get(cacheKey);
  }

  const data = await api(
    `/course-offerings?academic_year=${academicYear}&term=${term}`
  );

  courseOfferingsCache.set(cacheKey, data);

  return data;
}

let timeSlotsCache = null;

export async function getTimeSlots() {
  if (timeSlotsCache) {
    return timeSlotsCache;
  }

  const timeSlots = await api("/time-slots");
  timeSlotsCache = timeSlots;

  return timeSlots;
}