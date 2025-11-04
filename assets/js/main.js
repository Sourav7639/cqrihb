document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const currentPage = body.dataset.page;

  const navLinks = document.querySelectorAll(".nav-links a[data-page]");
  navLinks.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.querySelector(".nav-links")?.classList.toggle("open");
    });
  }

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      item?.classList.toggle("open");
    });
  });

  const contactForms = document.querySelectorAll("form[data-form]");
  contactForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = form.querySelector(".form-message");
      if (!message) return;

      const requiredFields = Array.from(form.querySelectorAll("[data-required]"));
      const emptyField = requiredFields.find((field) => !field.value.trim());
      if (emptyField) {
        message.textContent = "Please complete all required fields before submitting.";
        message.classList.remove("success");
        message.classList.add("error");
        message.hidden = false;
        emptyField.focus();
        return;
      }

      message.textContent = form.dataset.success || "We received your request and will follow up shortly.";
      message.classList.remove("error");
      message.classList.add("success");
      message.hidden = false;
      form.reset();
    });
  });

  const vulnerabilityFeed = document.querySelector("#vulnerability-feed");
  if (vulnerabilityFeed) {
    const feedItems = [
      {
        title: "Blind SSRF Chain",
        researcher: "@n3tw0rk",
        severity: "Critical",
        reward: "$12,500",
        timeAgo: "2h ago",
      },
      {
        title: "AI triage bypass",
        researcher: "@zerodaykat",
        severity: "High",
        reward: "$6,750",
        timeAgo: "5h ago",
      },
      {
        title: "S3 bucket takeover",
        researcher: "@cloudpoet",
        severity: "Medium",
        reward: "$2,100",
        timeAgo: "9h ago",
      },
      {
        title: "JWT desync",
        researcher: "@cipherline",
        severity: "Critical",
        reward: "$9,800",
        timeAgo: "12h ago",
      },
    ];

    vulnerabilityFeed.innerHTML = feedItems
      .map(
        (item) => `
          <article class="feed-item">
            <header>
              <strong>${item.title}</strong>
              <span class="badge severity-${item.severity.toLowerCase()}">${item.severity}</span>
            </header>
            <p class="muted">Reported by <span>${item.researcher}</span> · ${item.timeAgo}</p>
            <footer>Rewarded <strong>${item.reward}</strong></footer>
          </article>
        `
      )
      .join("");
  }

  const severityBadges = document.querySelectorAll(".badge");
  severityBadges.forEach((badge) => {
    if (badge.textContent.toLowerCase().includes("critical")) {
      badge.classList.add("danger");
    }
    if (badge.textContent.toLowerCase().includes("high")) {
      badge.classList.add("warning");
    }
  });

  const dashboardTable = document.querySelector("#triage-table tbody");
  if (dashboardTable) {
    const queue = [
      {
        id: "BBP-4821",
        title: "GraphQL introspection exposed",
        severity: "High",
        sla: "03:12:42",
        status: "AI prioritized",
      },
      {
        id: "BBP-4792",
        title: "Privilege escalation in workflow",
        severity: "Critical",
        sla: "01:54:18",
        status: "Awaiting validation",
      },
      {
        id: "BBP-4688",
        title: "Webhook auth bypass",
        severity: "Medium",
        sla: "07:03:57",
        status: "Fix in progress",
      },
      {
        id: "BBP-4590",
        title: "Sensitive data exposure",
        severity: "High",
        sla: "05:42:09",
        status: "Patched",
      },
    ];

    dashboardTable.innerHTML = queue
      .map(
        (item) => `
          <tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td><span class="badge">${item.severity}</span></td>
            <td>${item.sla}</td>
            <td>${item.status}</td>
          </tr>
        `
      )
      .join("");
  }

  const timeline = document.querySelector(".timeline[data-timeline='pentest']");
  if (timeline) {
    const phases = [
      {
        label: "Week 1",
        title: "Intelligence & Threat Modeling",
        copy: "We map your attack surface, define abuse cases, and align scope with compliance requirements.",
      },
      {
        label: "Week 2",
        title: "Manual Exploitation",
        copy: "Senior researchers pair with the AI triage engine to focus on the most promising paths to impact.",
      },
      {
        label: "Week 3",
        title: "Findings Playback",
        copy: "We deliver reproductions, risk summaries, and remediation workshops tailored to your engineering teams.",
      },
      {
        label: "Week 4",
        title: "Verification & Certificate",
        copy: "Our analysts verify fixes, generate compliance-grade attestations, and unlock marketing badges.",
      },
    ];

    timeline.innerHTML = phases
      .map(
        (phase) => `
          <div class="timeline-item">
            <strong>${phase.label}</strong>
            <div>
              <h4>${phase.title}</h4>
              <p>${phase.copy}</p>
            </div>
          </div>
        `
      )
      .join("");
  }
});
