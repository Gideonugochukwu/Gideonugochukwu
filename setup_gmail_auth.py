#!/usr/bin/env python3
"""
One-time Gmail OAuth setup.

Run this ONCE on your local machine to authorise the agent to access Gmail.
It will open a browser window for you to log in, then save token.json.

You then paste the contents of credentials.json and token.json into
your GitHub repository secrets (see SETUP.md for full instructions).

Usage:
    pip install google-auth-oauthlib google-api-python-client
    python setup_gmail_auth.py --credentials credentials.json
"""

import argparse
import json
import os
import sys

try:
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
except ImportError:
    print("Missing dependencies. Run:")
    print("  pip install google-auth-oauthlib google-api-python-client")
    sys.exit(1)

SCOPES = [
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--credentials", default="credentials.json",
                        help="Path to your downloaded Google OAuth credentials file.")
    parser.add_argument("--token-out", default="token.json",
                        help="Where to save the generated token.")
    args = parser.parse_args()

    if not os.path.exists(args.credentials):
        print(f"\nERROR: '{args.credentials}' not found.")
        print("\nSteps to get it:")
        print("  1. Go to https://console.cloud.google.com/")
        print("  2. Create a project (or select an existing one)")
        print("  3. Enable the Gmail API: APIs & Services → Enable APIs → Gmail API")
        print("  4. Go to APIs & Services → Credentials")
        print("  5. Click 'Create Credentials' → 'OAuth client ID'")
        print("  6. Application type: Desktop app")
        print("  7. Download the JSON file and save it as 'credentials.json'")
        print("  8. Run this script again")
        sys.exit(1)

    print("\n Opening browser for Gmail authorisation…")
    print(" Please log in with the Gmail account you want the agent to manage.\n")

    flow = InstalledAppFlow.from_client_secrets_file(args.credentials, SCOPES)
    creds = flow.run_local_server(port=0)

    with open(args.token_out, "w") as f:
        f.write(creds.to_json())

    print(f"\n✅  Authorisation successful! Token saved to '{args.token_out}'")

    # Quick sanity check
    service = build("gmail", "v1", credentials=creds, cache_discovery=False)
    profile = service.users().getProfile(userId="me").execute()
    email_address = profile.get("emailAddress", "unknown")
    print(f"✅  Connected to Gmail account: {email_address}")

    # Print GitHub secrets instructions
    print("\n" + "=" * 60)
    print("NEXT STEP: Add these 3 secrets to your GitHub repository")
    print("=" * 60)
    print("\nGo to: GitHub repo → Settings → Secrets and variables → Actions\n")

    print("Secret 1 — Name: ANTHROPIC_API_KEY")
    print("           Value: your Anthropic API key (sk-ant-...)\n")

    with open(args.credentials) as f:
        creds_content = f.read()
    print("Secret 2 — Name: GMAIL_CREDENTIALS")
    print(f"           Value: (paste the contents of {args.credentials})")
    print(f"\n{creds_content}\n")

    with open(args.token_out) as f:
        token_content = f.read()
    print("Secret 3 — Name: GMAIL_TOKEN")
    print(f"           Value: (paste the contents of {args.token_out})")
    print(f"\n{token_content}\n")

    print("=" * 60)
    print("After adding secrets, push the code and GitHub Actions will")
    print("run the agent automatically every 10 minutes.")
    print("=" * 60)


if __name__ == "__main__":
    main()
