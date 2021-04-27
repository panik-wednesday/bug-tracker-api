const request = require("supertest");
const app = require("../src/app.js");
const User = require("../src/models/user.js");

test("Should register a new user properly", async () => {
  
  await User.deleteMany({}); // delete all users

  const response = await request(app).post("/users/register")
  .send({
    username: "bugmaster21",
    password: "bugboy"
  })
  .expect(201);

  const user = await User.findOne(response.body.user_id)
  expect(user).not.toBeNull();
  
  // Checks if password is hashed
  expect(response.body.user.password).not.toBe("bugboy");
});

test("Should login existing user", async () => {
  const response = await request(app).post("/users/login")
  .send({
    username: "bugmaster21",
    password: "bugboy"
  })
  .expect(200);
});

test("Should not login not registered user", async () => {
  await request(app).post("/users/login")
  .send({
    username: "missingbugboy",
    password: "shouldnot"
  })
  .expect(400);
});

