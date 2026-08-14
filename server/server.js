require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/send-message", async (req, res) => {

    const { name, email, message } = req.body;

    console.log("Yangi xabar:");
    console.log("Ism:", name);
    console.log("Email:", email);
    console.log("Xabar:", message);

    const text = `
📩 Abdusalomov Academy — yangi xabar!

👤 Ism: ${name}
📧 Email: ${email}

💬 Xabar:
${message}
`;

    try {

        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text
                })
            }
        );

        const data = await response.json();

        if (!data.ok) {

            console.log("Telegram xatosi:", data);

            return res.status(500).json({
                success: false,
                message: "Telegramga yuborilmadi"
            });
        }

        res.json({
            success: true,
            message: "Xabar Telegramga yuborildi!"
        });

    } catch (error) {

        console.error("Telegram ulanish xatosi:", error);

        res.status(500).json({
            success: false,
            message: "Telegramga ulanishda xatolik"
        });

    }

});

app.listen(PORT, () => {

    console.log(
        `Server http://localhost:${PORT} da ishlayapti`
    );

});