const URL = "http://192.168.1.88:8000/api";
const getToken = () => localStorage.getItem("token");

/**
 * Fetches all vacancies for freelancer
 *
 * @param {Number} id freelancer id
 * @returns {Promise} Promise object represents operation result
 */
export const getVacanciesForFreelancer = async id => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/vacancyForFreelancer/${id}`, {
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
 * Adds vacancies for freelancer
 *
 * @param {Number} id freelancer id
 * @param {Array} vacanciesToAdd Array of vacancies' objects
 * @returns {Promise} Promise object represents operation result
 */
export const addVacanciesForFreelancer = async (id, vacanciesToAdd) => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/addVacancyForFreelancer/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vacanciesToAdd)
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
 * Removes vacancies from freelancer
 *
 * @param {Number} id freelancer id
 * @param {Array} vacanciesToDelete Array of vacancies' objects
 * @returns {Promise} Promise object represents operation result
 */
export const deleteVacanciesFromFreelancer = async (id, vacanciesToDelete) => {
  const token = getToken();
  try {
    const response = await fetch(
      `${URL}/main/deleteVacancyForFreelancer/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(vacanciesToDelete)
      }
    );
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error while fetching: ${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches freelancer's candidates by platform
 *
 * @param {Number} platformId platform id
 * @returns {Promise} Promise object represents operation result
 */
export const getCandidates = async platformId => {
  const token = getToken();
  try {
    const response = await fetch(
      `${URL}/main/viewCandForVacFreelancer/${platformId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      }
    );
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error while fetching: ${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Sends candidate on vacancy
 *
 * @param {Object} content
 * @returns {Promise} Promise object represents operation result
 */
export const sendCandidateForVacancy = async content => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/sendCandFreelancer`, {
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
    throw new Error(`Error while fetching: ${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Changes recruiter for freelancer
 *
 * @param {Object} content
 * @returns {Promise} Promise object represents operation result
 */
export const updateRecruiterForFreelancer = async content => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/admin/updateRecruiter`, {
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
    throw new Error(`Error while fetching: ${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 * Fetches data for Send resume form
 *
 * @param {Number} candidateId candidate id
 * @param {Number} vacancyId vacancy id
 * @returns {Promise} Promise object represents operation result
 */
export const getDataForSendResumeForm = (candidateId, vacancyId) => {
  const token = getToken();
  return fetch(`${URL}/interview/viewInformationForSendCV/${candidateId}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vacancyId)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.statusText}`);
    })
    .then(data => {
      const candidateId = data.candId;

      const objCompany = data.companies;
      const companies = Object.values(objCompany);

      const emailTemplate = data.emailTemplay.text;
      const emailSubject = data.subject;

      const dataForSendResume = {
        candidateId,
        companies,
        emailTemplate,
        emailSubject
      };

      return dataForSendResume;
    })
    .catch(error => console.log("error in fetch: ", error));
};

/**
 * Filters vacancies
 *
 * @param {Number} id freelancer id
 * @param {Object} filter object of selected platforms, seniorities, companies
 * @returns {Promise} Promise object represents operation result
 */
export const filterFreelancerVacancies = async (id, filter) => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/vacancyForFreelancer/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filter)
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error while fetching: ${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};
