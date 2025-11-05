document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const currentPage = body.dataset.page;

  document.querySelectorAll(".nav-links a[data-page]").forEach((link) => {
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

  const vulnerabilityFeed = document.querySelector("#vulnerability-feed");
  if (vulnerabilityFeed) {
    const feedItems = [
      {
        title: "Authorization bypass on billing API",
        researcher: "@arielle",
        severity: "High",
        reward: "Reputation + 45 pts",
        timeAgo: "6h ago",
      },
      {
        title: "Reflected XSS on support portal",
        researcher: "@kaito",
        severity: "Medium",
        reward: "Reputation + 20 pts",
        timeAgo: "11h ago",
      },
      {
        title: "SSRF to internal metadata",
        researcher: "@trace",
        severity: "Critical",
        reward: "Reputation + 60 pts",
        timeAgo: "1d ago",
      },
      {
        title: "Broken object level authorization",
        researcher: "@linnea",
        severity: "High",
        reward: "Reputation + 40 pts",
        timeAgo: "2d ago",
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
            <footer>Recognition: <strong>${item.reward}</strong></footer>
          </article>
        `
      )
      .join("");
  }

  document.querySelectorAll(".badge").forEach((badge) => {
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
        status: "In review",
      },
      {
        id: "BBP-4792",
        title: "Privilege escalation in workflow",
        severity: "Critical",
        sla: "01:54:18",
        status: "Triaged",
      },
      {
        id: "BBP-4688",
        title: "Webhook auth bypass",
        severity: "Medium",
        sla: "07:03:57",
        status: "Awaiting fix",
      },
      {
        id: "BBP-4590",
        title: "Sensitive data exposure",
        severity: "High",
        sla: "05:42:09",
        status: "Resolved",
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
        title: "Planning & Scope Alignment",
        copy: "We refine objectives, confirm assets, and agree on communication channels.",
      },
      {
        label: "Week 2",
        title: "Manual Testing & Analysis",
        copy: "Consultants execute targeted tests, document findings, and collaborate with SecuryHub analysts.",
      },
      {
        label: "Week 3",
        title: "Validation & Reporting",
        copy: "Evidence is gathered, severities confirmed, and draft reports reviewed with your stakeholders.",
      },
      {
        label: "Week 4",
        title: "Retest & Executive Brief",
        copy: "Fixes are retested, attestations prepared, and recommendations aligned with your roadmap.",
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
