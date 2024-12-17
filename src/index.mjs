import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser("Hello World!"));
app.use(session({
    secret: "Michael-cmd-sys",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}...`);
});
