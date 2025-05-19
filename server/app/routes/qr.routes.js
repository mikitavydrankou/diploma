import db from "../models/index.js";
const QRCounter = db.QRCounter;
const routes = function (app) {
    app.get("/qr/:code", async (req, res) => {
        const code = req.params.code;

        try {
            const qr = await QRCounter.findOne({ where: { code } });

            if (!qr) {
                return res.status(404).send("QR code not found");
            }

            await QRCounter.increment("hits", { where: { code } });
            res.redirect(302, "https://kortowo.ninja/");
        } catch (error) {
            console.error("Error в QR-counter:", error);
            res.status(500).send(
                "Jakiś błąd, sprobuj podłączyć się na - kortowo.ninja"
            );
        }
    });
};

export default routes;
