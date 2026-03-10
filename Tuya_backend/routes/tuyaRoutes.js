const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const https = require("https");

// 🔐 Credentials
const ACCESS_ID = "dcpgdsjay9q7hjcv4qvr";
const ACCESS_SECRET = "9e972a4b0b09480ea8e45c5c0eef4c0c";
const BASE_URL = "https://openapi.tuyain.com";

// 🔌 Device IDs
const DEVICES = {
  light: "d78a835111d2a5b1ecm5ep",
  fan: "d7d60ff251f58c6d02qo0q",
};

const httpsAgent = new https.Agent({ family: 4 });

// ---------- SIGNING LOGIC ----------
function sign(method, path, body = "", access_token = "") {
  const t = Date.now().toString();
  const contentHash = crypto.createHash("sha256").update(body).digest("hex");
  const stringToSign = method + "\n" + contentHash + "\n\n" + path;
  const signStr = access_token
    ? ACCESS_ID + access_token + t + stringToSign
    : ACCESS_ID + t + stringToSign;
  return {
    signature: crypto
      .createHmac("sha256", ACCESS_SECRET)
      .update(signStr)
      .digest("hex")
      .toUpperCase(),
    t,
  };
}

// ---------- GET TOKEN ----------
async function getToken() {
  const path = "/v1.0/token?grant_type=1";
  const { signature, t } = sign("GET", path);
  try {
    const res = await axios.get(BASE_URL + path, {
      headers: {
        client_id: ACCESS_ID,
        sign: signature,
        t,
        sign_method: "HMAC-SHA256",
      },
      httpsAgent,
    });
    return res.data.result.access_token;
  } catch (err) {
    console.error("Token Fetch Error:", err.message);
    throw new Error("Token failed");
  }
}

// ---------- TOGGLE ROUTE ----------
// Matches: /tuya/:name/:state/:id?
router.get("/:name/:state/:id?", async (req, res) => {
  try {
    const { name, state, id } = req.params;
    const deviceId = DEVICES[name];
    const isOn = state === "on";

    if (!deviceId) return res.status(404).json({ error: "Device not found" });

    const token = await getToken();
    const path = `/v1.0/devices/${deviceId}/commands`;

    // 💡 Matching your working initial logic exactly
    let code = "switch_1";
    if (name === "light") {
      code = id ? `switch_${id}` : "switch_1";
    } else if (name === "fan") {
      code = "switch";
    }

    const body = JSON.stringify({ commands: [{ code: code, value: isOn }] });
    const { signature, t } = sign("POST", path, body, token);

    const result = await axios.post(BASE_URL + path, body, {
      headers: {
        client_id: ACCESS_ID,
        access_token: token,
        sign: signature,
        t,
        "Content-Type": "application/json",
        sign_method: "HMAC-SHA256", // 👈 Crucial fix for 502 errors
      },
      httpsAgent,
    });

    console.log(
      `📡 [TUYA] ${name.toUpperCase()} (${code}) -> ${state}`,
      result.data.success ? "✅" : "❌",
    );
    res.json(result.data);
  } catch (err) {
    console.error("Tuya Route Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
