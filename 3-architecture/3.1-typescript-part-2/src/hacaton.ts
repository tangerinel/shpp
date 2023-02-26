"use strict";
import express, { Express, Router } from "express";
import { Request, Response } from "express";
import { join } from "path";
import bodyParser from "body-parser";
const app: Express = express();

const PORT = 3003;

enum Buttons {
    MINUS = "MINUS",
    PLUS = "PLUS"
  }



app.use(express.static(join(__dirname, "../static/")));
app.use(bodyParser.json());

let minusClicked = 0;
let plusClicked = 0;

const pressButton = (req: Request, res: Response) : Response | undefined =>{
    let clickedBtn = req.body?.clickedButton;
    if (!clickedBtn) return res.status(500).json({ error: "error" });
    clickedBtn === Buttons.MINUS ? minusClicked++ : plusClicked++;
    enum ButtonsClicked {
        MINUS = minusClicked,
        PLUS = plusClicked,
    }
    res.json({buttons: ButtonsClicked});
}

app.post('/action', pressButton);



app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))