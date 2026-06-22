# Connect the “Join Our Network” form to your Google Sheet

This guide shows you, step by step, how to make the freelancer application
form on **globalannotate.com/freelancers** save every submission straight
into your **Roster** Google Sheet — for free, with no third-party form
service.

You do **not** need to know how to code. You’ll copy and paste one block of
code, click a few buttons, and paste one link into Vercel.

**Total time:** about 10 minutes.

---

## How it works (the 30-second version)

1. Your Google Sheet gets a tiny “web app” attached to it (Google Apps Script).
2. The web app has a secret URL.
3. When someone submits the form on your website, the website quietly sends
   their answers to that URL.
4. The web app writes a new row in your sheet — automatically dated, with
   **Status** set to **New**.

---

## Before you start: check your sheet’s header row

Open your Roster sheet. The **first row** must have these column headings,
in **this exact order**, left to right:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Date Added | Full Name | Email | Country | Time Zone | Native Language | Language Pairs | Services | Specializations | Years Exp. | CAT Tools | Rate (per word) | Rate (per hour) | Currency | LinkedIn/Website | CV/Portfolio Link | Status | Rating | Notes |

> The code writes data into columns in this order. If your headings are in a
> different order, either reorder them to match the table above, or tell me
> and I’ll adjust the code.

Also note the **name of the tab** at the bottom of the sheet (e.g. `Roster`,
or `Sheet1`). You’ll use it in Step 2.

---

## Step 1 — Open the Apps Script editor

1. Open your **Roster** Google Sheet.
2. In the top menu, click **Extensions → Apps Script**.
3. A new tab opens with a code editor. You’ll see a small default block like
   `function myFunction() { }`. **Delete everything** in that editor so it’s
   empty.

---

## Step 2 — Paste in the code

Copy the **entire** block below and paste it into the empty editor.

```javascript
// GlobalAnnotate — freelancer application intake.
// Receives a POST from the website and appends a row to the roster sheet.

// If your tab is NOT called "Roster", change the name on the next line to
// match the tab name at the bottom of your sheet (e.g. "Sheet1").
var SHEET_NAME = 'Roster';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // The website sends the answers as JSON text. Parse them.
    var data = JSON.parse(e.postData.contents);

    // Today's date, formatted as YYYY-MM-DD in the sheet's time zone.
    var today = Utilities.formatDate(
      new Date(),
      ss.getSpreadsheetTimeZone(),
      'yyyy-MM-dd'
    );

    // Build the row in the EXACT column order of your header row.
    var row = [
      today,                       // Date Added   (auto)
      data.fullName || '',         // Full Name
      data.email || '',            // Email
      data.country || '',          // Country
      data.timeZone || '',         // Time Zone
      data.nativeLanguage || '',   // Native Language
      data.languagePairs || '',    // Language Pairs
      data.services || '',         // Services
      data.specializations || '',  // Specializations
      data.yearsExperience || '',  // Years Exp.
      data.catTools || '',         // CAT Tools
      data.ratePerWord || '',      // Rate (per word)
      data.ratePerHour || '',      // Rate (per hour)
      data.currency || '',         // Currency
      data.linkedin || '',         // LinkedIn/Website
      data.cvLink || '',           // CV/Portfolio Link
      'New',                       // Status       (auto)
      '',                          // Rating        (left blank for you)
      data.note || ''              // Notes         (the applicant's short note)
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      result: 'ok',
      message: 'GlobalAnnotate freelancer endpoint is live.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> **A note on the applicant’s “Short note”:** the form has a free-text
> *Short note* field. There’s no dedicated column for it in your header row,
> so the code puts it in the **Notes** column (the last one) where it’s easy
> to read. **Rating** is always left blank for you to fill in during review.
> If you’d rather keep the **Notes** column completely empty, change the very
> last line of the `row` list from `data.note || ''` to just `''`.

Click the **💾 Save** icon (or press **Ctrl/Cmd + S**). You can name the
project anything, e.g. “Freelancer Intake”.

---

## Step 3 — Deploy it as a Web App

1. Top right of the editor, click the blue **Deploy** button → **New deployment**.
2. Click the **gear icon** ⚙️ next to “Select type” and choose **Web app**.
3. Fill in the settings:
   - **Description:** `Freelancer intake` (anything is fine)
   - **Execute as:** **Me** (your email)
   - **Who has access:** **Anyone**  ← this is important
4. Click **Deploy**.
5. Google will ask you to **authorize**. Click **Authorize access**, choose
   your Google account, and approve.
   - If you see a screen saying **“Google hasn’t verified this app”**, that’s
     normal for your own scripts. Click **Advanced → Go to (your project
     name) (unsafe)**, then **Allow**. It’s your own code, so it’s safe.

> **Why “Anyone”?** Your website is a public page, and the visitor’s browser
> is what sends the data. “Anyone” lets those submissions reach the script.
> It does **not** make your sheet public — only this small script can write to
> it, and it only ever *adds* rows. No one can read your sheet through it.

---

## Step 4 — Copy the Web App URL

After deploying, Google shows a **Web app URL** that looks like:

```
https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
```

Click **Copy**. Keep it handy for the next step.

> **Quick test (optional):** paste that URL into a new browser tab and press
> Enter. You should see `{"result":"ok","message":"GlobalAnnotate freelancer
> endpoint is live."}`. That confirms the web app is running.

---

## Step 5 — Add the URL to Vercel

1. Go to **vercel.com** and open your **globalannotate** project.
2. Click **Settings → Environment Variables**.
3. Add a new variable:
   - **Name:** `NEXT_PUBLIC_FREELANCER_FORM_ENDPOINT`
   - **Value:** paste the Web App URL from Step 4
   - **Environments:** tick **Production** and **Preview**
4. Click **Save**.

---

## Step 6 — Redeploy so the change takes effect

Environment variables only apply after a fresh deploy:

1. In Vercel, go to the **Deployments** tab.
2. On the most recent deployment, click the **⋯** menu → **Redeploy** →
   confirm **Redeploy**.

When it finishes, open **globalannotate.com/freelancers**, fill in the form,
and submit. A new row should appear at the bottom of your Roster sheet within
a few seconds, with **Date Added** filled and **Status** set to **New**. 🎉

---

## Troubleshooting

- **Nothing appears in the sheet.**
  - Re-check that **Who has access** is set to **Anyone** (Step 3).
  - Confirm the tab name matches `SHEET_NAME` in the code (Step 2).
  - Make sure you **redeployed** in Vercel *after* adding the variable.
- **The form shows an error message when I submit.**
  - The URL in Vercel may be wrong or incomplete. It must end in `/exec`
    (not `/dev`). Re-copy it from the Apps Script **Deploy → Manage
    deployments** screen.
- **Data lands in the wrong columns.**
  - Your header row order doesn’t match the table at the top of this guide.
    Reorder the headings, or ask me to remap the code.
- **I changed the code — do I need to redeploy the script?**
  - Yes. In Apps Script: **Deploy → Manage deployments → ✏️ edit → Version:
    New version → Deploy**. The URL stays the same, so you don’t need to
    touch Vercel again.

---

## What gets written to each column

| Column | Where it comes from |
|---|---|
| Date Added | Filled automatically with today’s date |
| Full Name | Form: Full name |
| Email | Form: Email |
| Country | Form: Country |
| Time Zone | Form: Time zone |
| Native Language | Form: Native language |
| Language Pairs | Form: Language pairs (e.g. `English > French; French > English`) |
| Services | Form: Services checkboxes (comma-separated) |
| Specializations | Form: Specializations checkboxes (comma-separated) |
| Years Exp. | Form: Years of experience |
| CAT Tools | Form: CAT tools |
| Rate (per word) | Form: Rate per word |
| Rate (per hour) | Form: Rate per hour |
| Currency | Form: Currency |
| LinkedIn/Website | Form: LinkedIn or website URL |
| CV/Portfolio Link | Form: CV / portfolio link |
| Status | Filled automatically with `New` |
| Rating | Left blank — for you to fill in during review |
| Notes | The applicant’s short note (see note in Step 2) |
