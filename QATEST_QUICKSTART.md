# 🚀 Quick Start: Membership Center QA Test

**Get the automated test running in 2 minutes!**

## For Linux/Mac Users

```bash
# 1. Install dependencies (one-time)
npm install puppeteer

# 2. Set up the skill (one-time)
./setup-qauitest.sh

# 3. Run the test (anytime, anywhere)
/qauitest
```

## For Windows Users

```bash
# 1. Install dependencies (one-time)
npm install puppeteer

# 2. Copy the skill file manually (one-time)
mkdir %USERPROFILE%\.claude\skills
copy .claude\skills\qauitest.md %USERPROFILE%\.claude\skills\qauitest.md

# 3. Run the test (anytime, anywhere)
/qauitest
```

## That's It! 🎉

Now whenever you type `/qauitest` in Claude Code, it will:
- ✅ Login automatically
- ✅ Test the Membership Center
- ✅ Verify all 3 plans
- ✅ Test currency change
- ✅ Capture screenshots
- ✅ Give you results in ~27 seconds

## What Gets Generated?

```
QAUI_TEST_RESULTS.json     # Detailed results (JSON)
QAUI_01_*.png              # Screenshot: Plans page
QAUI_02_*.png              # Screenshot: Currency menu
QAUI_03_*.png              # Screenshot: After EUR change
```

## Need Help?

See full docs:
- Setup issues? → `tests/membership-center/SETUP_FOR_COLLEAGUES.md`
- Test details? → `tests/membership-center/README.md`
- Troubleshooting? → `tests/membership-center/README.md#troubleshooting`

## Update Credentials

The test uses default credentials. To use your own:

Edit: `tests/membership-center/qauitest.js`

```javascript
const TEST_CONFIG = {
  url: 'https://test.theplaud.com/',
  email: 'your-email@example.com',
  password: 'your-password'
};
```

---

**That's all!** Start testing: `/qauitest`
