const URL = "http://192.168.1.88:8000/api";

const getToken = () => localStorage.getItem("token");

/**
 * Fetches options for selects from an api
 *
 * @returns {Promise} Promise object represents operation result
 */
export const getOptionsForSelects = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/returnOptionsForSelects`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error while fetching: ${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches letter templates from an api
 *
 * @returns {Promise} Promise object represents operation result
 */
export const getNotificationTemplates = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/returnEmailTemplate`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches all emails from an api
 *
 * @returns {Promise} Promise object represents operation result
 */
export const getAllEmails = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/interview/emailBox`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Sends email to a recipient
 *
 * @param {Object} content { recipient's email, subject, text}
 * @returns {Promise} Promise object represents operation result
 */
export const sendEmail = async content => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/interview/mailBoxSend`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches events for calendar from an api
 *
 * @returns {Promise} Promise object represents operation result
 */
export const getEventsForCalendar = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/calendarView`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches data for admin's dashboard from an api
 *
 * @returns {Promise} Promise object represents operation result
 */
export const getDataForAdminDashboard = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/dashBoardAdmin`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Filters data for admin's dashboard from an api
 *
 * @param {Object} filter { dateFrom, dateTo }
 * @returns {Promise} Promise object represents operation result
 */
export const filterDataForAdminDashboard = async filter => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/dashBoardAdmin`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filter)
    });
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches data for recruiter's dashboard from an api
 *
 * @returns {Promise} Promise object represents operation result
 */
export const getDataForRecruiterDashboard = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/dashBoardRecruiter`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches links from an api
 *
 * @returns {Object} Promise object represents operation result
 */
export const getDataForLinksPage = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/returnAllLinks`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Adds link to the list
 *
 * @param {Object} link link object
 * @returns {Object} Promise object represents operation result
 */
export const addLink = async link => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/addLink`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(link)
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Deletes link from the list
 *
 * @param {Number} id link's id
 * @returns {Object} Promise object represents operation result
 */
export const deleteLink = async id => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/deleteLink/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 *  Filters and sorts recruiter's candidates
 *
 * @param {Number} page current page for pagination
 * @param {Object} filterAndSort filter object
 * @returns {Object} Promise object represents operation result
 */
export const filterAndSortRecruiterCandidates = (page, filterAndSort) => {
  const token = getToken();

  return fetch(`${URL}/main/listAllCandUsers/${page}`, {
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
        recruiter: data.recruiter
      };

      return candidatesData;
    })
    .catch(error => console.log("error in fetch: ", error));
};

/**
 * Fetches platforms from an api
 *
 * @param {Number} page current page for pagination
 * @returns {Object} Promise object represents operation result
 */
export const getDataForPlatformPage = async page => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/returnAllPlatforms/${page}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Adds platform to the list
 *
 * @param {Object} platform platform object
 * @returns {Object} Promise object represents operation result
 */
export const addPlatform = async platform => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/add-platform`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(platform)
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Deletes platform from the list
 *
 * @param {Number} id platform's id
 * @returns {Object} - Promise object represents operation result
 */
export const deletePlatform = async id => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/delete-platform/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches all logs from an api
 *
 * @param {Number} page current page for pagination
 * @returns {Object} Promise object represents operation result
 */
export const getDataForActivityPage = async page => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/returnAllLogs/${page}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};
