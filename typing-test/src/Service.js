const profileURL = "http://18.143.123.0:3001/profiles";
const testsURL = "http://18.143.123.0:3001/tests";
const testIdURL = "http://18.143.123.0:3001/testID"

class Service {
  // Get posts
  static async getData(url) {
    try {
      let response = await fetch(url);
      if (response.status === 200) {
        try {
          let data = await response.json();
          return data.rows
        }
        catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  static async getTests() {
    return await Service.getData(testsURL)
  }

  static async getProfiles() {
    return await Service.getData(profileURL)
  }

  static async getTestsFromUser(_owner) {
    const response = await fetch(testsURL + "/test?" + new URLSearchParams({
      owner: _owner
    }), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data)
    return data
  }

  static async getTestByID(_id) {
    const response = await fetch(testIdURL + "/?" + new URLSearchParams({
      id: _id
    }), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  }

  static async createTest(data) {
    try {
      await fetch(testsURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  static async editTest(data) {
    await fetch(testsURL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Error ", error);
    });
  }

  static async deleteTest(_owner, _id) {
    let url =
      testsURL +
      "/test?" +
      new URLSearchParams({ owner: _owner, id: _id });
    await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error("Error", error);
    });
  }

  static async createUser(user) {
    const response = await fetch(profileURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    const data = await response.json();
    return data
  }

  static async loginUser(user) {
    let url = profileURL + "/profile?" + new URLSearchParams({ login: user.login, password: user.password });
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.status === 204) {
      return null
    }
    const data = await response.json();
    return data
  }

  static async updateUser(user) {
    const response = await fetch(profileURL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    const data = await response.json();
    return data
  }
}

export default Service;
