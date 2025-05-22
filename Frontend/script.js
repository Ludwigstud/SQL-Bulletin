const apiUrl = "http://localhost:3000";

// Create user
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;

  const res = await fetch(`${apiUrl}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("User created!");
  } else alert(`Error: ${data.error}`);
});

// Create channel
document.getElementById("channelForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("channelName").value;
  const owner_id = document.getElementById("channelOwner").value;

  const res = await fetch(`${apiUrl}/api/channels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, owner_id }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Channel created!");
  } else {
    alert(`Error: ${data.error}`);
  }
});

// Send message
document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = document.getElementById("messageContent").value;
  const channel_id = document.getElementById("messageChannel").value;
  const author_id = document.getElementById("messageAuthor").value;

  const res = await fetch(`${apiUrl}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, channel_id, author_id }),
  });

  const data = await res.json();
  if (res.ok) {
    alert(`Message sent by ${author_id}`);
  } else {
    alert(`Error: ${data.error}`);
  }
});

// View messages
document.getElementById("loadMessages").addEventListener("click", async () => {
  const channelId = document.getElementById("viewChannelId").value;
  const userId = document.getElementById("viewUserId").value;
  const res = await fetch(
    `${apiUrl}/api/channels/${channelId}/messages?user_id=${userId}`
  );
  const messages = await res.json();
  const list = document.getElementById("messageList");
  list.innerHTML = "";
  if (Array.isArray(messages)) {
    messages.forEach((msg) => {
      const li = document.createElement("li");
      li.textContent = `${msg.content}`;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = `<li>${messages.error || "No messages found."}</li>`;
  }
});

// Subscribe to channel
document.getElementById("subscribeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user_id = document.getElementById("subscribeUserId").value;
    const channel_id = document.getElementById("subscribeChannelId").value;

    const res = await fetch(`${apiUrl}/api/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, channel_id }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Subscribed to channel!");
    } else {
      alert(`Error: ${data.error}`);
    }
  });

// Show subscribed channels
document.getElementById("loadUserChannels").addEventListener("click", async () => {
  const userId = document.getElementById("viewUserChannelsUserId").value;
  if (!userId) return alert("Please enter user ID");

  const res = await fetch(`${apiUrl}/api/users/${userId}/channels`);
  const channels = await res.json();
  const list = document.getElementById("userChannelList");
  list.innerHTML = "";
  if (Array.isArray(channels)) {
    channels.forEach((channel) => {
      const li = document.createElement("li");
      li.textContent = `${channel.name}`;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = `<li>${channels.error}</li>`;
  }
});

function showSection(sectionId) {
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

// Navigation event
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.dataset.route);
    window.location.hash = btn.dataset.route;
  });
});

// Show # section
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.replace("#", "") || "userSection";
  showSection(hash);
});

// On hash change
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "") || "userSection";
  showSection(hash);
});
