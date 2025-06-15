const chatBox = document.getElementById("chat-box");
const form = document.getElementById("input-form");
const input = document.getElementById("user-input");

function appendMessage(sender, message, className) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", className);
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(message) {
  appendMessage("You", message, "user");

  const thinking = document.createElement("div");
  thinking.classList.add("message", "mia");
  thinking.textContent = "Mia is thinking...";
  chatBox.appendChild(thinking);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Mia, a helpful and intelligent assistant for a car service and auto dealership app. Answer clearly and concisely." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, Mia couldn’t understand that.";

    thinking.remove();
    appendMessage("Mia", reply, "mia");
  } catch (err) {
    thinking.remove();
    appendMessage("Mia", "⚠️ There was a problem reaching the AI. Please try again later.", "mia");
    console.error("Mia error:", err);
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const message = input.value.trim();
  if (message !== "") {
    sendMessage(message);
    input.value = "";
  }
});
