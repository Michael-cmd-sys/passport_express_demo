import express from "express";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import passport from "passport";
import { MOCK_USERS as USERS} from "./utils/constants.mjs";
import { getFilteredData } from "./utils/lib.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(cookieParser("Hello World!"));
// app.use(session({
//     secret: "Michael-cmd-sys",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 60000 * 60,
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/api/users/", (req, res)=>{
    if (req.query) {
        const [ results, err ] = getFilteredData(req.query, USERS);

        if ( err ) return res.status(200).send(USERS);

        return res.status(200).send(results);

    }

   res.status(200).send(USERS);
});

app.get("/api/users/:id", (req, res)=>{
    const _id = parseInt(req.params.id);
    if (isNaN(_id)) res.status(400).send({msg: "Error - Bad request! Invalid ID"});
    const user = USERS.find(user => user.id === _id);
    if (!user)  res.status(404).send({msg: "Error - User not found!"});
    res.status(200).send(user);
})

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}...`);
});
