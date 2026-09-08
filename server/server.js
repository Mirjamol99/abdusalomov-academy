require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Abdusalomov Academy Server ishlayapti 🚀"
    });
});

app.post("/send-message", async (req, res) => {

    console.log("KELGAN DATA:", req.body);

    const name = req.body.name || "Noma'lum";
    const phone = req.body.phone || req.body.tel || req.body.email || "Telefon kiritilmagan";
    const message = req.body.message || "Xabar kiritilmagan";

    console.log("Ism:", name);
    console.log("Telefon:", phone);
    console.log("Xabar:", message);

    const text = `
📩 Abdusalomov Academy — yangi xabar!

👤 Ism: ${name}
📞 Telefon: ${phone}

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

        console.log("Telegram javobi:", data);

        if (!data.ok) {

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

        console.error("XATOLIK:", error);

        res.status(500).json({
            success: false,
            message: "Telegramga ulanishda xatolik"
        });

    }
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti 🚀`);
});