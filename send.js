export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { ip, ua, lang, time } = req.body;

  const payload = {
    content: "**📡 تم تسجيل دخول جديد:**",
    embeds: [{
      title: "📱 معلومات الجهاز:",
      color: 3447003,
      fields: [
        { name: "🌐 Public IP", value: ip || "غير معروف" },
        { name: "🕹️ User Agent", value: ua },
        { name: "🌍 اللغة", value: lang },
        { name: "🕒 الوقت", value: time }
      ]
    }]
  };

  try {
    await fetch("https://discord.com/api/webhooks/1398422531484024994/w2yUgCVfvBjqOadNjx0cmHCqdCZBWzxP0tBQnBgSqwpc-ELClMzGSd1uKRoncp9GJf_T", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
