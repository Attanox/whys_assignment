// src/server.ts

import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";

const prisma = new PrismaClient();
const app = express();

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

// Error handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

const router = express.Router();

// configure app.use()
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use("/api", router);

router.get("/post/", async (req, res) => {
  prisma.$connect();
  const posts = await prisma.post.findMany();
  res.status(200).json({
    posts,
  });

  prisma.$disconnect();
});

router.post("/post/", async (req, res) => {
  if (!req.body?.title) {
    res.status(403).json({
      status: "ERROR",
      message: "Title is required",
    });
    return;
  }

  if (!req.body?.text) {
    res.status(403).json({
      status: "ERROR",
      message: "Text is required",
    });
    return;
  }

  prisma.$connect();
  await prisma.post.create({
    data: {
      title: String(req.body?.title || ""),
      text: String(req.body?.text || ""),
    },
  });
  res.status(200).json({
    status: "OK",
    message: "Succesfully added new record.",
  });
  prisma.$disconnect();
});

router.delete("/post/:id/", async (req, res) => {
  if (!req.params?.id) {
    res.status(403).send({
      status: "ERROR",
      message: "ID is required",
    });
    return;
  }

  try {
    prisma.$connect();
    await prisma.post.delete({
      where: {
        id: Number(req.params?.id),
      },
    });
    res.status(200).json({
      status: "OK",
      message: "Succesfully deleted record.",
    });
    prisma.$disconnect();
  } catch (e) {
    res.status(500).json({
      status: "ERROR",
      message: "Something went wrong.",
    });
  }
});

router.patch("/post/:id/", async (req, res) => {
  if (!req.params?.id) {
    res.status(403).send({
      status: "ERROR",
      message: "ID is required",
    });
    return;
  }

  if (!req.body?.title && !req.body?.text) {
    res.status(403).json({
      status: "ERROR",
      message: "Title or Text is required",
    });
    return;
  }

  const titleData = req.body?.title
    ? {
        title: String(req.body.title || ""),
      }
    : {};

  const textData = req.body?.text
    ? {
        text: String(req.body.text || ""),
      }
    : {};

  try {
    prisma.$connect();
    await prisma.post.update({
      where: {
        id: Number(req.params?.id),
      },
      data: {
        ...titleData,
        ...textData,
      },
    });
    res.status(200).json({
      status: "OK",
      message: "Succesfully patched record.",
    });
    prisma.$disconnect();
  } catch (e) {
    res.status(500).json({
      status: "ERROR",
      message: "Something went wrong.",
    });
  }
});

app.listen(8000, function () {
  console.log("👂 listening on http://localhost:8000/");
});
