let Config = {
  /**
   * front-end url
   */
  BASE_URL:"http://127.0.0.1:3000",

  /**
   * back-end api url
   */
  API_URL:"http://127.0.0.1:5000/api",

  /**
   * init firebaase config
   */
  firebase : {
    apiKey: "AIzaSyAHY-GrlGQi3-cFu9YniDeKCcjDI-ftdkM",
    authDomain: "ecoapp-c158c.firebaseapp.com",
    databaseURL: "https://ecoapp-c158c-default-rtdb.firebaseio.com",
    projectId: "ecoapp-c158c",
    storageBucket: "ecoapp-c158c.appspot.com",
    messagingSenderId: "163892247146",
    appId: "1:163892247146:web:97bf1a7e08f0cd434ba813",
    measurementId: "G-VZJPZ06WHD"
  },
  /**
   * int regex
   */
  regex:{
    email : "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/",
    password: "/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/"
  }
};

export default Config;