const URL = "http://192.168.1.88:8000/api";
const getToken = () => localStorage.getItem("token");

/**
 * Fetches all candidates
 *
 * @param {Number} page current page
 * @returns {Promise} Promise object represents operation result
 */
export const getCandidates = page => {
  const token = getToken();
  return fetch(`${URL}/main/returnAllCandidates/${page}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      const candidatesData = {
        candidates: data.candidates,
        candidatesCount: data.Count,
        totalPages: data.Page,
        perPage: data.perPage,
        currentPage: data.currentPage,
        platforms: data.platforms,
        companies: data.company,
        statuses: data.statuses,
        recruiters: data.recruiter
      };

      return candidatesData;
    })
    .catch(error => console.log("error in fetch: ", error));
};

/**
 * Fetches candidates sent by freelancer
 *
 * @param {Number} page current page
 * @returns {Promise} Promise object represents operation result
 */
export const getCandidatesFromFreelancers = page => {
  const token = getToken();
  return fetch(`${URL}/main/viewCandidatesFreelancerOnVacancies/${page}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      const candidatesFromFreelancersData = {
        candidatesFF: data.candidates,
        candidatesCountFF: data.Count,
        totalPagesFF: data.Page,
        perPageFF: data.perPage,
        currentPageFF: data.currentPage
      };

      return candidatesFromFreelancersData;
    })
    .catch(error => console.log("error in fetch: ", error));
};

/**
 * Filters and sorts all candidates
 *
 * @param {Number} page current page
 * @param {Object} filterAndSort object with sorted fields
 * @returns {Promise} Promise object represents operation result
 */
export const filterAndSortAllCandidates = (page, filterAndSort) => {
  const token = getToken();
  return fetch(`${URL}/main/returnAllCandidates/${page}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filterAndSort)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      const candidatesData = {
        candidates: data.candidates,
        candidatesCount: data.Count,
        totalPages: data.Page,
        perPage: data.perPage,
        currentPage: data.currentPage,
        platforms: data.platforms,
        companies: data.company,
        statuses: data.statuses,
        recruiters: data.recruiter
      };

      return candidatesData;
    })
    .catch(error => console.log("error in fetch: ", error));
};
