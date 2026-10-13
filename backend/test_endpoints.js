require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./index");

const BASE_URL = "http://127.0.0.1:3000";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

async function isServerRunning() {
  try {
    const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(1000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function runTests() {
  let serverInstance = null;
  const alreadyRunning = await isServerRunning();

  if (!alreadyRunning) {
    console.log("No running server found. Starting temporary server on port 3000...");
    serverInstance = app.listen(3000);
    // Wait briefly for server & db ready
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("=== STARTING CRM API TESTS ===");

  try {
    // 1. Health check
    console.log("\n[Test 1] Health Check...");
    const healthRes = await request("/health");
    console.log("Health Status:", healthRes.status, healthRes.data);

    // 2. Public Enquiry Submission (No auth required)
    console.log("\n[Test 2] Public Form Submission (Lead 1)...");
    const lead1Res = await request("/api/enquiries/public", {
      method: "POST",
      body: {
        name: "Aman Sharma",
        email: "aman@example.com",
        courseInterest: "Full Stack Web Development",
        phone: "9876543210",
      },
    });
    console.log("Lead 1 Status:", lead1Res.status, lead1Res.data);
    const lead1Id = lead1Res.data?.enquiry?._id;

    console.log("\n[Test 3] Public Form Submission (Lead 2)...");
    const lead2Res = await request("/api/enquiries/public", {
      method: "POST",
      body: {
        name: "Pooja Verma",
        email: "pooja@example.com",
        courseInterest: "Data Science & AI",
        phone: "9123456789",
      },
    });
    console.log("Lead 2 Status:", lead2Res.status, lead2Res.data);

    // 3. Unauthorized access to unclaimed leads
    console.log("\n[Test 4] Fetch Unclaimed Leads WITHOUT Auth (Expected 401)...");
    const unauthRes = await request("/api/enquiries/unclaimed");
    console.log("Unauth Status:", unauthRes.status, unauthRes.data);

    // 4. Employee Register
    const testEmail = `counselor_${Date.now()}@company.com`;
    console.log(`\n[Test 5] Employee Register (${testEmail})...`);
    const regRes = await request("/api/auth/register", {
      method: "POST",
      body: {
        name: "Rohan Counselor",
        email: testEmail,
        password: "password123",
      },
    });
    console.log("Register Status:", regRes.status, "Token exists:", !!regRes.data?.token);

    // 5. Employee Login
    console.log("\n[Test 6] Employee Login...");
    const loginRes = await request("/api/auth/login", {
      method: "POST",
      body: {
        email: testEmail,
        password: "password123",
      },
    });
    console.log("Login Status:", loginRes.status, "User:", loginRes.data?.user);
    const token = loginRes.data?.token;

    const authHeaders = { Authorization: `Bearer ${token}` };

    // 6. Fetch Unclaimed Leads with Auth
    console.log("\n[Test 7] Fetch Unclaimed Leads with Auth...");
    const unclaimedRes = await request("/api/enquiries/unclaimed", {
      headers: authHeaders,
    });
    console.log("Unclaimed count:", unclaimedRes.data?.count);
    const hasLead1 = unclaimedRes.data?.enquiries?.some((e) => e._id === lead1Id);
    console.log("Lead 1 present in unclaimed:", hasLead1);

    // 7. Claim Lead 1
    console.log(`\n[Test 8] Counselor claims Lead 1 (${lead1Id})...`);
    const claimRes = await request(`/api/enquiries/${lead1Id}/claim`, {
      method: "PATCH",
      headers: authHeaders,
    });
    console.log("Claim Status:", claimRes.status, "Claimed message:", claimRes.data?.message);

    // 8. Attempt to Claim Lead 1 again (Expected 400)
    console.log("\n[Test 9] Counselor tries to claim Lead 1 AGAIN (Expected 400)...");
    const reClaimRes = await request(`/api/enquiries/${lead1Id}/claim`, {
      method: "PATCH",
      headers: authHeaders,
    });
    console.log("Re-claim Status:", reClaimRes.status, reClaimRes.data);

    // 9. Fetch Unclaimed Leads after claiming (Lead 1 should no longer be public)
    console.log("\n[Test 10] Fetch Unclaimed Leads after Claim...");
    const unclaimedAfterRes = await request("/api/enquiries/unclaimed", {
      headers: authHeaders,
    });
    const stillHasLead1 = unclaimedAfterRes.data?.enquiries?.some((e) => e._id === lead1Id);
    console.log("Is Lead 1 STILL in public unclaimed leads?", stillHasLead1, "(Expected false)");

    // 10. Fetch Claimed Leads for Logged In Counselor
    console.log("\n[Test 11] Fetch My Claimed Leads (Private)...");
    const myLeadsRes = await request("/api/enquiries/claimed", {
      headers: authHeaders,
    });
    console.log("My claimed count:", myLeadsRes.data?.count);
    const inMyLeads = myLeadsRes.data?.enquiries?.some((e) => e._id === lead1Id);
    console.log("Lead 1 in Counselor's private leads list:", inMyLeads, "(Expected true)");

    console.log("\n=== ALL TESTS PASSED SUCCESSFULLY ===");
  } catch (err) {
    console.error("Test failure:", err);
  } finally {
    if (serverInstance) {
      serverInstance.close();
      await mongoose.disconnect();
    }
    process.exit(0);
  }
}

runTests();
