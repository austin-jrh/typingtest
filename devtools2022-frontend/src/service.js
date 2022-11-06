const profileURL = "http://localhost:3001/profiles";
const testsURL = "http://localhost:3001/tests";

class Service {
  // Get posts
  static async getData(url) {
    try {
      let response = await fetch(url);
      if(response.status === 200) {
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

  static async getTest(_owner, _id) {
    await fetch(
      testsURL +
        "/test" +
        new URLSearchParams({
          owner: _owner,
          id: _id,
        }),
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data.row;
      })
      .catch((error) => {
        console.error("Error", error);
      });
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
}

export default Service;