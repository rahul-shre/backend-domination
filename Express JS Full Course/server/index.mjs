import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data for users
const mockUsers = [
  {
    id: 1,
    user: "Mike",
    displayName: "Tyson",
  },
  {
    id: 2,
    user: "John",
    displayName: "doe",
  },
];

// routes
app.get("/", (req, res) => {
  res.status(201).json({
    message: "Hello",
  });
});

app.get("/api/products", (req, res) => {
  res.status(201).send([
    {
      id: 1,
      productName: "Mutton",
      price: 1200,
    },
    {
      id: 2,
      productName: "Chicken",
      price: 500,
    },
  ]);
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  // when filter and value are undefined
  if (!filter && !value) return res.send(mockUsers);
  if (filter && value) {
    const filteredUsers = mockUsers.filter(
      (user) =>
        user[filter] && user[filter].toLowerCase().includes(value.toLowerCase())
    );
    return res.status(200).send(filteredUsers);
  }
});

app.post("/api/users", (req, res) => {
  const { userDetail } = req.body;
  console.log(userDetail);
  console.log("Received userDetail:", userDetail);

  if (!userDetail || !userDetail.user || !userDetail.displayName) {
    return res.status(400).json({ message: "Invalid user detail" });
  }
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...userDetail,
  };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/users/:id", (req, res) => {
  let parsedParams = parseInt(req.params.id);
  if (isNaN(parsedParams))
    return res.status(404).send({ message: "Invalid Id" });

  const findUsers = mockUsers.find((user) => user.id == parsedParams);
  if (!findUsers) return res.status(404).send({ message: "User not found" });
  return res.status(200).send(findUsers);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
