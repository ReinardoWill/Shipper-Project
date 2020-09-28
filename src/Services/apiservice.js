import axios from "axios";

const API_URL = "https://randomuser.me/api/?results=30";


class ApiService {


  	fetchUsers() {
	    return axios
	      .get(API_URL)
	      .then(response => {
	        return response.data;
	    });
  	}

}

export default new ApiService();
