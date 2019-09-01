// import express from "express";
// import path from "path";
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const router = express.Router();

// const staticFiles = express.static(path.join(__dirname, "../../frontend/build"));
// app.use(staticFiles);

// // Example API call - To remove
// router.get("/api/hello", (req, res) =>
//   res.json({
//     name: "sukara"
//   })
// );

// app.use(router);

// // any routes not picked up by the server api will be handled by the react router
// app.use("/*", staticFiles);

// app.set("port", process.env.PORT || 3001);
// app.listen(app.get("port"), () => {
//   console.log(`Listening on ${app.get("port")}`);
// });
