require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const connectDB = require("./config/db");
const User = require("./models/userModel");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos?.[0]?.value || "",
            loginMethod: "google",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Authentication Routes

// Manual Login Route

app.post("/api/auth/login", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // ✅ Create new manual user
      user = await User.create({
        name,
        email,
        loginMethod: "manual",
      });
    } else {
      // ✅ Fix legacy users + update name
      user.name = name;

      if (!user.loginMethod) {
        user.loginMethod = "manual";
      }

      await user.save();
    }

    // ✅ Log the user in (passport session)
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to login" });
      }

      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo || "",
          level: user.level || undefined,
          assessmentComplete: user.assessmentComplete || false,
        },
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});


// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect("http://localhost:3000");
  }
);

// Get current user
app.get("/api/auth/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ user: null });
  }

  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      photo: req.user.photo || "",
      level: req.user.level || undefined,
      assessmentComplete: req.user.assessmentComplete || false,
    },
  });
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    req.session.destroy();
    res.json({ success: true });
  });
});

// User Update Routes

// Update user level
app.put("/api/user/level", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { level } = req.body;

    if (!level || !["beginner", "intermediate", "advanced"].includes(level)) {
      return res.status(400).json({ error: "Invalid level" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.level = level;
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo || "",
        level: user.level,
        assessmentComplete: user.assessmentComplete || false,
      },
    });
  } catch (error) {
    console.error("Update level error:", error);
    res.status(500).json({ error: "Server error updating level" });
  }
});

// Update assessment completion
app.put("/api/user/assessment", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { assessmentComplete } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.assessmentComplete = assessmentComplete;
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo || "",
        level: user.level,
        assessmentComplete: user.assessmentComplete,
      },
    });
  } catch (error) {
    console.error("Update assessment error:", error);
    res.status(500).json({ error: "Server error updating assessment" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("English Tutorial Bot API is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});