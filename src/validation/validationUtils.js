export function checkEmail(email) {
  if (email === "") return { field: "email", message: "Email cannot be empty" };
  else {
    const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
    if (emailRegex.test(email)) return null;
    return { field: "email", message: "Email is not valid" };
  }
}

export function checkName(name) {
  if (name.length == 0)
    return { field: "name", message: "Name cannot be empty" };
  else {
    const handleRegex = /^[a-zA-Z\s]+$/;
    if (handleRegex.test(name)) return null;
    return {
      field: "name",
      message: "Name should only contain alphabets",
    };
  }
}

export function checkPassword(password) {
  if (password === "") {
    return { field: "password", message: "Password should not be empty" };
  } else {
    let passwordRegex = /^[a-zA-Z0-9$-_#!&*]{5,}$/;
    if (!passwordRegex.test(password)) {
      return {
        field: "password",
        message: "Password should be atleast 5 characters long",
      };
    }
    return null;
  }
}
