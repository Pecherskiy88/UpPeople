const URL = "http://192.168.1.88:8000/api";
const getToken = () => localStorage.getItem("token");

/**
 * Fetches all users from an api
 *
 * @returns {Promise} Promise object represents operation result
 */
export const getUsers = () => {
  const token = getToken();

  return fetch(`${URL}/admin/all-staff`, {
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
      const users = {
        staff: data.users,
        partners: data.partners,
        freelancers: data.freeLancers
      };

      return users;
    })
    .catch(error => console.log("error in fetch: ", error));
};
